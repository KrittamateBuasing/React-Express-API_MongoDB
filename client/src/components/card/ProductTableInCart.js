import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart,addCart,removeItem } from '../../store/cartSlice';
const ProductTableInCart = ({ item }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(item.count);
  
  const handleChangeCount = (e) => {
    const newCount = e.target.value < 1 ? 1 : parseInt(e.target.value, 10);
    setCount(newCount);

    let cart = [];
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }

    cart = cart.map((product) => {
      if (product._id === item._id) {
        return { ...product, count: newCount };
      }
      return product;
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch(addCart(cart));
  };

  const handleRemove = () => {
    dispatch(removeItem(item._id));

  };

  return (
    <tbody>
      <tr>
        <td><img src={`http://localhost:5000/uploads/${item.file}`} width="100" alt={item.name} /></td>
        <td>{item.name}</td>
        <td>{item.price.toLocaleString()}</td>
        <td>
          <input
            onChange={handleChangeCount}
            className='form-control'
            value={count}
            type='number'
          />
        </td>
        <td><button onClick={handleRemove} className='btn btn-danger'>Remove</button></td>
      </tr>
    </tbody>
  );
};

export default ProductTableInCart;
