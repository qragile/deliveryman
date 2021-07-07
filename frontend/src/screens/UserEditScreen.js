import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function UserEditScreen(props) {
  const userId = props.match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMeli, setIsMeli] = useState(false);
  const [nickName, setnickName] = useState('');
  const [isDelivery, setIsDelivery] = useState(false);
  const [isAct, setIsAct] = useState(false);
  const [license, setLicense] = useState('');
  const [acountNumber, setAcountNumber] = useState('');
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push('/userlist');
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsSeller(user.isSeller);
      setIsAdmin(user.isAdmin);
      setIsMeli(user.isMeli);
      setnickName(user.nickName);
      setIsDelivery(user.isDelivery);
      setIsAct(user.isAct);
      setLicense(user.license);
      setAcountNumber(user.acountNumber);
    }
  }, [dispatch, props.history, successUpdate, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user
    dispatch(updateUser(
      { 
        _id: userId, name, email, isSeller, isAdmin, isDelivery, 
        license, acountNumber, isMeli, nickName, isAct  }));
      };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit User {name}</h1>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="license">License Ecovoy 2021</label>
              <input
                id="license"
                type="text"
                placeholder="Enter license"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
              ></input>
            </div>
            <div>
            <label htmlFor="acountNumber">Acount Number</label>
              <input
                id="acountNumber"
                type="text"
                placeholder="Enter acount number "
                value={acountNumber}
                onChange={(e) => setAcountNumber(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="nickName">NickName</label>
              <input
                id="nickName"
                type="text"
                placeholder="Enter nick name"
                value={nickName}
                onChange={(e) => setnickName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="isMeli">
              <input
                id="isMeli"
                label="MarcadoLibre"
                type="checkbox"
                checked={isMeli}
                onChange={(e) => setIsMeli(e.target.checked)}
              ></input>Is MercadoLibre</label>
            </div>
            <div>
              <label htmlFor="isDelivery">
              <input
                id="isDelivery"
                type="checkbox"
                checked={isDelivery}
                onChange={(e) => setIsDelivery(e.target.checked)}
              ></input>Is DeliveryMan</label>
            </div>
            <div>
              <label htmlFor="isSeller">
              <input
                id="isSeller"
                type="checkbox"
                checked={isSeller}
                onChange={(e) => setIsSeller(e.target.checked)}
              ></input>Is Seller</label>
            </div>
            <div>
              <label htmlFor="isAdmin">
              <input
                id="isAdmin"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></input>Is Admin</label>
            </div>
            <div>
              <label htmlFor="isAct">
              <input
                id="isAct"
                type="checkbox"
                checked={isAct}
                onChange={(e) => setIsAct(e.target.checked)}
              ></input>Is Activity</label>
            </div>
            <div>
              <button type="submit" className="primary">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
