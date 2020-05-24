import React, {useState, useEffect} from 'react'
import {useLazyQuery} from "@apollo/react-hooks"

import {MEMORY_FILES} from "../graphql/memories.schemas"

const MemoryMediaList = ({id}) => {
    const [items, setItems] = useState([])

    const[getMemoryFiles,{data, error, loading}] = useLazyQuery(MEMORY_FILES)

    useEffect(() => {
        if(id){
            getMemoryFiles({
                variables: {
                    id
                }
            })
        }
    }, [id])

    useEffect(() => {
        if(data){
            setItems(data.memoryFiles)  
        }
    }, [data])

    return (
        <div className="media-list">
            { items.length > 0 ? 
                items.map(item => <MemoryMediaItem key={item.id} item={item} /> )
            : "No items yet"}
        </div>
    )
}

const MemoryMediaItem = ({item}) => {

    const path = item.file ? item.file : item.externalUrl

    return (
        <div className="media-list__item image-media" style={{backgroundImage:  `url(${path})` }}>
            
        </div>
    )
}

export default MemoryMediaList