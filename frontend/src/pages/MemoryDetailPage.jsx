import React from 'react'
import {useParams} from "react-router-dom"
import {useQuery} from "@apollo/react-hooks"
import {GET_MEMORY} from "../graphql/memories.schemas"

const MemoryDetailPage = () => {
    const {memoryid} = useParams()
    const {loading, data, error} = useQuery(GET_MEMORY, {
        variables: {
            id: memoryid
        }
    })

    const memory = data && data.memory ? data.memory : null; 
    console.log(data)
    return (
        <main>
            <div className="container">
               <h1>{loading ? "Remember When..." : memory.memory}</h1>
            </div>
        </main>
    )
}

export default MemoryDetailPage