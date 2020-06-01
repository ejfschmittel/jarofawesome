import React, {useEffect, useContext} from 'react'
import {useQuery} from "@apollo/react-hooks"
import {RECENT_MEMORIES} from "../graphql/memories.schemas"

import MemoryScroller from "./MemoryScroller.component"



const RecentMemories = () => {

    const {loading, error, data, refetch} = useQuery(RECENT_MEMORIES)


    return (
        <section className="section">
            <div>
                <h3 className="section__title">Recent Memories:</h3>
                <MemoryScroller loading={loading} memories={data && data.recentMemories ? data.recentMemories : []} /> 
           </div>
        </section>
    )
}

export default RecentMemories;