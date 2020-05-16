import React, {useContext} from 'react'
import {Route, Redirect} from "react-router-dom"
import AuthContext from "../contexts/auth.context"

const AuthRoute = ({...props}) => {
    const {data: {token}} = useContext(AuthContext)

    if(!token){
        return <Redirect to="/login" />
    }

    return (
        <Route {...props}/>
    )
}

export default AuthRoute

