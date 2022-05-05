


export default num => {
  let h = num.toString(16)

  if (h.length === 1) {
    h = '0' + h
  }
  return h
}
