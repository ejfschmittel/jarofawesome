import React from 'react'
import {useLazyQuery} from "@apollo/react-hooks"
import {RANOM_MEMORY} from "../graphql/memories.schemas"
import {useHistory} from "react-router-dom"

const RandomMemoryLink = ({children, text,...other}) => {
    const history = useHistory()
    const [getRandomMemory] = useLazyQuery(RANOM_MEMORY, {
        onCompleted: ({randomMemory}) => {
            console.log("test")
            history.push(`/memory/${randomMemory.id}`)
        },
        fetchPolicy: "no-cache"
    });
   


    const goToRandomMemory = (e) => {
        e.preventDefault();
        getRandomMemory(RANOM_MEMORY)
    }

    return (
        <a {...other} onClick={goToRandomMemory}>
            {children || text || "Remember When?"}
        </a>
    )
}

export default RandomMemoryLink