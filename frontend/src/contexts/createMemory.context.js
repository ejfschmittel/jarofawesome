import React, {useState} from 'react'

const CreateMemoryContext = React.createContext({})


export const CreateMemoryContextProvider = ({children}) => {
    const [createdMemory, setCreatedMemory] = useState(null)
    
    const onAfterMemoryCreate = (createdMemory) => {
        setCreatedMemory(createdMemory)
    }

    return (
        <CreateMemoryContext.Provider
            value={{
                createdMemory,
                onAfterMemoryCreate,               
            }}
        >
            {children}
        </CreateMemoryContext.Provider>
    )
}


export default CreateMemoryContext