import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  handleGetAllCodeService,
  handleCreateNewUserService,
  handleGetAllUsers,
  handleDeleteUserService,
  handleEditUserService,
  handleGetTopDoctorHomeService,
  handleGetAllDoctorsService,
  saveDetailDoctorService,
} from "../../services/userService";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });

      let res = await handleGetAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log(e);
    }
  };
};

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log(e);
    }
  };
};

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log(e);
    }
  };
};
// Create a new user
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleCreateNewUserService(data);
      console.log("check create user redux", res);
      if (res && res.errCode === 0) {
        toast.success("Create a new user success!");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log(e);
    }
  };
};
// Fetch all users
export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        toast.error("Fetch all users failed!");
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      toast.error("Fetch all users failed!");
      dispatch(fetchAllUsersFailed());
      console.log(e);
    }
  };
};
// Delete a user
export const deleteUserStart = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleDeleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("Delete the user success!");
        dispatch(fetchAllUsersStart());
        dispatch(deleteUserSuccess(res.data));
      } else {
        toast.error("Delete the user failed!");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      toast.error("Delete the user failed!");
      dispatch(deleteUserFailed());
      console.log(e);
    }
  };
};
// Edit a user
export const editUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleEditUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Update the user success!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(editUserFailed());
      }
    } catch (e) {
      toast.error("Update the user failed!");
      dispatch(editUserFailed());
      console.log(e);
    }
  };
};
// Fetch top doctors for home page
export const fetchTopDoctorStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetTopDoctorHomeService(5);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctor: res.data,
        });
      } else {
        dispatch({ type: actionTypes.FETCH_TOP_DOCTORS_FAILED });
      }
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_TOP_DOCTORS_FAILED });
      console.log(e);
    }
  };
};
// Fetch all doctors
export const fetchAllDoctorsStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllDoctorsService();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDoctor: res.data,
        });
      } else {
        dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_FAILED });
      }
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_FAILED });
      console.log(e);
    }
  };
};
// Save Info doctor
export const saveDetailDoctorsStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      if (res && res.errCode === 0) {
        toast.success("Save info doctor success!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Save info doctor failed!");
        dispatch({ type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED });
      }
    } catch (e) {
      toast.error("Save info doctor failed!");
      dispatch({ type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED });
      console.log(e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const deleteUserSuccess = (data) => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});
