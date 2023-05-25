import {reposActions, reposThunks} from "../../features/reposSlice";
import {useEffect} from "react";
import {selectCurrentPage, selectRepositories, selectSearchTerm} from "../../features/repos.select";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useActions} from "../../hooks/useActions";
import {Search} from "../Search/Search";
import RepoItem from "../RepoItem/RepoItem";
import s from './RepoList.module.scss'

const RepoList = () => {
    const repositories = useAppSelector(selectRepositories)
    const searchTerm = useAppSelector(selectSearchTerm)
    const currentPage = useAppSelector(selectCurrentPage)
    const {getRepos} = useActions(reposThunks)
    const {serCurrentPage, setSearchTerm} = useActions(reposActions)
    const numberButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    useEffect(() => {
        getRepos()
    }, [searchTerm, currentPage])

    return (
        <div className={s.main}>
            <h1>Search Repositories by Name</h1>
            <Search setSearchValue={setSearchTerm} searchName={searchTerm} changePage={serCurrentPage}/>
            <ul>
                {
                    !!repositories.length && repositories.map(r => <li key={r.node.id}><RepoItem  repo={r}/></li>)
                }
            </ul>

        </div>
    );
};

export default RepoList;