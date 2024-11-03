import { GraphQLClient } from 'graphql-request'

const isClient = typeof window !== 'undefined'

export const graphQLClient = new GraphQLClient('http://localhost:3001/graphql', {
    headers: {
        'Content-Type': 'application/json',
        Authorization: isClient ?  `Bearer ${window.localStorage.getItem('_threads_token')}`: ''
    },
})