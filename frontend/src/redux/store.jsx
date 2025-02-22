import { configureStore } from "@reduxjs/toolkit";

import loginSlice from '../slices/loginSlice';

const store = configureStore({
    reducer: {
        isLogin:loginSlice
    },
});
export default store;