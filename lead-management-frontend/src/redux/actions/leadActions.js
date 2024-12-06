import {
  fetchLeads as fetchLeadsAPI,
  createLead as createLeadAPI,
  updateLead as updateLeadAPI,
  deleteLead as deleteLeadAPI,
} from "../../api/leadsApi";

// Action Types
const FETCH_LEADS_REQUEST = "FETCH_LEADS_REQUEST";
const FETCH_LEADS_SUCCESS = "FETCH_LEADS_SUCCESS";
const FETCH_LEADS_FAILURE = "FETCH_LEADS_FAILURE";

const CREATE_LEAD_SUCCESS = "CREATE_LEAD_SUCCESS";
const UPDATE_LEAD_SUCCESS = "UPDATE_LEAD_SUCCESS";
const DELETE_LEAD_SUCCESS = "DELETE_LEAD_SUCCESS";

// Fetch Leads
export const fetchLeads =
  (queryParams = "") =>
  async (dispatch) => {
    dispatch({ type: FETCH_LEADS_REQUEST });
    try {
      const response = await fetchLeadsAPI(queryParams);
      const {data} = response
      dispatch({ type: FETCH_LEADS_SUCCESS, payload: data });
    } catch (error) {
      console.error("Error fetching leads:", error);
      dispatch({
        type: FETCH_LEADS_FAILURE,
        payload: error.response?.data?.message || "Something went wrong",
      });
    }
  };

// Create Lead
export const createLead = (leadData) => async (dispatch) => {
  try {
    const { data } = await createLeadAPI(leadData);
    dispatch({ type: CREATE_LEAD_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error creating lead:", error);
  }
};

// Update Lead
export const updateLead = (id, leadData) => async (dispatch) => {
  try {
    const { data } = await updateLeadAPI(id, leadData);
    dispatch({ type: UPDATE_LEAD_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error updating lead:", error);
  }
};

// Delete Lead
export const deleteLead = (id) => async (dispatch) => {
  try {
    await deleteLeadAPI(id);
    dispatch({ type: DELETE_LEAD_SUCCESS, payload: id });
  } catch (error) {
    console.error("Error deleting lead:", error);
  }
};
