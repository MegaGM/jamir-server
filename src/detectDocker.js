const fs = require('fs-extra')

module.exports = function detectDocker() {
  const weAreInsideDockerContainer = fs.pathExistsSync('/.dockerenv')
  return weAreInsideDockerContainer
}
