import { RootState } from "app/store"

export const selectIsLoading = (state: RootState) => state.app.isLoading
export const selectAppError = (state: RootState) => state.app.error
