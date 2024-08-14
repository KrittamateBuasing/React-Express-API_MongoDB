
import { current } from '@reduxjs/toolkit';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductTableInCart from '../card/ProductTableInCart';



const Cart = () => {
    const dispatch = useDispatch();
    const { user, cart } = useSelector((state) => ({ ...state }));
    const gettotal = () => {
        return cart.reduce((total, item) => total + item.price * item.count, 0).toLocaleString();
    }
    const handleSaveOrder=()=>{
        //code
    }
    const showCartItem =()=>
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <td>Image</td>
                    <td>Title</td>
                    <td>Price</td>
                    <td>Count</td>
                    <td>Remove</td>
                </tr>
            </thead>
            {cart.map((item)=><ProductTableInCart key={item._id} item={item}/>)}

        </table>


    return (
        <div className='container-fluid' >
            <div className='row'>
                <div className='col-md-8' style={{marginTop:'30px'}}>
                    <h1>Cart/{cart.length} Product</h1>
                    {
                        !cart
                        ?<p>No Product in Cart</p>
                        : showCartItem()
                    }
                </div>

                <hr />
                {cart.map((item, index) =>
                    <p>
                        {item.name} x {item.count} = {(item.price * item.count).toLocaleString()}
                    </p>)}

                <hr />
                <h2>
                    Total : {gettotal()} Bath
                </h2>
               


            </div>
            {user && user.user && user.user.length !== 0 
            ? (  <button className='btn btn-success' disabled={!cart.length} onClick={handleSaveOrder}>CHECKOUT!</button>) 
            : ( <button className='btn btn-danger' disabled={!cart.length}><Link to='/Login' state='cart'>LOGIN TO CHECKOUT!</Link></button>)}
          
                
                
                
        </div>
    );
};

export default Cart;
