import React, {useState, useRef, useEffect, useContext} from 'react'
import {useParams, useLocation, useHistory} from "react-router-dom"
import {useQuery, useMutation} from "@apollo/react-hooks"
import {GET_MEMORY, UPDATE_MEMORY, DELETE_MEMORY, RECENT_MEMORIES} from "../graphql/memories.schemas"

import AuthContext from "../contexts/auth.context"

import MemoryMediaList from "../components/memoryMediaList.component"

import MemoryShareButton from "../components/memoryShareButton.component"

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

const useSearchParams = () => {
    const {search} = useLocation()    
    const query = new URLSearchParams(search);
    return query;
}


const useIsOwner = () => {
    const [isOwner, setIsOwner] = useState(false)
    const context = useContext(AuthContext)
    console.log(context)
    // get current user



    const compareOwnership = (user) =>{

    }


    return [isOwner, compareOwnership]
}

const MemoryDetailPage = () => {
    //const [isOwner, setIscompareOwnershipOwner] = useIsOwner()
    const searchQuery = useSearchParams()
    const history = useHistory()
    const hashKey= searchQuery.get("key")
    const {memoryid} = useParams()


    const {loading, data, error} = useQuery(GET_MEMORY, {
        variables: {
            id: memoryid,
            hashKey
        }
    })

    const [memory, setMemory] = useState(null)

    useEffect(() => {
        if(data && data.memory){
            setMemory(data.memory)
        }
    }, [data])


    const [updateMemory] = useMutation(UPDATE_MEMORY)
    const [deleteMemory] = useMutation(DELETE_MEMORY)

   
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
        }catch(e){
            console.log(e)
        }
        return {}
    }

    const onDelete = async (e) => {
        e.preventDefault();
   
        try{
            const res = await deleteMemory({
                variables: {id: memoryid},
                update: (cache, {data: {deleteMemory}}) => {
                    /* update after delte*/
          
                    const {memoryId} = deleteMemory
                    const {recentMemories} = cache.readQuery({ query: RECENT_MEMORIES});
                
                    // remove from array if id matches
                 
                    cache.writeQuery({
                        query: RECENT_MEMORIES, 
                        data: {recentMemories: recentMemories.filter(memory => memory.id !== memoryId)}
                    })
                }
            })
            history.push(`/memories/`)
        }catch(e){
            console.log(e)
        }
    }


    
    if(!loading && (!data || !data.memory)){
        return (
            <div className="not-found-page">
                <div className="not-found-page__inner">
                <h1 className="not-found-page__title">Memory has been forgotten or may have never existed</h1>
                <button className="not-found-page__button">
                    Back to homepage
                </button>
                </div>
            </div>
        )
    }

    return (
        <main>
            <div className="container">
                <div className="memory-details">

                        <header className="memory-details__header">
                        <h1 className="memory-details__memory">
                            <EditableField
                                value={!memory ? null : memory.memory}
                                onUpdate={onUpdate}
                            >
                                {!memory ? "Remember When..." : memory.memory}
                            </EditableField>
                           
                        </h1>


                        <div className="memory-details__options">
                            <MemoryShareButton memoryId={memory ? memory.id : null}/>
               

                    
                            <button  className="memory-details__delete-btn" onClick={onDelete}>
                                Delete
                            </button>               
                        </div>
                        </header>


                        <MemoryMediaList id={memory ? memory.id : null} hashKey={hashKey} />    
                </div>             
            </div>
        </main>
    )
}

export default MemoryDetailPage