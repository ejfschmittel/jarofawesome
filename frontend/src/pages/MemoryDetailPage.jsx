import React, {useState, useRef, useEffect} from 'react'
import {useParams} from "react-router-dom"
import {useQuery, useMutation} from "@apollo/react-hooks"
import {GET_MEMORY, UPDATE_MEMORY} from "../graphql/memories.schemas"

import MemoryMediaList from "../components/memoryMediaList.component"


const Spinner = ({height, width}) => {
    return (
        <svg className="spinner" width={width} height={height} viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
            <circle className="spinner__path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
        </svg>
    )
}

const EditableField = ({children, onUpdate, value, ...other}) => {

    const [internalValue, setInternalValue] = useState(value)
    const myInput = useRef(null)
    const [isEditing, setIsEditing] = useState(false);
   
    const [loading, setLoading] = useState(false)
    // add content changed handler

    useEffect(() => {
        setInternalValue(value);
    }, [value])
 
    // add editable classed
    const onBlur = async (e) => {
        // show loading icon
        setLoading(true)
        // do await task
        //const update = await handleChange()
        const {loading=false, editing=false} = await onUpdate(internalValue)
        // await
        setLoading(loading)
        setIsEditing(editing);
    }

    const onSelect = () => {
        // select item
        //setClasses("editable-field editable-field__selected")
        setIsEditing(true);

        console.log(myInput)
        console.log("selected"); 
    }

    const onChange = (e) => {
        setInternalValue(e.target.value)
    }

    return (
        <div className="editable-field" onClick={onSelect}>
            {children}
            {isEditing &&
            <React.Fragment>
                <input autoFocus value={internalValue || ""} onChange={onChange} onBlur={onBlur} ref={myInput}/>
                {loading && 
                    <div className="editable-field__loading-ico">
                        <Spinner width="20px" height="20px"/>
                    </div>
                }
             </React.Fragment>
            }
            
         
        </div>
    )
}

const MemoryDetailPage = () => {
    const {memoryid} = useParams()
    const {loading, data, error} = useQuery(GET_MEMORY, {
        variables: {
            id: memoryid
        }
    })

    const [memory, setMemory] = useState(null)

    useEffect(() => {
        if(data && data.memory){
            setMemory(data.memory)
        }
    }, [data])


    const [updateMemory] = useMutation(UPDATE_MEMORY)

   
    console.log(data)

  

    const onUpdate = async (internalValue) => {
        console.log(internalValue)

        // call update mutation
        try{
            const res =  await updateMemory({
                variables: {
                    id: memoryid,
                    memory: internalValue
                }
            })

            console.log(res)
        }catch(e){
            console.log(e)
        }
         
       

        return {}
    }

    return (
        <main>
            <div className="container">
                <div className="memory-details">
         
                        <h1 className="memory-details__memory">
                            <EditableField
                                value={!memory ? null : memory.memory}
                                onUpdate={onUpdate}
                            >
                                {!memory ? "Remember When..." : memory.memory}
                            </EditableField>
                           
                        </h1>


                        <MemoryMediaList id={memory ? memory.id : null} />
                     
                 
                </div>
               
            </div>
        </main>
    )
}

export default MemoryDetailPage