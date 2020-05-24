import React from 'react'
import {useQuery} from "@apollo/react-hooks"
import {ALL_MEMORIES} from "../graphql/memories.schemas"


import MemoryFilter from "../components/filterMemories.component"
import MemoryGrid from "../components/memoryGrid.component"

const MyMemories = () => {

    const {data, loading, error} = useQuery(ALL_MEMORIES)

    const onFilter = (filters) => {
        console.log(filters)
    }
 
    return (
        <main>
            <div className="container">
                <h1>My Memories</h1>
                <MemoryFilter onFilter={onFilter} />
                <MemoryGrid loading={loading} memories={data ? data.allMemories : []} />
            </div>
        </main>
    )
}

export default MyMemories