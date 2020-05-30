import React, {useState, useEffect} from 'react'
import {useLazyQuery} from "@apollo/react-hooks"
import MemoryMediaItem from "./memoryMediaItem.component"
import MediaItemEditor from "./memoryMediaItemEditor.component"

import MediaOverlay from "./MediaOverlay.component"
import {MediaOverlayContextProvider} from "../contexts/mediaOverlay.context"

import {MEMORY_FILES} from "../graphql/memories.schemas"



const MemoryMediaList = ({id, hashKey}) => {
    const [items, setItems] = useState([])
    const[getMemoryFiles,{data, error, loading}] = useLazyQuery(MEMORY_FILES)

    useEffect(() => {

        if(id){
            console.log("make media list request")
            getMemoryFiles({
                variables: {
                    id,
                    hashKey
                }
            })
        }
    }, [id, hashKey])

    useEffect(() => {
        if(data){
            setItems(data.memoryFiles)  
        }
    }, [data])

    return (
        <MediaOverlayContextProvider>
            <div className="media-list">
                <MediaItemEditor memoryId={id}/>
                { items.length > 0 ?                            
                    items.map((item, index) => <MemoryMediaItem key={item.id} item={item} index={index}/> )
                
                : "No items yet"}
                
            </div>
            <MediaOverlay items={items} />
        </MediaOverlayContextProvider>
 
    )
}


export default MemoryMediaList