
let ripple = (canvas) => {

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

  let ripples = []

  // Randomly generate ripples
  let rand_ripple = () => {
    // Give it a random position
    ripples.push(new Ripple(window.innerWidth * Math.random(), window.innerHeight * Math.random()))

    // Randomly Create a new one in the next 3 seconds (3000 milliseconds)
    window.setTimeout(rand_ripple, Math.random() * 3000)
  }

  rand_ripple()

  // create ripple at point of click
  canvas.addEventListener('mousedown', (event) => {
    ripples.push(new Ripple(event.clientX, event.clientY))
  })

  // randomly create ripples as mouse moves around
  canvas.addEventListener('mousemove', (event) => {
    if (Math.random() < .02) {
      ripples.push(new Ripple(event.clientX, event.clientY))
    }
  })

  /// Background Canvas
  const context = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  let ripple_draw = () => {
    // set background color
    context.fillStyle = 'rgba(12, 12, 12, 1)'
    context.fillRect(0, 0, canvas.width, canvas.height)

    // kill ripples that are more than 3 seconds old
    ripples = ripples.filter((e) => {
      return e.age < 3000
    })

    // draw each ripple
    ripples.forEach((r) => {
      context.beginPath()

      // fade over 3 seconds
      context.lineWidth = r.age / 200
      context.strokeStyle = 'rgba(51, 10, 43, ' + (3000 - r.age) / 3000 + ')'

      context.arc(r.x, r.y, r.age / 5, 0, Math.PI * 2)
      context.stroke()
    })

    window.requestAnimationFrame(ripple_draw)
  }

  ripple_draw()
  
}
