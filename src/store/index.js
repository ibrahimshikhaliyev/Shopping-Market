
import { configureStore } from '@reduxjs/toolkit';
import reducer from '../components/cartItem/cartItemSlice';


const store = configureStore({
    reducer,
    devTools:process.env.NODE_ENV !== 'production',

})  

export default store;