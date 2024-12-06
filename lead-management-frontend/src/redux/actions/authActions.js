import { loginUser, registerUser } from "../../api/leadsApi";

// Action to handle user login
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });
    const { data } = await loginUser(credentials);
    localStorage.setItem("accessToken", data.accessToken); // Store token in localStorage
    dispatch({ type: "LOGIN_SUCCESS", payload: data }); // Dispatch user data and token
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error.response?.data?.message || "Login failed",
    });
  }
};


// Action to handle user registration
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_REQUEST" });
    const response = await registerUser(userData); // API call to register user
    dispatch({ type: "REGISTER_SUCCESS", payload: response.data }); // Update state with user data
    alert("Registration successful! You can now log in.");
  } catch (error) {
    dispatch({
      type: "REGISTER_FAILURE",
      payload: error.response?.data?.message || "Registration failed",
    });
    alert(error.response?.data?.message || "Error registering user.");
  }
};

// Action to handle user logout
export const logout = () => (dispatch) => {
  localStorage.removeItem("accessToken"); // Clear token from localStorage
  dispatch({ type: "LOGOUT" }); // Reset state
};
