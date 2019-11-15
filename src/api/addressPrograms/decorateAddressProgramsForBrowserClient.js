module.exports = (addressProgram) => {
  addressProgram.editable = false
  addressProgram.humanReadableTimestamp = addressProgram._id.getTimestamp().toLocaleString()
  return addressProgram
}
