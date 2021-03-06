import React, {useState} from 'react'

import {useMutation} from "@apollo/react-hooks"
import {CREATE_MEMORY_FILE, MEMORY_FILES} from "../graphql/memories.schemas"

/*

    - drag onto file 
    - insert file button
    - insert url field 

    - after add => tranform (preview state)
        - check media type
        - look like media type
        -

    

*/

/*

    inputs 
    after input
    loading screen
    display backgound & add button

    parse external url
        - youtube support
        - check if image

*/

const MediaItemEditor = ({memoryId}) => {

    const [addMemoryFile, {data, error, loading}] = useMutation(CREATE_MEMORY_FILE)

    const [url, setUrl] = useState("")
    const [file, setFile] = useState("")

    const onUrlChange = (e) => {
        const urlValue = e.target.value 
        setUrl(urlValue)
        console.log(urlValue)

        if(urlValue){
            addMemoryFileCall( {
                id: memoryId,
                externalUrl: urlValue
            })
        }
    }

    const onFileChange = (e) => {
        setFile(e.target.value)
        const {target: {validity, files: [file]}} = e

        console.log(validity)
        console.log(file)

        addMemoryFileCall({
            id: memoryId,
            file: file
        })
    }

    const addMemoryFileCall = (variables) => {
        addMemoryFile({
            variables: variables,
            update: (cache, {data: {createMemoryFile}}) => {  
                const {memoryFile} = createMemoryFile
                const {memoryFiles} = cache.readQuery({ query: MEMORY_FILES, variables: {id: memoryId, hashKey: null} });

                cache.writeQuery({
                        query: MEMORY_FILES, 
                        variables: {id: memoryId, hashKey: null},
                        data: {memoryFiles: memoryFiles.concat([memoryFile])}
                 })
            }
        })
    }





    return (
        <div className="media-list__item media-item-editor" >
            <h4 className="media-item-editor__title">Memorize new media item</h4>

            <div className="media-item-editor__body">      
                <input type="url" name="url" placeholder="external url..." onChange={onUrlChange} value={url} />
                <div className="media-item-editor__separator"></div>
                {loading && <div>loading...</div>}
                <input type="file" name="url" placeholder="chose_file" onChange={onFileChange} value={file} />
            </div>
        </div>
    )
}

export default MediaItemEditor  