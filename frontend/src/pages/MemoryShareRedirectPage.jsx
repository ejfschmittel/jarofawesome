import React, {useState, useEffect} from 'react'
import {useParams, Redirect} from "react-router-dom"

import {useQuery} from "@apollo/react-hooks"
import {RESOLVE_SHARE_LINK} from "../graphql/memories.schemas"

const MemoryShareRedirectPage = () => {
    const {shareHash} = useParams()
    const {data, loading, error} = useQuery(RESOLVE_SHARE_LINK, {
        variables: {hashKey: shareHash}
    })
    const [redirectLink, setRedirectLink] = useState(null)

    useEffect(() => {
       if(!loading && !error && data){     
           const memoryDetailUrl = `/memories/${data.memoryShareLinkResolve.memoryId}?key=${shareHash}`;
           setRedirectLink(memoryDetailUrl)
       }
    }, [data])


    if(redirectLink){
        return <Redirect to={redirectLink}/>
    }

    if(loading){
        return (
            <div className="container">
                <h1 style={{textAlign: "center"}}>Loading...</h1>
            </div>
        )
    }
    
    
    // display loading if share hash
    // display something went wrong if resolve Share hash fails
    // display redirect if resolved

    return (
        <div className="container">
            Your key is not asscoiated with a valid memory
        </div>
    )
}

export default MemoryShareRedirectPage