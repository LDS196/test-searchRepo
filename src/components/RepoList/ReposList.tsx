import { reposActions, reposThunks } from "../../features/reposSlice"
import { useEffect } from "react"
import { selectCurrentPage, selectRepositories, selectSearchTerm } from "../../features/repos.select"
import { useAppSelector } from "../../hooks/useAppSelector"
import { useActions } from "../../hooks/useActions"
import { Search } from "../Search/Search"
import RepoItem from "../RepoItem/RepoItem"
import s from "./ReposList.module.scss"
import { Numbers_Buttons } from "../../utils/consts"

const ReposList = () => {
    const repositories = useAppSelector(selectRepositories)
    const searchTerm = useAppSelector(selectSearchTerm)
    const currentPage = useAppSelector(selectCurrentPage)
    const { getRepos } = useActions(reposThunks)
    const { serCurrentPage, setSearchTerm } = useActions(reposActions)

    const changePageHandler = (page: number) => {
        serCurrentPage(page)
    }

    useEffect(() => {
        getRepos()
    }, [searchTerm, currentPage])

    const buttonsForRender = Numbers_Buttons.map((b, i) => {
        const activeClass = currentPage === i ? s.active : ""

        return (
            <button className={activeClass} key={i} onClick={() => changePageHandler(i)}>
                {b}
            </button>
        )
    })
    return (
        <div className={s.main}>
            <h1>Search Repositories by Name</h1>
            <Search setSearchValue={setSearchTerm} searchName={searchTerm} changePage={serCurrentPage} />
            <ul>
                {!!repositories.length &&
                    repositories.map((r) => (
                        <li key={r.node.id}>
                            <RepoItem repo={r} />
                        </li>
                    ))}
            </ul>
            <div className={s.buttons}>{buttonsForRender}</div>
        </div>
    )
}

export default ReposList
