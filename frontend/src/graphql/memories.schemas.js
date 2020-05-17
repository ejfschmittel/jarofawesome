import {gql} from "apollo-boost"


export const createMemorySchema = gql`
    mutation createMemory($memory: String!){
        createMemory(memory: $memory){
            memory{
            id,
            memory,
            description
            }
        }
    }
`;

export const RECENT_MEMORIES = gql`
    query{
        recentMemories{
            id,
            memory,
            date
        }
    }
`;