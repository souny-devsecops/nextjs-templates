import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"
import counterReducer from "@/cores/feature/counter/controller/counter_controller";

export const store = configureStore({
    reducer: {
        counterReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();