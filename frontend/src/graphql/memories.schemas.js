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

export const DELETE_MEMORY = gql`
    mutation delteMemory($id:UUID!){
        deleteMemory(id: $id){
            ok,
            memoryId
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
    query($id: UUID!, $hashKey: String){
        memory(id:$id, hashKey:$hashKey){
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
    query memoryFiles($id: UUID!, $hashKey: String){
        memoryFiles(id: $id, hashKey: $hashKey){
            id,
            file,
            externalUrl,
            mediaType
        }
    }
`;

export const MY_MEMORIES = gql`
    query MyMemories($s: String, $fromDate: String, $toDate: String, $orderBy: String!){
        allMemories(s:$s, fromDate:$fromDate, toDate:$toDate, orderBy: $orderBy){
            edges{
                node{
                    pk,
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
`;

export const DELETE_MEMORY_FILE = gql`
    mutation($id: UUID!){
        deleteMemoryFile(id:$id){
            ok,
            memoryId,
            memoryFileId
        }
    } 
`;

export const CREATE_MEMORY_FILE = gql`
mutation($id: UUID!, $file: Upload, $externalUrl: String){
    createMemoryFile(id:$id, file:$file, externalUrl:$externalUrl){
      memoryFile{
        id,
        externalUrl,
        file,
        mediaType
      }
    }
  }
`;

export const GET_OR_CREATE_SHARE_LINK = gql`
mutation($memoryId: UUID!){
    getOrCreateShareLink(memoryId:$memoryId){
      memoryShareLink{
        id,
        hashKey,
        clicks,
        memory{
          id
        },
        createdAt
      }
    }
  }
`;


export const RESOLVE_SHARE_LINK = gql`
query($hashKey: String!){
    memoryShareLinkResolve(hashKey:$hashKey){
      memoryId,
      memoryShareLink{
        id,
        hashKey
      }
    }
  }
`;