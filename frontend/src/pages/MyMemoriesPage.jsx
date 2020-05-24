import React, {useState, useEffect} from 'react'
import {useQuery, useLazyQuery} from "@apollo/react-hooks"
import {ALL_MEMORIES, MY_MEMORIES} from "../graphql/memories.schemas"


import MemoryFilter from "../components/filterMemories.component"
import MemoryGrid from "../components/memoryGrid.component"

import {useHistory} from "react-router-dom"

const useUrlGetParams = (validKeys=[]) => {
    const history = useHistory()
    const [urlParams, setLocalUrlParams] = useState(null)

    
    const setUrlParams = (params) => {
        const currentPath = history.location.pathname;

        params = Object.keys(params).reduce((all, key) => 
            params[key] ? {[key]: params[key], ...all} : all
        , {})

        history.push({
            pathname: currentPath,
            search: "?" + new URLSearchParams(params).toString()
        })
       
    }

    // fires on url changes and checks if relevant url params changed
    useEffect(() => {
        const params = new URLSearchParams(history.location.search);

        const obj = validKeys.reduce((obj, key) => {
            const value = params.get(key)
   
            if(value){
                return {[key]: value, ...obj}
            }
            return obj
        }, {})

        // always set orderBy
        setLocalUrlParams({
            orderBy: "newest",
            ...obj
        })
       
    }, [history.location])

    

    return {
        setUrlParams,
        urlParams
    }
}

const MyMemories = () => {
    const {setUrlParams, urlParams} = useUrlGetParams(["orderBy", "s", "fromDate", "toDate"])
    const [myMemories, setMyMemories] = useState([])

    const [getMyMemories, { loading, error, data }] = useLazyQuery(MY_MEMORIES);

   
   

    // parse incoming data to fit form
    useEffect(() => {
        if(data && data.allMemories){
            setMyMemories(data.allMemories.edges.map(node => node.node))
        }
    }, [data])

    // react to url changes
    useEffect(() => {
        if(urlParams){
            console.log("query")
           getMyMemories({
                variables: urlParams
            })
        }
    },[urlParams])
  


    const onFilter = (filters) => {
        setUrlParams(filters)     
    }
 
    return (
        <main>
            <div className="container">
                <h1 style={{textAlign: "center", fontSize: "3.4rem", fontWeight: "100", letterSpacing: ".3rem"}}>My Memories</h1>
                <MemoryFilter onFilter={onFilter} />
                <MemoryGrid loading={loading} memories={myMemories} />
            </div>
        </main>
    )
}

export default MyMemories