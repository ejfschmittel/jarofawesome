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
      

        // test upload

 
        if(urlValue){
        /*addMemoryFile({
            variables: {
                id: memoryId,
                externalUrl: urlValue
            }
        })*/
        }
        
        

    }

    const onFileChange = (e) => {

        setFile(e.target.value)
    
 

        const {target: {validity, files: [file]}} = e

        console.log(validity)
        console.log(file)

        
        addMemoryFile({
            variables: {
                id: memoryId,
                file: file
            },
            update: (cache, {data: {createMemoryFile}}) => {          
                const {memoryFile} = createMemoryFile
                const {memoryFiles} = cache.readQuery({ query: MEMORY_FILES, variables: {id: memoryId} });

                // remove from array if id matches
                
               cache.writeQuery({
                    query: MEMORY_FILES, 
                    variables: {id: memoryId},
                    data: {memoryFiles: memoryFiles.concat([memoryFile])}
                })
            }
        })
    }

    const validateLink = (link) => {
        /**if(link.includes("youtube") || link.includes("youtu.be")){
            // validate youtube link https://www.youtube.com/watch?v=wSdT-SArM2Q&list=PLEoDyqDQJ4rZBzviqgRwjZlvmuoo6i-5E&index=2&t=0s
            const params = new URLSearchParams(link);
            const ytId = params.get("v");
        }*/
    }

    const clearInputs = () => {
        setUrl("")
        setFile("")
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