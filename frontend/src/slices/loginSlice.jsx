import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLogin:false 
};

const loginSlice = createSlice({
    name:'IsLogin',
    initialState,
    reducers:{
        setIsLogin:(state)=>{
            state.isLogin = true
        },
        resetIsLogin:(state)=>{
            state.isLogin=false
        }
    }
});

export const { setIsLogin,resetIsLogin } = loginSlice.actions;
export default loginSlice.reducer;
