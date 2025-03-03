import { configureStore } from "@reduxjs/toolkit";

import loginSlice from '../slices/loginSlice';
import userAuthSlice from '../slices/userAuthSlice';

const store = configureStore({
    reducer: {
        isLogin:loginSlice,
        user:userAuthSlice
    },
});
export default store;