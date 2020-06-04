import React, {useState} from 'react'
import {Link} from "react-router-dom"
import {SIGNUP_USER, ME} from "../graphql/users.schemas.js"
import {useMutation, useQuery} from "@apollo/react-hooks"

/*
    slide out lables

    errors & info next to button 

*/

const SignUpPage = () => {
   const [inputs, setInputs] = useState({
       username: "",
       email: "",
       password:"",
       repeat_password: ""
   })
   const [error, setError] = useState(null)
   const [signUpUser, { loading, data }] = useMutation(SIGNUP_USER)
   



   const onInputChange = (e) => {
    const {value, name} = e.target
    setInputs({...inputs, [name]: value})
   }


    const onSignUp = async (e) => {
        e.preventDefault();
        const {repeat_password, ...signUpParamers} = inputs
        if(repeat_password === inputs.password){          
            try{
                const response = await signUpUser({ variables: {  }})
                setError(null)
            }catch(e){
                setError(e.message)
            }
        }else{
            setError("Passwords do not match.")
        } 
    }

    return (
        <main>

            <div className="container">


                <div className="center-form">

                    <div className="center-form__header">
                        <h1>Sign Up</h1>
                        <p>And save all your most precious memories</p>
                    </div>
               


                {data &&
                    (
                        <div>
                            Successfully Created User: {data.createUser.user.username}. You can now <Link to="login">Login</Link>.
                        </div>
                    )
                }

                <form>
                    <div className="center-form__field">     
                        <label for="username" className="center-form__label">Username</label>           
                        <input type="text" name="username" className="center-form__input" onChange={onInputChange} value={inputs["username"]} required />                    
                    </div>
                    <div className="center-form__field">            
                        <label for="email" className="center-form__label">Email</label>         
                        <input type="email" name="email"  className="center-form__input" onChange={onInputChange} value={inputs["email"]} required/>            
                    </div>
                    <div className="center-form__field">
                        <label for="password" className="center-form__label">Password</label>
                        <input type="password" name="password"  className="center-form__input" onChange={onInputChange} value={inputs["password"]} required/>
                    </div>
                    <div className="center-form__field">
                        <label for="repeat_password" className="center-form__label">Confirm password</label>
                        <input type="password" name="repeat_password" className="center-form__input"  onChange={onInputChange} value={inputs["repeat_password"]} required/>
                    </div>

                    <div className={`center-form__controls ${error && 'center-form__controls--error'}`}>
                        <button disabled={loading} onClick={onSignUp} className="center-form__button">Sign Up</button>


                
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

export default SignUpPage