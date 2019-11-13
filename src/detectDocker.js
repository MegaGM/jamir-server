const fs = require('fs-extra')

module.exports = function detectDocker() {
  const weAreInsideDockerContainer = fs.pathExistsSync('/.dockerenv')
  return weAreInsideDockerContainer === 'true' ? 'true' : '' // because 'false' is not falsy, but '' is
}
