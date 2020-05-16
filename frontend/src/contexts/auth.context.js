
import React, {useState} from 'react'

import {setJWt, getJWT} from "../utils/auth"

const AuthContext = React.createContext({})



export const emptyAuthContext = {
    usernaem: null,
    token: null,
    expiry: null
}


let initalAuthContext = emptyAuthContext

const jwt = getJWT()
if(jwt){
    // decode jwt
    initalAuthContext = {
        ...initalAuthContext,
        token: jwt
    }
}

export const AuthContextProvider = ({children}) => {
    const [data, setData] = useState(initalAuthContext)

    const isLoggedIn = () => {
        if(data.token) return true
        return false; 
    }


    return (
        <AuthContext.Provider
            value={{
                data,
                setData,
                isLoggedIn
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext