import React, {useContext} from 'react'
import AuthContex from "../contexts/auth.context"

import HomePageLoggedIn from "./HomePageLoggedIn"
import HomePageLoggedOut from "./HomePageLoggedOut"


const HomePage = () => {
    const {isLoggedIn} = useContext(AuthContex);

    if(isLoggedIn()) return <HomePageLoggedIn />

    return <HomePageLoggedOut />
}

export default HomePage