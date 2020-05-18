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

export const GET_MEMORY = gql`
    query($id: UUID!){
        memory(id:$id){
            id,
            memory,
            date
        }
    }
`;

export const RANOM_MEMORY = gql`
    query{
        randomMemory{
            id,
            memory,
            date
        }
    }
`;