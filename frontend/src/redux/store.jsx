import { configureStore } from "@reduxjs/toolkit";

import loginSlice from '../slices/loginSlice';
import userAuthSlice from '../slices/userAuthSlice';
import doctorSlice from '../slices/doctorSlice';

const store = configureStore({
    reducer: {
        isLogin:loginSlice,
        user:userAuthSlice,
        doctor:doctorSlice,
    },
});
export default store;