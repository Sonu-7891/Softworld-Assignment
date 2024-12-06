const initialState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
  registrationSuccess: false, // New state to track registration success
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "REGISTER_REQUEST":
      return { ...state, loading: true, error: null }; // Reset error on new request

    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        loading: false,
      };

    case "REGISTER_SUCCESS":
      return {
        ...state,
        registrationSuccess: true, // Indicate successful registration
        loading: false,
      };

    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
      return { ...state, error: action.payload, loading: false };

    case "LOGOUT":
      return initialState; // Reset state on logout

    default:
      return state;
  }
};

export default authReducer;
