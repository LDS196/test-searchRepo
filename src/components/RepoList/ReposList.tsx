import { reposActions, reposThunks } from "../../features/reposSlice"
import { useEffect, useState } from "react"
import {
    selectCurrentPage,
    selectHasNextPage,
    selectHasPreviousPage,
    selectRepositories,
    selectSearchTerm,
} from "../../features/repos.select"
import { useActions } from "../../hooks/useActions"
import { Search } from "../Search/Search"
import RepoItem from "../RepoItem/RepoItem"
import s from "./ReposList.module.scss"
import { useSelector } from "react-redux"
import { selectAppError, selectIsLoading } from "../../app/app.select"

const ReposList = () => {
    const isLoading = useSelector(selectIsLoading)
    const error = useSelector(selectAppError)
    const repositories = useSelector(selectRepositories)
    const searchTerm = useSelector(selectSearchTerm)
    const currentPage = useSelector(selectCurrentPage)
    const hasNextPage = useSelector(selectHasNextPage)
    const hasPreviousPage = useSelector(selectHasPreviousPage)
    const [firstRender, setFirstRender] = useState(true)
    const { getRepos } = useActions(reposThunks)
    const { serCurrentPage, setSearchTerm, setDirection } = useActions(reposActions)

    const NextPageHandler = () => {
        setDirection(true)
        getRepos({})
    }
    const PreviousPageHandler = () => {
        setDirection(false)
        getRepos({})
    }

    useEffect(() => {
        if (!firstRender) getRepos({})
        setFirstRender(false)
    }, [searchTerm])

    return (
        <div className={s.main}>
            <h1>Search Repositories by Name</h1>
            <Search setSearchValue={setSearchTerm} searchName={searchTerm} changePage={serCurrentPage} />
            {error && <p>Error:{error}</p>}
            <ul>
                {!!repositories.length &&
                    repositories.map((r) => (
                        <li key={r.node.id}>
                            <RepoItem repo={r} />
                        </li>
                    ))}
            </ul>
            <div className={s.buttons}>
                <button disabled={!hasPreviousPage || isLoading} onClick={PreviousPageHandler}>
                    Previous Page
                </button>
                <span>{currentPage}</span>
                <button disabled={!hasNextPage || isLoading} onClick={NextPageHandler}>
                    NextPage
                </button>
            </div>
        </div>
    )
}

export default ReposList
