import { RootState } from "app/store"

export const selectCurrentPage = (state: RootState) => state.repos.currentPage
export const selectRepositories= (state: RootState) => state.repos.repositories
export const selectSearchTerm= (state: RootState) => state.repos.searchTerm
