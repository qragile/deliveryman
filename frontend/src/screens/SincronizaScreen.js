import React from 'react';

import { signout } from '../actions/userActions';
import AdminRoute from '../components/AdminRoute';
import PrivateRoute from '../components/PrivateRoute';
import CartScreen from './CartScreen';
import HomeScreen from './HomeScreen';
import OrderHistoryScreen from './OrderHistoryScreen';
import OrderScreen from './OrderScreen';
import PaymentMethodScreen from './PaymentMethodScreen';
import PlaceOrderScreen from './PlaceOrderScreen';
import ProductListScreen from './ProductListScreen';
import ProductScreen from './ProductScreen';
import ProfileScreen from './ProfileScreen';
import RegisterScreen from './RegisterScreen';
import ShippingAddressScreen from './ShippingAddressScreen';
import ScannerScreen from './ScannerScreen';
import SigninScreen from './SigninScreen';
import ProductEditScreen from './ProductEditScreen';
import OrderListScreen from './OrderListScreen';
import UserListScreen from './UserListScreen';
import UserEditScreen from './UserEditScreen';
import SellerRoute from '../components/SellerRoute';
import SellerScreen from './SellerScreen';
import SearchBox from '../components/SearchBox';
import SearchScreen from './SearchScreen';
import { listProductCategories } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import MapScreen from './MapScreen';
import DashboardScreen from './DashboardScreen';
import SupportScreen from './SupportScreen';
import ChatBox from '../components/ChatBox';


export default function SincronizaScreen(props) {
  
  return (
    <body>
    <div className="FSincroniza">
        <div >
        <a>  <img srcset=" movil360.jpg 360w,
                           movil480.jpg 480w,
                           movil800.jpg 800w,
                           movil1200.jpg 1200w,
                           desktop1920.jpg 1920w"
               
                src="introAutorizacion.jpg"
                alt="Ecovoy " /> </a>

           
        </div>
   </div>
   </body>
  );
}