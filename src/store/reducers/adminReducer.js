import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  role: [],
  position: [],
  users: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      state.isLoadingGender = true;
      return {
        ...state,
      };

    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };

    case actionTypes.FETCH_GENDER_FAILED:
      state.genders = [];
      state.isLoadingGender = false;
      return {
        ...state,
      };

    case actionTypes.FETCH_POSITION_SUCCESS:
      state.position = action.data;
      return {
        ...state,
      };

    case actionTypes.FETCH_POSITION_FAILED:
      state.position = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_SUCCESS:
      state.role = action.data;
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_FAILED:
      state.role = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USER_FAILED:
      state.users = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
