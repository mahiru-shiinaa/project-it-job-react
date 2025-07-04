import { getProfile } from "../../services/authServices";

// Action types
export const SET_USER = "SET_USER";
export const LOGOUT = "LOGOUT";

// Thunk Action: gọi API và lưu user vào store
export const fetchUser = () => async (dispatch) => {
  try {
    const user = await getProfile();
    dispatch({ type: SET_USER, payload: user.company });
  } catch (error) {
    console.error("Lỗi lấy user:", error.response?.data || error.message);
    dispatch({ type: LOGOUT }); // Token sai, hết hạn => logout
  }
};
