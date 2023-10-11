import axios from "../../axios";

export const fetchPatients = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "fetchPatientsRequest" });

    const token = getState().user.user?.access_token;
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get("/doctor-panel/patient/list", { headers });

    dispatch({ type: "fetchPatientsSuccess", payload: response.data.data });
  } catch (error) {
    dispatch({ type: "fetchPatientsFailure", payload: error });
  }
};
