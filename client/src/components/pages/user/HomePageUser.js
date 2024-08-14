import React from 'react'
import ProductNew from '../../home/ProductNew';


const HomePageUser = () => {
  return (
    <>
        <div className='container' style={{ maxHeight: '100vh', overflowY: 'auto' ,marginTop:'30px'}}>
            <div  >
                <h1>NEW PRODUCT</h1>
                <ProductNew />
            </div>
            
        </div>


    </>
);
}

export default HomePageUser