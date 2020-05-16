import React, {useState} from 'react'
import {Link} from "react-router-dom"
import {SIGNUP_USER, ME} from "../graphql/users.schemas.js"
import {useMutation, useQuery} from "@apollo/react-hooks"

const SignUpPage = () => {
   const [inputs, setInputs] = useState({
       username: "",
       email: "",
       password:"",
       repeat_password: ""
   })
   const [signUpUser, { loading, error, data }] = useMutation(SIGNUP_USER)
   
   if (error) return `Error! ${error.message}`;


   const onInputChange = (e) => {
    const {value, name} = e.target
    setInputs({...inputs, [name]: value})
   }


    const onSignUp = (e) => {
        e.preventDefault();
        const {repeat_password, ...signUpParamers} = inputs
        if(repeat_password === inputs.password){
         
                signUpUser({ variables: { ...signUpParamers }}).catch(e => console.log(e))
          
          
            
        }else{
            // handle non matching passwords
        }     
    }

    return (
        <main>

            {data &&
                (
                    <div>
                        Successfully Created User: {data.createUser.user.username}. You can now <Link to="login">Login</Link>.
                    </div>
                )
            }

            <form>
                <div>
                    <input type="text" name="username" placeholder="username" onChange={onInputChange} value={inputs["username"]}/>
                </div>
                <div>
                    <input type="email" name="email" placeholder="email"  onChange={onInputChange} value={inputs["email"]}/>
                </div>
                <div>
                    <input type="password" name="password" placeholder="password"  onChange={onInputChange} value={inputs["password"]}/>
                </div>
                <div>
                    <input type="password" name="repeat_password" placeholder="repeat password"  onChange={onInputChange} value={inputs["repeat_password"]}/>
                </div>

                <button disabled={loading} onClick={onSignUp}>Sign Up</button>
            </form>
        </main>
    )
}

export default SignUpPage