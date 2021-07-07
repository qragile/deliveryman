import React, {useState, useRef, useEffect} from 'react';
import ScannerSteps from '../components/ScannerSteps'
import QRCode from 'qrcode';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import QrReader from 'react-qr-reader';
import MessageBox from '../components/MessageBox';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { createOrder,listOrderMine, listOrders} from '../actions/orderActions';

export default function ScannerScreen(props) {
  const orderHeadId = props.match.params.id;
  const orderHead = useSelector((state) => state.order);
  const [id, setId] = useState('');
  const [sender_id, setSenderId] = useState('');
  const [hash_code, setHashCode] = useState(false);
  const [security_digit, setSecurityDigit] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (orderHeadId) {
      dispatch(createOrder(orderHeadId));
    }
  }, [dispatch, orderHeadId]);

  
  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };
   const submitHandler= (e) => {
       e.preventDefault();
   }
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] =  useState('');
  /*const classes = useStyles();*/
  const qrRef = useRef(null);

  const generateQrCode = async () => {
    try {
          const response = await QRCode.toDataURL(text);
          setImageUrl(response);
    }catch (error) {
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
  const handleScanWebCam = (result) => {
    if (result){
        setScanResultWebCam(result);

        window.location.reload()
    }
   }
    return ( 
  
    <div className="row top"> 
    <div className="col-2">
    <div> <ScannerSteps  step1 step2></ScannerSteps> </div> 
      <h1>Transporte</h1>
   
      {orderHead.length === 0 ? (
        <MessageBox>
          Carga esta vacia. <Link to="/">Esperar Carga</Link>
        </MessageBox>
      ) : (
        <ul>
          {orderHead.map((item) => (
            <li key={item.product}>
              <div className="row">
                <div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="small"
                  ></img>
                </div>
                <div className="min-30">
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </div>
                <div>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(
                        addToCart(item.product, Number(e.target.value))
                      )
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div>${item.price}</div>
                
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    <div className="col-1">
      <div className="card card-body">
        <div>
            <label htmlFor="qr_code" >Qr Code</label>
            <QrReader
                delay={300}
                style={{width: '100%'}}
                onError={handleErrorWebCam}
                onScan={handleScanWebCam}
                />
                <h3>Code: {scanResultWebCam}</h3>
              
          </div>
      </div>
      <li>
              <button
                type="button"
                onClick="reload"
                className="primary block"
                disabled={orderHead.length === 0}
              >Scanear
              </button>
            </li>
    </div>
  </div>
    )
}
