import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword } from "firebase/auth"
import auth from "../../../utils/firebase/firebase.config"

const initialState = {
    name: '',
    email: '',
    isLoading:true,
    isError:true,
    error:''
}

const createUser = createAsyncThunk('createSlice/createUser', async({email, password})=>{
   const data = await createUserWithEmailAndPassword(auth ,email, password)

   return
})


const userSlice = createSlice({
    name:'userSlice',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(createUser.pending, (state)=>{
            state.isLoading = true
            state.isError = false
            state.email = '';
            state.name = ''
            state.error = ''

        })
        .addCase(createUser.fulfilled, (state, {payload})=>{
            state.isLoading = false
            state.isError = false
            state.email = payload.email;
            state.name = payload.name
            state.error = ''

        })
        .addCase(createUser.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.email = '';
            state.name = ''
            state.error = action.error.message

        })
    }

})


export default userSlice.reducer;