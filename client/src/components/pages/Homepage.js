import React from 'react';
import ProductNew from '../home/ProductNew';


const Homepage = () => {
    return (
        <>
            <div className='container ' style={{ maxHeight: '100vh', overflowY: 'auto' ,marginTop:'30px'}}>
                <div  >
                    <h1> สินค้ามาใหม่ขายดี </h1>
                    <ProductNew />
                </div>
               
            </div>


        </>
    );
}

export default Homepage;
