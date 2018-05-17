
const current = {
  x: -1.0,
  y: 0.0,
  zoom: 0.75
}

const target = {
  x: current.x,
  y: current.y,
  zoom: current.zoom
}

//// Graphics ////
const getShader = (name) => {
  return $('script#' + name)[0].text
}

// Creates a GLSL shader, and compiles
const loadShader = (gl, type, source) => {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

// Initialize shader program
const initShaderProgram = (gl, vertex, fragment) => {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertex)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragment)

  const shaderProgram = gl.createProgram()
  gl.attachShader(shaderProgram, vertexShader)
  gl.attachShader(shaderProgram, fragmentShader)
  gl.linkProgram(shaderProgram)

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.log('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram))
    return null
  }

  return shaderProgram
}

const initBuffers = (gl) => {
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  const positions = [1.0, 1.0, -1.0,  1.0, 1.0, -1.0, -1.0, -1.0]
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
  return positionBuffer
}

const draw = (gl, programInfo, position) => {
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  {
    const numComponents = 2
    const type = gl.FLOAT
    const normalize = false
    const stride = 0

    const offset = 0

    gl.bindBuffer(gl.ARRAY_BUFFER, position)
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents, type, normalize, stride, offset
    )
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition)
  }

  gl.useProgram(programInfo.program)

  current.x += (target.x - current.x) / 10.0
  current.y += (target.y - current.y) / 10.0
  current.zoom += (target.zoom - current.zoom) / 10.0

  gl.uniform3f(programInfo.uniformLocations.coordinates, current.x, current.y, 1 / current.zoom)
  gl.uniform2f(programInfo.uniformLocations.resolution, gl.canvas.width, gl.canvas.height)
  gl.uniform3f(programInfo.uniformLocations.color, 0.77, 0.05, 0.96) // 0.77, 0.05, 0.96

  const period = 10000

  gl.uniform3f(programInfo.uniformLocations.fade, 0.2, 3, 0.5)

  {
    const offset = 0
    const vertexCount = 4
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount)
  }
}

const drawLoop = (gl, programInfo, position) => {
  let lastFrame = Date.now()

  const drawFrame = () => {
    const now = Date.now()
    // console.log(now - lastFrame)
    lastFrame = now
    draw(gl, programInfo, position)

    window.requestAnimationFrame(drawFrame)
  }

  drawFrame()
}

// GRAPHICS SETUP

const gl = $('canvas.mandelbrot')[0].getContext('webgl')
gl.canvas.width = window.innerWidth
gl.canvas.height = window.innerHeight

const vertexSource = getShader('vertex')
const fragmentSource = getShader('fragment')

const shaderProgram = initShaderProgram(gl, vertexSource, fragmentSource)

const programInfo = {
  program: shaderProgram,
  attribLocations: {
    vertexPosition: gl.getAttribLocation(shaderProgram, 'aPosition'),
  },
  uniformLocations: {
    coordinates: gl.getUniformLocation(shaderProgram, 'uCoordinates'),
    resolution: gl.getUniformLocation(shaderProgram, 'uResolution'),
    color: gl.getUniformLocation(shaderProgram, 'uColor'),
    fade: gl.getUniformLocation(shaderProgram, 'uFade'),
  }
}


const buffer = initBuffers(gl)
drawLoop(gl, programInfo, buffer)

window.onresize = () => {
  gl.canvas.width = window.innerWidth
  gl.canvas.height = window.innerHeight

  aspect = window.innerHeight / window.innerWidth
}

const zoom = () => {
  target.zoom *= 1.1
  if (target.zoom > 16384) {
    target.zoom = 16384
  }
}

const zoomOut = () => {
  target.zoom /= 1.1
}

window.onkeydown = (e) => {
  if (e.code === 'ArrowUp') {
    target.y += 1 / target.zoom / 10
  } else if (e.code === 'ArrowDown') {
    target.y -= 1 / target.zoom / 10
  } else if (e.code === 'ArrowLeft') {
    target.x -= 1 / target.zoom / 10
  } else if (e.code === 'ArrowRight') {
    target.x += 1 / target.zoom / 10
  } else if (e.code === 'Equal') {
    zoom()
  } else if (e.code === 'Minus') {
    zoomOut()
  } else {
    // console.log(e)
  }
}

const screenToCartesian = (x, y) => {
  return {
    x: x / window.innerWidth,
    y: 1 - (y / window.innerHeight)
  }
}

let mouseStart = {
  x: null,
  y: null
}

window.onmousemove = (e) => {
  if (mouseStart.x != null && mouseStart.y != null) {
    const current = screenToCartesian(e.x, e.y)
    console.log()

    target.x -= (current.x - mouseStart.x) / target.zoom
    target.y -= (current.y - mouseStart.y) / target.zoom

    mouseStart = current
  }
}

window.onmousedown = (e) => {
  mouseStart = screenToCartesian(e.x, e.y)
}

window.onmouseup = (e) => {
  mouseStart.x = null
  mouseStart.y = null
}


$('html').bind('mousewheel DOMMouseScroll', function (e) {
    var delta = (e.originalEvent.wheelDelta || -e.originalEvent.detail);

    if (delta < 0) {
        zoomOut()
    } else if (delta > 0) {
        zoom()
    }
});








// TODO: Add Adjustable Settings
