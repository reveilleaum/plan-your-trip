const logIn = () => {
  return {
    type: 'LOG_IN'
  }
}
const logOut = () => {
  return {
    type: "LOG_OUT"
  }
}

export default {
  logIn,
  logOut
}
