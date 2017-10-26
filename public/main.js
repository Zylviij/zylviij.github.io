
let ripples = []

class Ripple {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.time = Date.now();
  }

  get age() {
    return Date.now() - this.time;
  }
}

$(document).ready(() => {
  /// Background Canvas
  const background_canvas = $('canvas.background')[0]
  const background_context = background_canvas.getContext('2d')
  background_canvas.width = window.innerWidth
  background_canvas.height = window.innerHeight

  // create ripple at point of click
  background_canvas.addEventListener('mousedown', (event) => {
    ripples.push(new Ripple(event.clientX, event.clientY))
  })

  // randomly create ripples as mouse moves around
  background_canvas.addEventListener('mousemove', (event) => {
    if (Math.random() < .02) {
      ripples.push(new Ripple(event.clientX, event.clientY))
    }
  })

  let ripple_draw = () => {
    background_context.fillStyle = 'rgba(12, 12, 12, 1)'
    background_context.strokeStyle = 'rgba(51, 10, 43, 1)'
    background_context.lineWidth = 2

    background_context.fillRect(0, 0, background_canvas.width, background_canvas.height)

    ripples = ripples.filter((e) => {
      return e.age < 3000
    })

    ripples.forEach((r) => {
      background_context.beginPath()
      background_context.lineWidth = r.age / 200
      background_context.strokeStyle = 'rgba(51, 10, 43, ' + (3000 - r.age) / 3000 + ')'
      background_context.arc(r.x, r.y, r.age / 5, 0, Math.PI * 2)
      background_context.stroke()
    })

    window.requestAnimationFrame(ripple_draw)
  }

  ripple_draw()

  // Randomly generate ripples
  let rand_ripple = () => {
    // Give it a random position
    ripples.push(new Ripple(window.innerWidth * Math.random(), window.innerHeight * Math.random()))

    // Randomly Create a new one in the next 3 seconds (3000 milliseconds)
    window.setTimeout(rand_ripple, Math.random() * 3 * 1000)
  }

  rand_ripple()

  /// Loader Canvas
  const loader_canvas = $('canvas.loader')[0]
  const loader_context = loader_canvas.getContext('2d')
  loader_canvas.width = window.innerWidth
  loader_canvas.height = window.innerHeight

  const start = Date.now()

  const logo = new Image()
  logo.src = './public/circle.svg'

  let logo_draw = () => {
    loader_context.clearRect(0, 0, loader_canvas.width, loader_canvas.height)

    loader_context.fillStyle = 'rgba(204, 163, 197, ' + (3500 - (Date.now() - start)) / 3500 + ')'
    loader_context.strokeStyle = 'rgba(255, 0, 255, 1)'

    const size = 0.25 * (loader_canvas.width < loader_canvas.height ? loader_canvas.width : loader_canvas.height)

    loader_context.drawImage(logo, loader_canvas.width / 2 - size, loader_canvas.height / 2 - size, size * 2, size * 2)

    loader_context.globalCompositeOperation = 'source-in'

    loader_context.beginPath()
    loader_context.moveTo(loader_canvas.width / 2, loader_canvas.height / 2)
    loader_context.arc(loader_canvas.width / 2, loader_canvas.height / 2, size,
      Math.PI * 0.5, 2 * Math.PI * (0.25 + (Date.now() - start) / 3000))
    loader_context.fill()

    loader_context.globalCompositeOperation = 'source-over'

    if (Date.now() - start < 5000) {
      window.requestAnimationFrame(logo_draw)
    } else {
      loader_canvas.remove()
    }
  }

  logo_draw()

  /// Conway Canvas
  const conway_canvas = $('canvas.conway')[0]
  const conway_context = conway_canvas.getContext('2d')

  let pixels = (window.innerWidth / 15) | 0
  let pixel_size = (Math.max(window.innerWidth, window.innerHeight) / pixels) | 0
  let ratio = window.innerHeight / window.innerWidth
  let pixels_height = (4 * ratio * pixels) | 0

  conway_canvas.width = pixels * pixel_size
  conway_canvas.height = pixels_height * pixel_size

  conway_context.clearRect(0, 0, conway_canvas.width, conway_canvas.height)

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

  let conway = new Uint8Array(pixels * pixels_height)

  for (let i = 0; i < conway.length; i++) {
    conway[i] = ((Math.random() * 2) | 0)
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
    conway_context.clearRect(0, 0, conway_canvas.width, conway_canvas.height)

    let saturation = 80
    let alpha = 0.5
    let luminocity = 30
    let hue = 310

    let hsla = (h, s, l, a) => {
      return 'hsla(' + (h|0) + ', ' + (s|0) + '%, ' + (l|0) + '%, ' + a + ')'
    }


    for (let x = 0; x < pixels; x++) {
      for (let y = 0; y < pixels_height; y++) {
        let cell = torus_lookup(conway, x, y, pixels, pixels_height)

        if (cell > 0) {
          conway_context.fillStyle = hsla(hue, saturation, Math.max(luminocity - cell, luminocity - 20), alpha)
          conway_context.fillRect(x * pixel_size + 1, y * pixel_size + 1, pixel_size - 2, pixel_size - 2)
        }
      }
    }

    conway = iter_conway(conway, pixels, pixels_height)
    window.requestAnimationFrame(conway_draw)
  }

  // create ripple at point of click
  let design = 0
  conway_canvas.addEventListener('mousedown', (event) => {
    design = (design + 1) % 3

    if (design == 0) {
      for (let i = 0; i < conway.length; i++) {
        conway[i] = ((Math.random() * 2) | 0)
      }
    } else if (design == 1) {
      for (let i = 0; i < conway.length; i++) {
        conway[i] = 0
      }

      conway[((pixels_height * 3 / 8) | 0) * pixels + ((pixels_height * 3 / 4) | 0)] = 1
      conway[((pixels_height * 3 / 8) | 0) * pixels + ((pixels_height * 3 / 4) + 1 | 0)] = 1
      conway[((pixels_height * 3 / 8) | 0) * pixels + ((pixels_height * 3 / 4) + 4 | 0)] = 1
      conway[((pixels_height * 3 / 8) | 0) * pixels + ((pixels_height * 3 / 4) + 5 | 0)] = 1
      conway[((pixels_height * 3 / 8) | 0) * pixels + ((pixels_height * 3 / 4) + 6 | 0)] = 1
      conway[((pixels_height * 3 / 8) + 1 | 0) * pixels + ((pixels_height * 3 / 4) + 3 | 0)] = 1
      conway[((pixels_height * 3 / 8) + 2 | 0) * pixels + ((pixels_height * 3 / 4) + 1 | 0)] = 1
    } else {
      for (let i = 0; i < conway.length; i++) {
        conway[i] = 0
      }

      for (let i = 10; i < pixels - 10; i++) {
        conway[((pixels_height * 3 / 8) | 0) * pixels + i] = 1
      }
    }
  })

  conway_draw()

  /// Utility
  // Handle Resize Events
  window.onresize = () => {
    let set_sizes = (canvas) => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    set_sizes(background_canvas)
  }
})

// scroll logic
$('button').on('click', (e) => {
  $('html, body').animate({
    scrollTop: $('#' + e.target.className).offset().top
  })
})
