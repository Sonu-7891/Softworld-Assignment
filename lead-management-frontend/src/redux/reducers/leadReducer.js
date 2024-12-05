const initialState = {
  leads: [],
  loading: false,
  error: null,
};

const leadReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_LEADS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_LEADS_SUCCESS":
      return { ...state, leads: action.payload, loading: false };
    case "FETCH_LEADS_FAILURE":
      return { ...state, error: action.payload, loading: false };

    case "CREATE_LEAD_SUCCESS":
      return { ...state, leads: [...state.leads, action.payload] };
    case "UPDATE_LEAD_SUCCESS":
      return {
        ...state,
        leads: state.leads.map((lead) =>
          lead.id === action.payload.id ? action.payload : lead
        ),
      };
    case "DELETE_LEAD_SUCCESS":
      return {
        ...state,
        leads: state.leads.filter((lead) => lead.id !== action.payload),
      };

    default:
      return state;
  }
};

export default leadReducer;
