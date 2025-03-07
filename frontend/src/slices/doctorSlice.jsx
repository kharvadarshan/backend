import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    doctor:null
};

const doctorSlice = createSlice({
    name:'doctor',
    initialState,
    reducers:{
        setDoctor:(state,action)=>{
            state.doctor = action.payload;
        },
        resetDoctor:(state)=>{
            state.doctor=null;
        }
    }
});

export const { setDoctor,resetDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
