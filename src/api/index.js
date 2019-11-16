module.exports = { setupAPI }

function setupAPI(scServer) {
  scServer.on('connection', function (socket) {
    console.info('a socket connected: ', socket.id)

    socket.on('disconnect', function () {
      console.info('a socket disconnected')
    })

    socket.on('getAddressProgramWithRows', includeAPI('./addressPrograms/getAddressProgramWithRows'))
    socket.on('getAddressPrograms', includeAPI('./addressPrograms/getAddressPrograms'))
    socket.on('uploadAddressProgram', includeAPI('./addressPrograms/uploadAddressProgram'))
    socket.on('updateAddressProgramTitle', includeAPI('./addressPrograms/updateAddressProgramTitle'))
    socket.on('deleteAddressProgram', includeAPI('./addressPrograms/deleteAddressProgram'))

    function includeAPI(path) {
      return require(path).bind({ socket, scServer })
    }
  })
}
