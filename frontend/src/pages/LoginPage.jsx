import React, {useState} from 'react'
import {Link} from "react-router-dom"
import {LOGIN_USER} from "../graphql/users.schemas.js"
import {useMutation} from "@apollo/react-hooks"


import {useLogin} from "../hooks/auth.hooks"

const LoginPage = () => {
    const [error, setError] = useState(null)
    const [inputs, setInputs] = useState({
        username: "",
        password:"",
    })
    const [loginUser, { loading, data }] = useLogin()

   
   


   const onInputChange = (e) => {
    const {value, name} = e.target
    setInputs({...inputs, [name]: value})
   }


    const onLogin = async (e) => {
        e.preventDefault();

        try{
            const res = await loginUser({ variables: { ...inputs }}).then(data => {
                // handle redirect 
            })
            setError(null)
        }catch(e){
            setError(e.message)
        }
    }


    return (
        <main>
            <div className="container">                  
               

               <div className="center-form">
                    <div className="center-form__header">
                        <h1>Login</h1>
                        <p>And remeber all the amazing memories you've had.</p>
                    </div>
               
                    <form>
                        <div className="center-form__field">
                            <label for="username" className="center-form__label">Username</label>
                            <input type="text" name="username" className="center-form__input" onChange={onInputChange} value={inputs["username"]}/>
                        </div>
                        <div className="center-form__field">
                            <label for="password" className="center-form__label">Password</label>
                            <input type="password" name="password" className="center-form__input" onChange={onInputChange} value={inputs["password"]}/>
                        </div>
                    
                        <div className={`center-form__controls ${error && 'center-form__controls--error'}`}>
                            <button disabled={loading} onClick={onLogin} className="center-form__button">Login</button>


                    
                            {error && 
                                <div className="center-form__error">
                                    {error}
                                </div>
                            }
                        
                        </div>
                    </form>
                </div>
              
            </div>
        </main>
    )
}

export default LoginPage