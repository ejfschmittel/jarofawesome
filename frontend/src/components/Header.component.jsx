import React, {useContext} from 'react'
import {Link} from "react-router-dom"
import AuthContext from "../contexts/auth.context"

import {useLogout} from "../hooks/auth.hooks"

const Header = () => {
    const [logout] = useLogout()
    const {data: {token, username}} = useContext(AuthContext)
   

    const onLogout = (e) => {
        e.preventDefault();
        logout()
    }

    return (
        <header className="main-header">
          
                <Link to="/" className="main-header__title">Jar of Awesome</Link>
                <nav className="main-header__menu">
                    <ul>
                        {token ?
                            <React.Fragment>
                                <li><a onClick={onLogout}>Logout</a></li>
                            </React.Fragment>
                        :
                        <React.Fragment>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Sign Up</Link></li>
                        </React.Fragment>
                        
                        }
                    </ul>
                </nav>
  
        </header>
    )
}

export default Header;