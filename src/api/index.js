module.exports = { setupAPI }

function setupAPI(scServer) {
  scServer.on('connection', function (socket) {
    console.info('a socket connected: ', socket.id)

    socket.on('disconnect', function () {
      console.info('a socket disconnected')
    })

    socket.on('uploadAddressProgram', includeAPI('./uploadAddressProgram'))

    function includeAPI(path) {
      return require(path).bind({ socket, scServer })
    }
  })
}
