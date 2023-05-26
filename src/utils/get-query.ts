export const getQuery = (searchTerm: string, RESULTS_PER_PAGE: number) => {
    return `
        query {
          search(query: "${searchTerm}", type: REPOSITORY,first:${RESULTS_PER_PAGE}),
            {
            edges {
          
              node {
                ... on Repository {
                  id
                  name
                  owner {
                  avatarUrl
                    login
                    url
                  }
                  stargazers {
                    totalCount
                  }
                  pushedAt
                  url
                  languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
                    nodes {
                      name
                    }
                  }
                  description
                }
              }
            }
          }
        }
      `
}
