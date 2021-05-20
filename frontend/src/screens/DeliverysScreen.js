import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listDeliverys, deleteDelivery } from '../actions/deliveryActions';

function DeliverysScreen(props) {
  const deliveryList = useSelector(state => state.deliveryList);
  const { loading, deliverys, error } = deliveryList;

  const deliveryDelete = useSelector(state => state.deliveryDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = deliveryDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listDeliverys());
    return () => {
      //
    };
  }, [successDelete]);

  const deleteHandler = (delivery) => {
    dispatch(deleteDelivery(delivery._id));
  }
  return loading ? <div>Loading...</div> :
    <div className="content content-margined">

      <div className="delivery-header">
        <h3>Deliverys</h3>
      </div>
      <div className="delivery-list">

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {deliverys.map(delivery => (<tr key={delivery._id}>
              <td>{delivery._id}</td>
              <td>{delivery.createdAt}</td>
              <td>{delivery.totalPrice}</td>
              <td>{delivery.user.name}</td>
              <td>{delivery.isPaid.toString()}</td>
              <td>{delivery.paidAt}</td>
              <td>{delivery.isDelivered.toString()}</td>
              <td>{delivery.deliveredAt}</td>
              <td>
                <Link to={"/delivery/" + delivery._id} className="button secondary" >Details</Link>
                {' '}
                <button type="button" onClick={() => deleteHandler(delivery)} className="button secondary">Delete</button>
              </td>
            </tr>))}
          </tbody>
        </table>

      </div>
    </div>
}
export default DeliverysScreen;
