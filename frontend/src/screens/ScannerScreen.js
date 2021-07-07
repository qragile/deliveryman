import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScannerSteps from '../components/ScannerSteps'
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';
import { createScanner } from '../actions/scannerActions';
import { SCANNER_CREATE_RESET } from '../constants/scannerConstants';
import { json } from 'body-parser';

export default function ScannerScreen(props) {
  const qr = useSelector((state) => state.qr);
  const scannerCreate = useSelector((state) => state.scannerCreate);
  const { loading, success, error, scanner } = scannerCreate;
  const [id, setId] = useState('');
  const [sender_id, setSenderId] = useState('');
  const [hash_code, setHashCode] = useState(false);
  const [security_digit, setSecurityDigit] = useState(false);
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };
  const submitHandler = (e) => {
    e.preventDefault();
  }

  /*const classes = useStyles();*/
  const qrRef = useRef(null);

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  }
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
      const obj = JSON.parse(result);
      const data = {
        id: obj.id,
        sender_id: obj.sender_id,
        hash_code: obj.hash_code,
        security_digit: obj.security_digit,
        userLoad: userInfo.email,
        dateLoad: Date.now(),
      }
      dispatch(createScanner(data));
      window.location.reload();
    }
  }
  useEffect(() => {
    if (success) {
      /*  props.history.push(`/scanner/${scanner._id}`); */
      dispatch({ type: SCANNER_CREATE_RESET });

    }
  }, [dispatch, scanner, props.history, success]);

  /*
  useEffect(() => {
    dispatch({ type: SCANNER_DELETE_RESET });
    dispatch(listScanners({ delivery: deliveryMode ? userInfo._id : '' }));
    dispatch(createScanner());
  }, [dispatch, deliveryMode, scannerId]);
*/

  return (
    <div className="row top">
      <div className="col-2">
       
        <h1>Scanners</h1>


        <div className="card card-body">
          <div>
            <label htmlFor="qr_code" >Label</label>
            <QrReader
              delay={2000}
              style={{ width: '50%' }}
              onError={handleErrorWebCam}
              onScan={handleScanWebCam}
            />.
            <ul>Code: {scanResultWebCam}</ul>

          </div>
        </div>
      </div>
    </div>
  );
}
