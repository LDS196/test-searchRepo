import React, { FC } from "react"
import { RepoType } from "../../features/repoApi"
import s from "./RepoItem.module.scss"
import { Link } from "react-router-dom"

type PropsType = {
    repo: RepoType
}
const RepoItem: FC<PropsType> = ({ repo }) => {
    const repoItem = repo.node
    return (
        <div className={s.item}>
            <p>
                <span>Name:</span>
                <span>
                    <Link to={"/repoInfo"}>{repoItem.name}</Link>
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
        </div>
    )
}

export default RepoItem
