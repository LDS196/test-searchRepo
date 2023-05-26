import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { repoApi, RepoType } from "./repoApi"
import { createAppAsyncThunk } from "../utils/create-app-async-thunk"
import { handleServerNetworkError } from "../utils/handle-server-network-error"
import { getQuery } from "../utils/get-query"
import { RESULTS_PER_PAGE } from "../utils/consts"
import { getVariables } from "../utils/get-variables"

const getRepos = createAppAsyncThunk<RepoType[], void>("repos/getRepos", async (arg, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI
    const { searchTerm, currentPage } = getState().repos
    const query = getQuery(searchTerm, RESULTS_PER_PAGE)
    const variables = getVariables(RESULTS_PER_PAGE, currentPage)
    try {
        const res = await repoApi.getRepos(query, variables)
        console.log(res.data)
        return res.data.data.search.edges
    } catch (error) {
        return rejectWithValue(handleServerNetworkError(error))
    }
})

type initialStateType = {
    searchTerm: string
    repositories: RepoType[]
    currentPage: number
}
const initialState: initialStateType = {
    searchTerm: "",
    repositories: [],
    currentPage: 0,
}
const slice = createSlice({
    name: "repos",
    initialState,
    reducers: {
        serCurrentPage: (state: initialStateType, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getRepos.fulfilled, (state, action: PayloadAction<RepoType[]>) => {
            state.repositories = action.payload.slice(0, 3)
        })
    },
})

export const reposActions = slice.actions
export const reposReducer = slice.reducer
export const reposThunks = { getRepos }
