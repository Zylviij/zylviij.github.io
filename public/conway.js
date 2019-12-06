

let conway = (canvas) => {
  const context = canvas.getContext('2d')

  let pixels = (window.innerWidth / 15) | 0
  let pixel_size = (Math.max(window.innerWidth, window.innerHeight) / pixels) | 0
  let ratio = window.innerHeight / window.innerWidth
  let pixels_height = (4 * ratio * pixels) | 0

  canvas.width = pixels * pixel_size
  canvas.height = pixels_height * pixel_size

  context.clearRect(0, 0, canvas.width, canvas.height)

  /*
   -1 Dead (once alive)
    0 Dead (never alive)
    1 Alive (one generation)
    n Alive (n generations) (no more than 10)
  */

  /*
    0, 1 dies
    2, 3 survives
       3 regenerates
    4+ dies
  */

  let board = new Uint8Array(pixels * pixels_height)

  for (let i = 0; i < board.length; i++) {
    board[i] = ((Math.random() * 2) | 0)
  }

  // Iterate Conway Game with Torus Topology
  let iter_conway = (conway, width, height) => {
    const out = new Uint8Array(width * height)

    for (let i = 0; i < conway.length; i++) {
      let ul = torus_lookup(conway, i % width - 1, Math.floor(i / width) - 1, width, height) > 0 ? 1 : 0
      let um = torus_lookup(conway, i % width,     Math.floor(i / width) - 1, width, height) > 0 ? 1 : 0
      let ur = torus_lookup(conway, i % width + 1, Math.floor(i / width) - 1, width, height) > 0 ? 1 : 0
      let ml = torus_lookup(conway, i % width - 1, Math.floor(i / width),     width, height) > 0 ? 1 : 0
      let mm = torus_lookup(conway, i % width,     Math.floor(i / width),     width, height)
      let mr = torus_lookup(conway, i % width + 1, Math.floor(i / width),     width, height) > 0 ? 1 : 0
      let bl = torus_lookup(conway, i % width - 1, Math.floor(i / width) + 1, width, height) > 0 ? 1 : 0
      let bm = torus_lookup(conway, i % width,     Math.floor(i / width) + 1, width, height) > 0 ? 1 : 0
      let br = torus_lookup(conway, i % width + 1, Math.floor(i / width) + 1, width, height) > 0 ? 1 : 0
      let neighbors = ul + um + ur + ml + mr + bl + bm + br

      out[i] = conway_rules(mm, neighbors)
    }

    return out
  }

  let conway_rules = (cell, neighbors) => {
    if (cell > 0) {
      if (neighbors < 2 || neighbors > 3) {
        return 0
      } else {
        if (cell == 255) {
          return 255
        } else {
          return cell + 1
        }
      }
    } else {
      if (neighbors == 3) {
        return 1
      } else {
        return cell
      }
    }
  }

  let torus_lookup = (arr, x, y, width, height) => {
    x = pos_mod(x, width)
    y = pos_mod(y, height)

    return arr[y * width + x]
  }

  // make modulo work properly for negative numbers
  let pos_mod = (x, y) => {
    return ((x % y) + y) % y
  }

  let conway_draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height)

    let saturation = 80
    let alpha = 0.1
    let luminocity = 50
    let hue = 310

    let hsla = (h, s, l, a) => {
      return 'hsla(' + (h|0) + ', ' + (s|0) + '%, ' + (l|0) + '%, ' + a + ')'
    }


    for (let x = 0; x < pixels; x++) {
      for (let y = 0; y < pixels_height; y++) {
        let cell = torus_lookup(board, x, y, pixels, pixels_height)

        if (cell > 0) {
          context.fillStyle = hsla(hue, saturation, Math.max(luminocity - cell, luminocity - 20), alpha)
          context.fillRect(x * pixel_size + 1, y * pixel_size + 1, pixel_size - 2, pixel_size - 2)
        }
      }
    }

    board = iter_conway(board, pixels, pixels_height)
    window.requestAnimationFrame(conway_draw)
  }

  let design = 0
  canvas.addEventListener('mousedown', (event) => {
    design = (design + 1) % 3

    if (design == 0) {
      for (let i = 0; i < board.length; i++) {
        board[i] = ((Math.random() * 2) | 0)
      }
    } else if (design == 1) {
      for (let i = 0; i < board.length; i++) {
        board[i] = 0
      }

      board[((pixels_height * 3 / 8) | 0) * pixels + ((pixels_height * 3 / 4) | 0)] = 1
      board[((pixels_height * 3 / 8) | 0) * pixels + ((pixels_height * 3 / 4) + 1 | 0)] = 1
      board[((pixels_height * 3 / 8) | 0) * pixels + ((pixels_height * 3 / 4) + 4 | 0)] = 1
      board[((pixels_height * 3 / 8) | 0) * pixels + ((pixels_height * 3 / 4) + 5 | 0)] = 1
      board[((pixels_height * 3 / 8) | 0) * pixels + ((pixels_height * 3 / 4) + 6 | 0)] = 1
      board[((pixels_height * 3 / 8) + 1 | 0) * pixels + ((pixels_height * 3 / 4) + 3 | 0)] = 1
      board[((pixels_height * 3 / 8) + 2 | 0) * pixels + ((pixels_height * 3 / 4) + 1 | 0)] = 1
    } else {
      for (let i = 0; i < board.length; i++) {
        board[i] = 0
      }

      for (let i = 10; i < pixels - 10; i++) {
        board[((pixels_height * 3 / 8) | 0) * pixels + i] = 1
      }
    }
  })

  conway_draw()

}
