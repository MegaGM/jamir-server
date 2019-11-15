const fs = require('fs-extra')

module.exports = function detectDocker() {
  const weAreInsideDockerContainer = fs.pathExistsSync('/.dockerenv')
  return weAreInsideDockerContainer ? 'true' : '' // because 'false' is not falsy enough, but '' is
}
