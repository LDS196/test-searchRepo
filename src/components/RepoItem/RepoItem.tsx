import React, { FC } from "react"
import { RepoType } from "../../features/reposApi"
import s from "./RepoItem.module.scss"
import { Link, useNavigate } from "react-router-dom"
import { useActions } from "../../hooks/useActions"
import { reposActions } from "../../features/reposSlice"

type PropsType = {
    repo: RepoType
}
const RepoItem: FC<PropsType> = ({ repo }) => {
    const { setCurrentRepo } = useActions(reposActions)
    const navigate = useNavigate()
    const repoItem = repo.node

    const goToSeeRepoInfo = (value: RepoType) => {
        setCurrentRepo(value)
        navigate("/repoInfo")
    }
    return (
        <div className={s.item}>
            <p>
                <span>Name:</span>
                <span onClick={() => goToSeeRepoInfo(repo)}>
                    <Link to={""}>{repoItem.name}</Link>
                </span>
            </p>
            <p>
                <span>Stars:</span>
                <span>{repoItem.stargazers.totalCount}</span>
            </p>
            <p>
                <span>Last commit:</span>
                <span>{repoItem.pushedAt}</span>
            </p>
            <p>
                <span>Link repo:</span>
                <span>
                    <Link to={repoItem.url}>{repoItem.url}</Link>
                </span>
            </p>
            <div></div>
        </div>
    )
}

export default RepoItem
