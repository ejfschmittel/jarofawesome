import React, {useState} from 'react'
import {Link} from "react-router-dom"
import {LOGIN_USER} from "../graphql/users.schemas.js"
import {useMutation} from "@apollo/react-hooks"


import {useLogin} from "../hooks/auth.hooks"

const LoginPage = () => {
   const [inputs, setInputs] = useState({
       username: "",
       password:"",
   })
   const [loginUser, { loading, error, data }] = useLogin()

   
   if (error) return `Error! ${error.message}`;


   const onInputChange = (e) => {
    const {value, name} = e.target
    setInputs({...inputs, [name]: value})
   }


    const onLogin = (e) => {
        e.preventDefault();
        loginUser({ variables: { ...inputs }}).then(data => {
            // handle redirect 
        }).catch(e => console.log(e))
    }


    return (
        <main>
            <div className="container">                  
               
                <h1>Login</h1>
                <form>
                    <div>
                        <input type="text" name="username" placeholder="username" onChange={onInputChange} value={inputs["username"]}/>
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="password"  onChange={onInputChange} value={inputs["password"]}/>
                    </div>
                    <button disabled={loading} onClick={onLogin}>Login</button>
                </form>
            </div>
        </main>
    )
}

export default LoginPage