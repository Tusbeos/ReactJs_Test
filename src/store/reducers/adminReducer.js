import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  role: [],
  position: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      console.log("check action start", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      let copyState = { ...state };
      copyState.genders = action.data;
      console.log("check action success", copyState);
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      console.log("check action failed", action);
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
