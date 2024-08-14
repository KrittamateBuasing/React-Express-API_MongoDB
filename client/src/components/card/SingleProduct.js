import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'antd';
import { AddShoppingCartOutlined } from '@mui/icons-material';
import { EllipsisOutlined } from '@ant-design/icons';
import { addCart } from '../../store/cartSlice';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';


const { Meta } = Card;

const SingleProduct = () => {
    const params = useParams();
    const [data, setData] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        loadData(params.id);
    }, [params.id]);

    const loadData = async (id) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/product/${id}`);
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    

    const handleAddToCart = () => {
        let cart = [];
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.push({
            ...data,
            count: 1
        });
        let unique = _.uniqWith(cart, _.isEqual);
        localStorage.setItem("cart", JSON.stringify(unique));
        dispatch(addCart(unique));
    };

    if (!data) {
        return <div>Loading...</div>; // Or any loading indicator you prefer
    }

    return (
        <div className='container ' style={{ maxHeight: '100vh', overflowY: 'auto' }}>
            
            <Card
                title={<span className='thai-front' style={{ fontSize: '26px', fontWeight: 'bold' }}>{data.name}</span>}
                style={{ width: 1200, margin: 'auto', marginBottom: 30 , marginTop:'30px'}}
                cover={
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img
                            alt="example"
                            src={`http://localhost:5000/uploads/${data.file}`}
                            style={{ maxWidth: '100%', maxHeight: 600, objectFit: 'contain' }}
                        />
                    </div>
                }
               
            >
                <Meta
                    description ={<p className='thai-front' style={{ fontSize: '18px' }}>{data.detail}</p> }
                />
                <div  style={{ marginTop: 10 }}>
                    <span style={{ fontWeight: 'bold',fontSize: '24px'  }}>Price: {(data.price).toLocaleString()} Bath</span>
                </div>
                <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
                onClick={handleAddToCart}
            >
                 <AddShoppingCartOutlined style={{ marginRight: '8px' }} />Add to Cart
            </Button>
            </Card>
            
            <footer style={{ padding: '30px', backgroundColor: '#f8f8f8', textAlign: 'center' }}>
                {/* You can add content here if needed */}
            </footer>
        </div>
    );
};

export default SingleProduct;
