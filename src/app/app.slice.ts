import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitStateType = {
    error: null | string,
    isLoading: boolean
}

const initialState: InitStateType = {
    error: null,
    isLoading: false,
}

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error= action.payload.error
        },

    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => {
                    return action.type.endsWith("/pending")
                },
                (state, action) => {
                    state.isLoading = true
                }
            )
            .addMatcher(
                (action) => {
                    return action.type.endsWith("/rejected")
                },
                (state) => {

                    state.isLoading = false
                }
            )
            .addMatcher(
                (action) => {
                    return action.type.endsWith("/fulfilled")
                },
                (state) => {
                    state.isLoading = false
                }
            )
    },
})
export const appActions = slice.actions
export const appReducer = slice.reducer
