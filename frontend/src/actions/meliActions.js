import Axios from 'axios';
import {
  SCANNER_CREATE_REQUEST,
  SCANNER_CREATE_SUCCESS,
  SCANNER_CREATE_FAIL,

  SCANNER_LIST_REQUEST,
  SCANNER_LIST_SUCCESS,
  SCANNER_LIST_FAIL,
  SCANNER_DELETE_REQUEST,
  SCANNER_DELETE_SUCCESS,
  SCANNER_DELETE_FAIL

 
} from '../constants/scannerConstants';
import {
USER_SIGNIN_REQUEST,
USER_SIGNIN_SUCCESS,
USER_SIGNIN_FAIL
} from '../constants/userConstants';
export const scanner = () => async (dispatch, getState) => {
  dispatch({ type: SCANNER_CREATE_REQUEST, payload: scanner });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post('/api/scanners', scanner, {
      headers: {'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
      },
    });
  
    dispatch({ type: SCANNER_CREATE_SUCCESS, payload: data.scanner });
   
  } catch (error) {
    dispatch({
      type: SCANNER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const inmeli = () => async (dispatch, getState) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    // CODE 
    const { data } = await Axios.get(`/api/scanners`, {
      headers: { 
        Authorization: `Bearer ${userInfo.token}` },
    });
    // AUTHORIZATION TOKEN

    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
} catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type:  USER_SIGNIN_FAIL, payload: message });
  }
};
export const deleteScanner = (scannerId) => async (dispatch, getState) => {
  dispatch({ type: SCANNER_DELETE_REQUEST, payload: scannerId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/scanners/${scannerId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: SCANNER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SCANNER_DELETE_FAIL, payload: message });
  }
};