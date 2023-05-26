import axios from "axios"

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql"
const GITHUB_TOKEN = "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"

export const reposApi = {
    getRepos(query:any) {
        return axios.post<RepoResponseType>(
            GITHUB_GRAPHQL_API,
            { query },
            { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } }
        )
    },
}

export type RepoResponseType = {
    data: {
        search: {
            edges: RepoType[]
            pageInfo: PageInfoType
        }
    }
}
export type PageInfoType = {
    hasNextPage: boolean
    hasPreviousPage: boolean
    startCursor: null | string
    endCursor: null | string
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
