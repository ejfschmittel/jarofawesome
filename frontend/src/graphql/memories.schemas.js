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