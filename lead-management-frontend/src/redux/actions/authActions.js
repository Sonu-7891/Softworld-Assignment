import { loginUser, registerUser } from "../../api/leadsApi";

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });
    const { data } = await loginUser(credentials);
    localStorage.setItem("accessToken", data.accessToken);
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.message });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    await registerUser(userData);
    alert("Registration successful!");
  } catch (error) {
    alert("Error registering user!");
  }
};
