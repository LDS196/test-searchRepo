import React, { FC } from "react"
import { RepoType } from "../../features/repoApi"
import { useAppSelector } from "../../hooks/useAppSelector"
import { selectRepositories } from "../../features/repos.select"
import s from "./RepoCard.module.scss"
import { Link } from "react-router-dom"
type PropsType = {
    repo: RepoType
}
export const RepoCard = () => {
    const repoItem = useAppSelector(selectRepositories)[0].node
    return (
        <div className={s.main}>
            <h3>About repository</h3>
            <div className={s.intro}>
                <img src={repoItem.owner.avatarUrl} alt="avatar" />
                <span>Name:{repoItem.owner.name}</span>
            </div>
            <p>Name repository:{repoItem.name}</p>
            <p>Number of stars:{repoItem.stargazers.totalCount}</p>
            <p>Last commit:{repoItem.pushedAt}</p>
            <div className={s.languages}>
                <p>Languages</p>
                {repoItem.languages.nodes.map((l) => (
                    <span key={l.name}>{l.name}</span>
                ))}
            </div>
            <p>Descriptions:{repoItem.description}</p>

            <Link to={"/"}>
                <button>back to home</button>
            </Link>
        </div>
    )
}
