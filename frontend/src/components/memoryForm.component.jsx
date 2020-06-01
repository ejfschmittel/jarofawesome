import React, {useState, useContext} from 'react'
import {useLazyQuery, useMutation} from "@apollo/react-hooks"
import {createMemorySchema} from "../graphql/memories.schemas"

import MemoryInput from "./MemoryInput.component"
/*
    fields (data, onChange)

*/

const getCurrentDate = () => {
    const utc = new Date().toJSON().slice(0,10)
    return utc
}

const MemoryForm = ({title}) => {

    const [memoryData, setMemoryData] = useState({
        memory: "",
        date: getCurrentDate()
    })
    const [createMemory, {loading, data}] = useMutation(createMemorySchema)

    console.log(memoryData)

    const onChange = (e) => {
        console.log("onchange")
        const {name, value} = e.target
        if(memoryData.hasOwnProperty(name)){
            console.log("onchange")
            setMemoryData({...memoryData, [name]: value})
        }  
    }

    const onCreateMemory = async (e) => {
        e.preventDefault();


        console.log(memoryData)

        try{
            const response = createMemory({
                variables: memoryData
            })
           
        }catch(e){
           console.log(e)
        }  
    }

    return (
        <div className="memory-form">
            <h1 className="memory-form__title">Create Memory</h1>
         
            <form>
                <MemoryInput values={memoryData} onChange={onChange}/>
                <button className="memory-form__button" onClick={onCreateMemory}>Create Memory</button>
            </form>
        </div>
    )
}


export default MemoryForm