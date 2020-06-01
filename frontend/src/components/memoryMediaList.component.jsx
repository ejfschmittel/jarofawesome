import React, {useState, useEffect} from 'react'
import {useLazyQuery} from "@apollo/react-hooks"
import MemoryMediaItem from "./memoryMediaItem.component"
import MediaItemEditor from "./memoryMediaItemEditor.component"

import MediaOverlay from "./MediaOverlay.component"
import {MediaOverlayContextProvider} from "../contexts/mediaOverlay.context"

import {MEMORY_FILES} from "../graphql/memories.schemas"

import MediaInput from "./MediaInput.component"



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

            <div className="media-list__wrapper">
                <div className="media-list__header">
                   
                    <MediaInput memoryId={id}/>
                </div>


                {items.length > 0 ? (
                    <div className="media-list">
                        { items.map((item, index) => (
                             <MemoryMediaItem key={item.id} item={item} index={index}/>
                        ))}
                    </div>            
                ) : (
                   <div className="media-list__empty-text">
                       <p>You haven't added any media items to your memory yet. Add some to make this memory more alive.</p>
                    </div>
                )}

      
                
               
            </div>
            <MediaOverlay items={items} />
        </MediaOverlayContextProvider>
 
    )
}


export default MemoryMediaList