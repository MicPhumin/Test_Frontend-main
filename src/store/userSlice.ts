import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:[],
    selectRow:[],
    editRow:{},
    status:""
}


export const userSlice = createSlice({
    name:'userStore',
    initialState:initialState,
    reducers:{
        add:(state,action)=>{
            state.user = action.payload;
            state.status = "add";
        },
        remove:(state,action)=>{
            state.selectRow = action.payload;
            state.status = "remove";
        },
        edit:(state,action)=>{
            state.editRow = action.payload;
            state.status = "edit";
        },
        changeStatus:(state,action)=>{
            state.status =  action.payload;
        }
    }
})

export const { add,remove,edit,changeStatus } = userSlice.actions
export default userSlice.reducer