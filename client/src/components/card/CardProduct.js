import React from 'react';
import {  EllipsisOutlined } from '@ant-design/icons';
import { AddShoppingCartOutlined } from '@mui/icons-material';
import { Card } from 'antd';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { addCart } from '../../store/cartSlice';
import { Link } from 'react-router-dom';
import FeedIcon from '@mui/icons-material/Feed';
const { Meta } = Card;

const CardProduct = ({ data }) => {
    const dispatch = useDispatch();

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

    return (
        <Card
            style={{ width: 300, marginBottom: 30 }}
            cover={
                <img
                    alt="example"
                    src={'http://localhost:5000/uploads/' + data.file}
                    style={{ width: '100%', height: 300 }}
                />
            }
            actions={[
                <Link to={'/SingleProduct/'+ data._id} >
                <FeedIcon key="ellipsis" />
            </Link>,
                <AddShoppingCartOutlined onClick={handleAddToCart} key="Cart" />
                
            ]}
        >
            <Meta
                title={data.name}
                description={<div className='thai-front' style={{ 
                    overflow: 'hidden', 
                    whiteSpace: 'nowrap', 
                    textOverflow: 'ellipsis' 
                }}>{data.detail}</div>}
            />
            <div style={{ marginTop: 10 }}>
                <span className='thai-front' style={{ fontWeight: 'bold' }}>Price: </span>{(data.price).toLocaleString()} Bath
            </div>
        </Card>
    );
};

export default CardProduct;
