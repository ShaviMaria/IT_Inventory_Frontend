import { configureStore, combineReducers } from "@reduxjs/toolkit"
import menuReducer from "./slices/menuSlice"

const rootReducer = combineReducers({
    menu: menuReducer
})

const store = configureStore({ reducer: rootReducer })

export default store