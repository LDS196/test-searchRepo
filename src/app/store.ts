import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit"
import { appReducer } from "./app.slice"
import { reposReducer } from "../features/reposSlice"

const rootReducer = combineReducers({
    app: appReducer,
    repos: reposReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: false,
    //     }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
