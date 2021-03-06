import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listScanners } from '../actions/scannerActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  SCANNER_DELETE_RESET,
} from '../constants/scannerConstants';

export default function ScannerListScreen(props) {
  const scannerList = useSelector((state) => state.scannerList);
  const { loading, error, scanners } = scannerList;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listScanners());
  }, [dispatch]);
  
  return (
    <div>
     {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Shipping</th>
                <th>Sender id</th>
                <th>UserLoad</th>
                <th>Date Load</th>
              
              </tr>
            </thead>
            <tbody>
              {scanners.map((scanner) => (
                <tr key={scanner._id}>
                  <td>{scanner.id}</td>
                  <td>{scanner.sender_id}</td>
                  <td>{scanner.userLoad}</td>
                  <td>{scanner.dateLoad.substring(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
      
        </>
      )}
    </div>
  );
}