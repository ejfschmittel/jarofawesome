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

export const ALL_MEMORIES = gql`
    query{
        allMemories{
            id,
            memory,
            date
        }
    }
`;

export const MEMORY_FILES = gql`
    query memoryFiles($id: UUID!){
        memoryFiles(id: $id){
        id,
        file,
        externalUrl
        }
    }
`;

export const MY_MEMORIES = gql`
    query MyMemories($s: String, $fromDate: String, $toDate: String, $orderBy: String!){
        allMemories(s:$s, fromDate:$fromDate, toDate:$toDate, orderBy: $orderBy){
            edges{
                node{
                    id,
                    memory,
                    date,
                }
            } 
        }
    }
`;

export const UPDATE_MEMORY = gql`
mutation updateMemory($id:  UUID!, $memory: String){
    updateMemory(data:{id:$id, memory: $memory}){
      memory{
          id,
        memory,
        description,
        date
      }
    }
  }
`