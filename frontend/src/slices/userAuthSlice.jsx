import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user:null
};

const userAuthSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
           state.user=action.payload;
        },
        resetUser:(state)=>{
            state.user=null;
        },
        resetPhoto:(state,action)=>{
            state.user.image = action.payload;
        }
    }
});
export const {setUser,resetUser,resetPhoto} = userAuthSlice.actions;
export default userAuthSlice.reducer;