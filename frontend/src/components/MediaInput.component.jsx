import React, {useState} from 'react'
import {useMutation} from "@apollo/react-hooks"
import {CREATE_MEMORY_FILE, MEMORY_FILES} from "../graphql/memories.schemas"

/*

    preview image ?
    file input 
    loading bar
*/

const MediaInput = ({memoryId}) => {
    const [addMemoryFile, {data, error, loading}] = useMutation(CREATE_MEMORY_FILE)
    const [fileString, setFileString] = useState("")
    const [file, setFile] = useState(null)


    const onFileStringChange = (e) => {
        // set mode to external url
        setFile(null)
        setFileString(e.target.value)
    }

    const onFileChange = (e) => {
        const {target: {validity, files: [file]}} = e
        if(validity && file){
            setFile(file)
            setFileString(file.name)
        } 
    }

    const onSubmit = (e) => {
        // check which mode
        const args = {id: memoryId}


        if(file){
            args["file"] = file
        }else{
            args["externalUrl"] = fileString
        }
        
        addMemoryFile({
            variables: args,
            update: (cache, {data: {createMemoryFile}}) => {  
                const {memoryFile} = createMemoryFile
                const {memoryFiles} = cache.readQuery({ query: MEMORY_FILES, variables: {id: memoryId, hashKey: null} });

                cache.writeQuery({
                        query: MEMORY_FILES, 
                        variables: {id: memoryId, hashKey: null},
                        data: {memoryFiles: memoryFiles.concat([memoryFile])}
                 })
            }
        }).then(
            res => {
                setFile(null)
                setFileString("")
            }
        )

    }


    return (
        <div className="media-input">
            <input 
                type="url" 
                className={`media-input__url ${loading && 'media-input__url--loading'}`}
                placeholder="url..." 
                onChange={onFileStringChange} 
                value={fileString}
                disabled={loading}
                />


            <FileButton 
                id="file-input" 
                className="media-input__btn upload-btn" 
                onChange={onFileChange} 
                disabled={loading}
                >
                Chose File
            </FileButton>
            <button 
                className="media-input__btn media-input__upload-btn media-input__upload-btn--disabled" 
                onClick={onSubmit}
                disabled={loading}
                >
                Upload
            </button>
        </div>
    )
}

const FileButton = ({id, children, className, ...otherProps}) => {
    return (
        <React.Fragment>
            <input type="file" id={id}  {...otherProps} style={{display: "none"}}/>
            <label for={id} className={className}>{children}</label>
        </React.Fragment>
        
    )
}

export default MediaInput