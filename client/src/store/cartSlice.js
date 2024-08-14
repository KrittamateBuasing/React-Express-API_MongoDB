import { createSlice } from '@reduxjs/toolkit';
let initialState = [];

if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
        initialState = JSON.parse(localStorage.getItem('cart'));
    } else {
        initialState = [];
    }
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart: (state, action) => {
            return action.payload;
        },
        deleteCart:(state) => {
           
            if (typeof window !== 'undefined') {
                localStorage.removeItem('cart');
            }
            // Return an empty array to reset state
            return [];
          },
          removeItem: (state, action) => {
            const updatedCart = state.filter(item => item._id !== action.payload);
            if (typeof window !== 'undefined') {
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }
            return updatedCart;
        },
    },
});

export const { addCart,deleteCart,removeItem } = cartSlice.actions;

export default cartSlice.reducer;
