export const getQuery = (searchTerm: string, RESULTS_PER_PAGE: number, direction: boolean, endCursor, startCursor) => {
    const direct =
        direction === null
            ? `first: ${RESULTS_PER_PAGE}`
            : direction
            ? `first: ${RESULTS_PER_PAGE}`
            : `last: ${RESULTS_PER_PAGE}`
    const cursor =
        direction === null
            ? `after: ${endCursor}`
            : direction
            ? `after: ${startCursor ? `"${startCursor}"` : null}`
            : `before: ${endCursor ? `"${endCursor}"` : null}`
    return `
        query {
          search(query: "${searchTerm}", type: REPOSITORY,${direct},${cursor})
            {
             pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
            edges {
          
              node {
                ... on Repository {
                  id
                  name
                  owner {
                  avatarUrl
                    url
                    ... on User {
              name
            }
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
