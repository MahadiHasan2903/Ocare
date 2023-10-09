import axios from "../../axios";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios.get("/users", {
      withCredentials: true,
    });

    const transformedData = data.map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
    }));

    dispatch({
      type: "LoadUserSuccess",
      payload: transformedData,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};
