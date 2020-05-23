import React, {useState, useContext} from 'react'
import {useLazyQuery, useMutation} from "@apollo/react-hooks"
import {createMemorySchema} from "../graphql/memories.schemas"
import CreateMemoryContext from "../contexts/createMemory.context"
/*
    fields (data, onChange)

*/

const MemoryForm = ({title}) => {
    const {onAfterMemoryCreate} = useContext(CreateMemoryContext)
    const [memory, setMemory] = useState("")
    const [createMemory, {loading, data}] = useMutation(createMemorySchema)

    

    const onCreateMemory = async (e) => {
        e.preventDefault();

        try{
            const response = createMemory({
                variables: {
                    memory
                }
            })
            onAfterMemoryCreate(response)
        }catch(e){
           console.log(e)
        }  
    }

    return (
        <div className="memory-form">
            <h1 className="memory-form__title">Create Memory</h1>
         
            <form>
                <div className="memory-form__memory">
                    {data && <p>Memory successfully created.</p>}
                    <input name="memory" placeholder="My memory..." onChange={(e) => setMemory(e.target.value)} value={memory}/>
                </div>

                <button className="memory-form__button" onClick={onCreateMemory}>Create Memory</button>
            </form>
        </div>
    )
}

export default MemoryForm