const initialState = {
  auth: false
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        // ...state,
        auth: true
        // user: action.payload,
      }
    case "LOG_OUT":
      return {
        // ...state,
        auth: false
      }
    default:
      return state
  }
}

export default user;
