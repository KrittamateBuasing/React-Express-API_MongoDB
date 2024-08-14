import logo from './logo.svg';
import './App.css';
import FormProduct from './components/FormProduct';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormEditProduct from './components/FormEditProduct';

//layout
import HeaderBar from "./layout/HeaderBar";
import { CssBaseline, Box } from "@mui/material";
import SideBar from "./layout/SideBar";

import TestRedux1 from './components/TestRedux1';
import TestRedux2 from './components/TestRedux2';
import Register from './components/pages/auth/Register';
import Login from './components/pages/auth/Login';

import HomePageUser from './components/pages/user/HomePageUser';

import AdminRoute from './routes/AdminRoute';
import UserRoute from './routes/UserRoute';
import HomePageAdmin from './components/pages/admin/HomePageAdmin';
import { currentUser, login } from './Functions/auth';
import { useDispatch } from 'react-redux';
import { login as loginRedux } from './store/userSlice';
import NotFound404 from './components/pages/NotFound404';
import ResponsiveAppBar from './layout/ResponsiveAppBar';
import ManageUser from './components/pages/admin/ManageUser';
import Homepage from './components/pages/Homepage';
import Cart from './components/pages/Cart';
import CartWithoutLogin from './components/pages/CartWithoutLogin';
import SingleProduct from './components/card/SingleProduct';
import Profile from './components/pages/user/Profile';
function App() {
  //javascrip
  const tokenid = localStorage.getItem('token')
  const dispatch = useDispatch();
  currentUser(tokenid)
    .then(res => {
      console.log(res); 
      dispatch(
        loginRedux({
        name: res.data.name,
        role: res.data.role,
        token: tokenid
      })
    );
    })
    .catch(err => { console.log(err) })

  return (
    <BrowserRouter>
      <>
        <CssBaseline />
            
        <Routes>
          {/* public */}
         
          <Route path='/' element={<><ResponsiveAppBar/> <Homepage/> </>} />
          <Route path='/NotFound404' element={<NotFound404 text='error'/>} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/CartWithoutLogin' element={ <><ResponsiveAppBar/> <CartWithoutLogin /> </>}/>
          <Route path='/SingleProduct/:id' element={<><ResponsiveAppBar/>  <SingleProduct /> </>}/>
         
          
          {/* user */}
          <Route path='/user/index' element={<UserRoute><HomePageUser /></UserRoute>} />
           <Route path='/Cart' element={<UserRoute><Cart /></UserRoute>} />
           <Route path='/Profile' element={<UserRoute><Profile /></UserRoute>} />


          {/* admin */}
          <Route path='/admin/index' element={<AdminRoute><HomePageAdmin /></AdminRoute>} />
          <Route path='/admin/viewtable' element={<AdminRoute><FormProduct /></AdminRoute>} />
          <Route path='/edit/:id' element={<AdminRoute><FormEditProduct /></AdminRoute>} />
          <Route path='/admin/ManageUser' element={<AdminRoute><ManageUser /></AdminRoute>} />



        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
