
let logo = (canvas, image) => {
  
  const context = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const start = Date.now()

  let draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height)

    // fade out over 3.5 seconds
    let alpha = (3500 - (Date.now() - start)) / 3500

    context.fillStyle = 'rgba(204, 163, 197, ' + alpha + ')'
    context.strokeStyle = 'rgba(255, 0, 255, 1)'

    const size = 0.25 * Math.min(canvas.width, canvas.height)

    // draw the image, centered
    context.drawImage(image,
      canvas.width / 2 - size,
      canvas.height / 2 - size,
      size * 2,
      size * 2)

    context.globalCompositeOperation = 'source-in'

    context.beginPath()
    context.moveTo(canvas.width / 2, canvas.height / 2)

    // draw the circle over 3 seconds
    context.arc(canvas.width / 2, canvas.height / 2, size,
      Math.PI * 0.5, 2 * Math.PI * (0.25 + (Date.now() - start) / 3000))

    context.fill()

    context.globalCompositeOperation = 'source-over'

    // delete canvas after 5 seconds
    if (Date.now() - start < 5000) {
      window.requestAnimationFrame(draw)
    } else {
      canvas.remove()
    }
  }

  draw()
}
