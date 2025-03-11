import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLogin:false ,
    role: ''
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
        },
        setRole:(state,action)=>{
            state.role = action.payload
        },
        resetRole:(state)=>{
            state.role=''
        }
    }
});

export const { setRole,resetRole,setIsLogin,resetIsLogin } = loginSlice.actions;
export default loginSlice.reducer;
