import React from 'react'
import {ReactComponent as Logo} from "../svgs/image.svg"

import {useMutation} from "@apollo/react-hooks"
import {DELETE_MEMORY_FILE, MEMORY_FILES} from "../graphql/memories.schemas"
// edit
// delete
// view

const ImageMediaItem = ({item}) => {
    const path = item.file ? item.file : item.externalUrl

    return (
        <div  className="media-list__item media-item-image" style={{backgroundImage:  `url(${path})` }}>
            <Logo fill="#fff" className="media-item-image__logo" />
            <div className="media-item-image__menu">
               
               <div className="media-item-image__menu-body">
               <Logo fill="#fff" className="media-item-image__menu-svg" />
               </div>
              
            </div>

            <DelteMediaItemButton className={"media-item-image__delete-btn"} mediaItemId={item.id}/>
       
        </div>
    )
}

const DelteMediaItemButton = ({mediaItemId, className}) => {
    const [delteMemoryFile, {data, loading, error}] = useMutation(DELETE_MEMORY_FILE)

    const deleteMediaItem = (e) => {
        delteMemoryFile({
            variables: {
                id: mediaItemId
            },
            update: (cache, {data: {deleteMemoryFile}}) => {
                const {memoryId, memoryFileId} = deleteMemoryFile
                const {memoryFiles} = cache.readQuery({ query: MEMORY_FILES, variables: {id: memoryId} });

                // remove from array if id matches
             
                cache.writeQuery({
                    query: MEMORY_FILES, 
                    variables: {id: memoryId},
                    data: {memoryFiles: memoryFiles.filter(file => file.id !== memoryFileId)}
                })
            }
        })
    }

    return (
        <button className={className} onClick={deleteMediaItem}>
            X
        </button>
    )
}

export default ImageMediaItem