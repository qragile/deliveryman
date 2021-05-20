import Axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstants';
import {
  DELIVERY_CREATE_FAIL,
  DELIVERY_CREATE_REQUEST,
  DELIVERY_CREATE_SUCCESS,
  DELIVERY_DETAILS_FAIL,
  DELIVERY_DETAILS_REQUEST,
  DELIVERY_DETAILS_SUCCESS,
  DELIVERY_PAY_REQUEST,
  DELIVERY_PAY_FAIL,
  DELIVERY_PAY_SUCCESS,
  DELIVERY_MINE_LIST_REQUEST,
  DELIVERY_MINE_LIST_FAIL,
  DELIVERY_MINE_LIST_SUCCESS,
  DELIVERY_LIST_REQUEST,
  DELIVERY_LIST_SUCCESS,
  DELIVERY_LIST_FAIL,
  DELIVERY_DELETE_REQUEST,
  DELIVERY_DELETE_SUCCESS,
  DELIVERY_DELETE_FAIL,
  DELIVERY_DELIVER_REQUEST,
  DELIVERY_DELIVER_SUCCESS,
  DELIVERY_DELIVER_FAIL,
  DELIVERY_SUMMARY_REQUEST,
  DELIVERY_SUMMARY_SUCCESS,
} from '../constants/deliveryConstants';

export const createDelivery = (delivery) => async (dispatch, getState) => {
  dispatch({ type: DELIVERY_CREATE_REQUEST, payload: delivery });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post('/api/deliverys', delivery, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: DELIVERY_CREATE_SUCCESS, payload: data.delivery });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: DELIVERY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsDelivery = (deliveryId) => async (dispatch, getState) => {
  dispatch({ type: DELIVERY_DETAILS_REQUEST, payload: deliveryId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/deliverys/${deliveryId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELIVERY_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DELIVERY_DETAILS_FAIL, payload: message });
  }
};

export const payDelivery = (delivery, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({ type: DELIVERY_PAY_REQUEST, payload: { delivery, paymentResult } });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(`/api/deliverys/${delivery._id}/pay`, paymentResult, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELIVERY_PAY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DELIVERY_PAY_FAIL, payload: message });
  }
};
export const listDeliveryMine = () => async (dispatch, getState) => {
  dispatch({ type: DELIVERY_MINE_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/api/deliverys/mine', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: DELIVERY_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DELIVERY_MINE_LIST_FAIL, payload: message });
  }
};
export const listDeliverys = ({ seller = '' }) => async (dispatch, getState) => {
  dispatch({ type: DELIVERY_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/deliverys?seller=${seller}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log(data);
    dispatch({ type: DELIVERY_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DELIVERY_LIST_FAIL, payload: message });
  }
};
export const deleteDelivery = (deliveryId) => async (dispatch, getState) => {
  dispatch({ type: DELIVERY_DELETE_REQUEST, payload: deliveryId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/deliverys/${deliveryId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELIVERY_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DELIVERY_DELETE_FAIL, payload: message });
  }
};

export const deliverDelivery = (deliveryId) => async (dispatch, getState) => {
  dispatch({ type: DELIVERY_DELIVER_REQUEST, payload: deliveryId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(
      `/api/deliverys/${deliveryId}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: DELIVERY_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DELIVERY_DELIVER_FAIL, payload: message });
  }
};

export const summaryDelivery = () => async (dispatch, getState) => {
  dispatch({ type: DELIVERY_SUMMARY_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/api/deliverys/summary', {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELIVERY_SUMMARY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELIVERY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
