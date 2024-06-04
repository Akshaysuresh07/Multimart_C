import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:'cart',
    initialState:[],
    reducers: {
         GetProduct: (state, action) => {
        return action.payload
    },
    AddtoCart: (state, action) =>{
        state.push(action.payload)

    },
    removeFromCart:(state,action)=>{
        return state.filter(item=>item._id!=action.payload.id)
    },
    emptyCart: (state, action) => {
        return state = []
    }

}
})
export const{GetProduct,AddtoCart,removeFromCart,emptyCart}=cartSlice.actions
export default cartSlice.reducer