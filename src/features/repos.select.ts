import { RootState } from "app/store"

export const selectCurrentPage = (state: RootState) => state.repos.currentPage
export const selectRepositories = (state: RootState) => state.repos.repositories
export const selectSearchTerm = (state: RootState) => state.repos.searchTerm
export const selectCurrentRepo = (state: RootState) => state.repos.currentRepo
export const selectHasNextPage = (state: RootState) => state.repos.pageInfo.hasNextPage
export const selectHasPreviousPage = (state: RootState) => state.repos.pageInfo.hasPreviousPage
export const selectDirection = (state: RootState) => state.repos.direction
