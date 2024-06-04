
import { configureStore } from '@reduxjs/toolkit';
import CartSlice from './Slice/CartSlice';

export const store=configureStore({
    reducer: {
        cartReducer:CartSlice,
    }
});