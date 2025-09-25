import actionTypes from './actionTypes';
import { handleGetAllCodeService } from "../../services/userService";

export const fetchGenderStart = (dispatch,getState) => {
    return async (dispatch, getState) => {
        try {
        let res = await handleGetAllCodeService("GENDER");
        if (res && res.errCode === 0) {
            dispatch(fetchGenderSuccess(res.data));
        }else {
            dispatch(fetchGenderFailed());
        } 
    } catch (e) {
        dispatch(fetchGenderFailed());
        console.log(e)
    }
    }

}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})
