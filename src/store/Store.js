import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from '../store/AuthSlice'

const store = configureStore({
    reducer:{
        auth: AuthSlice
    }
})

export default store