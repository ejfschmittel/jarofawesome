
// decode token
import {LOCAL_STORAGE} from "../settings"

export const getJWT = () => {
    return localStorage.getItem(LOCAL_STORAGE.JWT_KEY)
}

export const setJWt = (token) => {
    return localStorage.setItem(LOCAL_STORAGE.JWT_KEY, token)
}

export const removeJWt = () => {
    return localStorage.removeItem(LOCAL_STORAGE.JWT_KEY)
}


