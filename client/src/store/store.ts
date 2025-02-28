import { configureStore } from "@reduxjs/toolkit";
import startupReducer from './features/startupSlice'
import reviewReducer from './features/reviewSlice'

export const store = configureStore({
    reducer: {
        startup:startupReducer,
        review:reviewReducer,
    }
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;