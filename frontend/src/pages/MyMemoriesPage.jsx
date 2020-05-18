import React from 'react'
import {useQuery} from "@apollo/react-hooks"
import {ALL_MEMORIES} from "../graphql/memories.schemas"


import MemoryGrid from "../components/memoryGrid.component"

const MyMemories = () => {

    const {data, loading, error} = useQuery(ALL_MEMORIES)
 
    return (
        <main>
            <div className="container">
                <h1>My Memories</h1>

                <MemoryGrid loading={loading} memories={data ? data.allMemories : []} />
            </div>
        </main>
    )
}

export default MyMemories