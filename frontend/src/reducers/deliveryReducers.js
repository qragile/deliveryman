import {
    DELIVERY_CREATE_FAIL,
    DELIVERY_CREATE_REQUEST,
    DELIVERY_CREATE_RESET,
    DELIVERY_CREATE_SUCCESS,
    DELIVERY_DETAILS_FAIL,
    DELIVERY_DETAILS_REQUEST,
    DELIVERY_DETAILS_SUCCESS,
    DELIVERY_MINE_LIST_FAIL,
    DELIVERY_MINE_LIST_REQUEST,
    DELIVERY_MINE_LIST_SUCCESS,
    DELIVERY_PAY_FAIL,
    DELIVERY_PAY_REQUEST,
    DELIVERY_PAY_RESET,
    DELIVERY_PAY_SUCCESS,
    DELIVERY_LIST_REQUEST,
    DELIVERY_LIST_SUCCESS,
    DELIVERY_LIST_FAIL,
    DELIVERY_DELETE_REQUEST,
    DELIVERY_DELETE_SUCCESS,
    DELIVERY_DELETE_FAIL,
    DELIVERY_DELETE_RESET,
    DELIVERY_DELIVER_REQUEST,
    DELIVERY_DELIVER_SUCCESS,
    DELIVERY_DELIVER_FAIL,
    DELIVERY_DELIVER_RESET,
    DELIVERY_SUMMARY_REQUEST,
    DELIVERY_SUMMARY_SUCCESS,
    DELIVERY_SUMMARY_FAIL,
  } from '../constants/deliveryConstants';
  
  export const deliveryCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case DELIVERY_CREATE_REQUEST:
        return { loading: true };
      case DELIVERY_CREATE_SUCCESS:
        return { loading: false, success: true, delivery: action.payload };
      case DELIVERY_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case DELIVERY_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const deliveryDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case DELIVERY_DETAILS_REQUEST:
        return { loading: true };
      case DELIVERY_DETAILS_SUCCESS:
        return { loading: false, delivery: action.payload };
      case DELIVERY_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const deliveryPayReducer = (state = {}, action) => {
    switch (action.type) {
      case DELIVERY_PAY_REQUEST:
        return { loading: true };
      case DELIVERY_PAY_SUCCESS:
        return { loading: false, success: true };
      case DELIVERY_PAY_FAIL:
        return { loading: false, error: action.payload };
      case DELIVERY_PAY_RESET:
        return {};
      default:
        return state;
    }
  };
  export const deliveryMineListReducer = (state = { deliverys: [] }, action) => {
    switch (action.type) {
      case DELIVERY_MINE_LIST_REQUEST:
        return { loading: true };
      case DELIVERY_MINE_LIST_SUCCESS:
        return { loading: false, deliverys: action.payload };
      case DELIVERY_MINE_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export const deliveryListReducer = (state = { deliverys: [] }, action) => {
    switch (action.type) {
      case DELIVERY_LIST_REQUEST:
        return { loading: true };
      case DELIVERY_LIST_SUCCESS:
        return { loading: false, deliverys: action.payload };
      case DELIVERY_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export const deliveryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case DELIVERY_DELETE_REQUEST:
        return { loading: true };
      case DELIVERY_DELETE_SUCCESS:
        return { loading: false, success: true };
      case DELIVERY_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case DELIVERY_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const deliveryDeliverReducer = (state = {}, action) => {
    switch (action.type) {
      case DELIVERY_DELIVER_REQUEST:
        return { loading: true };
      case DELIVERY_DELIVER_SUCCESS:
        return { loading: false, success: true };
      case DELIVERY_DELIVER_FAIL:
        return { loading: false, error: action.payload };
      case DELIVERY_DELIVER_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const deliverySummaryReducer = (
    state = { loading: true, summary: {} },
    action
  ) => {
    switch (action.type) {
      case DELIVERY_SUMMARY_REQUEST:
        return { loading: true };
      case DELIVERY_SUMMARY_SUCCESS:
        return { loading: false, summary: action.payload };
      case DELIVERY_SUMMARY_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };