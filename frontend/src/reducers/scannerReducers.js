import {
    SCANNER_CREATE_FAIL,
    SCANNER_CREATE_REQUEST,
    SCANNER_CREATE_RESET,
    SCANNER_CREATE_SUCCESS,
    SCANNER_LIST_REQUEST,
    SCANNER_LIST_SUCCESS,
    SCANNER_LIST_FAIL,
    SCANNER_DELETE_REQUEST,
    SCANNER_DELETE_SUCCESS,
    SCANNER_DELETE_FAIL,
    SCANNER_DELETE_RESET,
   
  } from '../constants/scannerConstants';
  
  export const scannerCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case SCANNER_CREATE_REQUEST:
        return { loading: true };
      case SCANNER_CREATE_SUCCESS:
        return { loading: false, success: true, scanner: action.payload };
      case SCANNER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case SCANNER_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const scannerListReducer = (state = { scanners: [] }, action) => {
    switch (action.type) {
      case SCANNER_LIST_REQUEST:
        return { loading: true };
      case SCANNER_LIST_SUCCESS:
        return { loading: false, scanners: action.payload };
      case SCANNER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export const scannerDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case SCANNER_DELETE_REQUEST:
        return { loading: true };
      case SCANNER_DELETE_SUCCESS:
        return { loading: false, success: true };
      case SCANNER_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case SCANNER_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };

  