
import {useContext} from "react"
import {useMutation} from "@apollo/react-hooks"
import {LOGIN_USER, LOGOUT_USER} from "../graphql/users.schemas"
import {setJWt, removeJWt} from "../utils/auth"


import AuthContext from "../contexts/auth.context"



export const useLogin = () => {
    const [loginUser, info] = useMutation(LOGIN_USER)
    const {setData} = useContext(AuthContext)


    const login = async (options) => loginUser(options).then(
        ({data}) => {
            const {token, payload, refreshExiresIn} = data.tokenAuth
            setJWt(token)
            setData({
                token,
                username: payload.username,
                expiry: refreshExiresIn
            })
            
            return data;
        }
    )

    return [login, info];
}

export const useLogout = () => {
    const {setData} = useContext(AuthContext)
    const logout = () => {  
        removeJWt();
        setData({
            token: null,
            username: null,
            expiry: null,

        })
    }

    return [logout]
}