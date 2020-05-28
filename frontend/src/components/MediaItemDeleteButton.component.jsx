import React from 'react'

import {useMutation} from "@apollo/react-hooks"
import {DELETE_MEMORY_FILE, MEMORY_FILES} from "../graphql/memories.schemas"


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

export default DelteMediaItemButton
