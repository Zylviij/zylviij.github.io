

$(document).ready(() => {

  /// Background
  const background_canvas = $('canvas.background')[0]
  ripple(background_canvas)

  /// Loader
  const loader_canvas = $('canvas.loader')[0]
  const logo_image = new Image()
  logo_image.src = './public/circle.svg'
  logo(loader_canvas, logo_image)


  /// Conway
  const conway_canvas = $('canvas.conway')[0]
  conway(conway_canvas)

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
