import axios from "axios"

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql"

export const instance = axios.create({
    baseURL: GITHUB_GRAPHQL_API,
    headers: {
        Authorization: `Bearer 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`,
    },
})
export const repoApi = {
    getRepos(query, variables) {
        return axios.post<RepoResponseType>(
            "https://api.github.com/graphql",
            { query, variables },
            {
                headers: {
                    Authorization: `Bearer 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`,
                },
            }
        )
    },
}

export type RepoResponseType = {
    data: {
        search: {
            edges: RepoType[]
        }
    }
}
export type RepoType = {
    node: {
        id: string
        name: string
        owner: {
            avatarUrl: string
            name: string
            url: string
            user: {
                name: string
            }
        }
        stargazers: {
            totalCount: number
        }
        pushedAt: string
        url: string
        languages: {
            nodes: Array<{ name: string }>
        }
        description: string
    }
}
