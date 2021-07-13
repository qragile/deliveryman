import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Scanner from '../components/Scanner';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listScanners } from '../actions/scannerActions';



export default function HomeScreen() {
  const dispatch = useDispatch();
  const scannerList = useSelector((state) => state.scannerList);
  const { loading, error, scanners } = scannerList;

  
  useEffect(() => {
    dispatch(listScanners({}));
  }, [dispatch]);
  return (
    <div>
          
      <h2>Shipping</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {scanners.length === 0 && <MessageBox>No Scanner Found</MessageBox>}
          <div className="row center">
            {scanners.map((scanner) => (
              <Scanner key={scanner._id} scanner={scanner}></Scanner>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
