import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { PageInfoType, reposApi, RepoType } from "./reposApi"
import { createAppAsyncThunk } from "../utils/create-app-async-thunk"
import { handleServerNetworkError } from "../utils/handle-server-network-error"
import { getQuery } from "../utils/get-query"
import { RESULTS_PER_PAGE } from "../utils/consts"

const getRepos = createAppAsyncThunk<{ edges: RepoType[]; pageInfo: PageInfoType }, void>(
    "repos/getRepos",
    async (arg, thunkAPI) => {
        const { rejectWithValue, getState, dispatch } = thunkAPI
        const { searchTerm, currentPage, direction, pageInfo } = getState().repos
        const { startCursor, endCursor } = pageInfo

        const query: unknown = getQuery(searchTerm, RESULTS_PER_PAGE, direction, startCursor, endCursor)

        try {
            const res = await reposApi.getRepos(query)
            if (direction) {
                dispatch(reposActions.serCurrentPage(currentPage + 1))
            }
            if (direction !== null && !direction) {
                dispatch(reposActions.serCurrentPage(currentPage - 1))
            }
            return res.data.data.search
        } catch (error) {
            return rejectWithValue(handleServerNetworkError(error))
        }
    }
)

type initialStateType = {
    direction: boolean | null
    searchTerm: string
    repositories: RepoType[]
    currentPage: number
    currentRepo: RepoType | null
    pageInfo: PageInfoType
}
const initialState: initialStateType = {
    direction: null,
    searchTerm: "",
    repositories: [],
    currentPage: 1,
    currentRepo: null,
    pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null,
    },
}
const slice = createSlice({
    name: "repos",
    initialState,
    reducers: {
        serCurrentPage: (state: initialStateType, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setDirection: (state: initialStateType, action: PayloadAction<boolean | null>) => {
            state.direction = action.payload
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload
        },
        setCurrentRepo: (state, action: PayloadAction<RepoType>) => {
            state.currentRepo = action.payload
        },
        clearPageInfo: (state, action: PayloadAction<PageInfoType>) => {
            state.pageInfo = { ...action.payload }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            getRepos.fulfilled,
            (state, action: PayloadAction<{ edges: RepoType[]; pageInfo: PageInfoType }>) => {
                state.repositories = action.payload.edges
                state.pageInfo = { ...action.payload.pageInfo }
            }
        )
    },
})

export const reposActions = slice.actions
export const reposReducer = slice.reducer
export const reposThunks = { getRepos }
