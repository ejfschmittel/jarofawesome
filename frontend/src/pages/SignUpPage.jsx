import React, {useState} from 'react'
import {Link} from "react-router-dom"
import {SIGNUP_USER, SIGNUP_USER_2, ME} from "../graphql/users.schemas.js"
import {useMutation, useQuery} from "@apollo/react-hooks"

/*
    slide out lables

    errors & info next to button 


    formErrors = {
        exists: true
        primaryError: "asdfasdfa ",
        errors: {
            field: "message"
        }
    }
*/





const useFormErrors = (initialState) => {
    const [errors, setFormErrors] = useState(initialState || null)

    const getPrimaryError = (errors) => {
        if(errors && errors.length > 0){
            const {field, messages} = errors[0]
            return {field, message: messages[0]}
        }
        return null
    }

    const parseFormErrors = (errors) => {
        if(errors && errors.length > 0){
            const {field, message} = getPrimaryError(errors)
            const primaryError = field ? `${field}: ${message}` : message;
    
            const fieldErrorObject = errors.reduce((feo, error) => {
                const {field, messages} = error
                return {...feo, [field]: messages[0]}
            }, {})
    
            return { primaryError, errors: fieldErrorObject} 
        }
    
        return null
    }

    const setErrors = (errors) => {
        const parsedErrors =  parseFormErrors(errors)
        setFormErrors(parsedErrors)
    }

    const setError = (errorMessage, field=null, clear=false) => {
        let newFormErrors = null
        if(errorMessage){
            const message = field ? `${field}: ${errorMessage}` : errorMessage;
            const fieldErrors = field ?  !clear ? {...errors.errors, [field]: message} : {[field]:message}: errors.errors;
            newFormErrors = {primaryError: message, errors: fieldErrors}
        }
        setFormErrors(newFormErrors)
    }

    return [errors, {setErrors, setError}]
}

const SignUpPage = () => {
    const [errors, {setErrors, setError}] = useFormErrors()
    const [user, setUser] =useState(null)
   const [inputs, setInputs] = useState({
       username: "",
       email: "",
       password:"",
       repeat_password: ""
   })
  
   const [signUpUser, { loading, data }] = useMutation(SIGNUP_USER_2, {errorPolicy: "all"})
   



   const onInputChange = (e) => {
    const {value, name} = e.target
    setInputs({...inputs, [name]: value})
   }


    const onSignUp = async (e) => {
        e.preventDefault();
        const {repeat_password, ...signUpParamers} = inputs
        if(repeat_password === inputs.password){          
            try{
                console.log(signUpParamers)
                setErrors(null)
                setUser(null)
                const response = await signUpUser({ variables: { 
                    input: signUpParamers
                 }, errorPolicy: "all"})

                const data = response.data.signUpUser;
                console.log(data)
                if(data.errors && data.errors.length > 0){            
                    setErrors(data.errors)          
                }else{
                    setUser(data.user)
                }
                //setError(null)
            }catch(e){
                console.log(e)
                console.log(JSON.stringify(e, null, 2));
                console.log(e.graphQLErrors);
                //setError(error.message)
            }
        }else{
            setError("Passwords do not match.", "repeat_password", true)
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
               


              

                <form>
                    <FormField 
                        name="username"
                        label="Username"
                        type="text"
                        errors={errors}
                        onChange={onInputChange} 
                        value={inputs["username"]} 
                        required           
                    />
                    <FormField 
                        name="email"
                        label="Email"
                        type="email"
                        errors={errors}
                        onChange={onInputChange} 
                        value={inputs["email"]} 
                        required           
                    />
                    <FormField 
                        name="password"
                        label="Password"
                        type="password"
                        errors={errors}
                        onChange={onInputChange} 
                        value={inputs["password"]} 
                        required           
                    />
                    <FormField 
                        name="repeat_password"
                        label="Confirm password"
                        type="password"
                        errors={errors}
                        onChange={onInputChange} 
                        value={inputs["repeat_password"]} 
                        required           
                    />
    

                    <div className={`center-form__controls ${errors && 'center-form__controls--error'} ${user && 'center-form__controls--success'}`}>
                        <button disabled={loading} onClick={onSignUp} className="center-form__button">Sign Up</button>


                
                        {errors && 
                            <div className="center-form__error">
                                {errors.primaryError}
                            </div>
                        }

                        {user &&
                            <div className="center-form__message">
                                "{user.username}" has been created. <Link to="/login">Login Now.</Link>
                            </div>
                        
                        }


                    
                    </div>
                </form>
                </div>
            </div>
        </main>
    )
}

const FormField = ({name, label, errors, ...otherProps}) => {
    const inputClassName = `center-form__input ${errors && errors.errors[name] ? 'center-form__input--error' : ''}`;
    const error = errors && errors.errors[name] ? errors.errors[name] : null;
    return (
    <div className="center-form__field">
        <div className="center-form__field-info">          
            <label htmlFor={name} className="center-form__label">{label}</label>
            {error && <div className="center-form__input-error">({error})</div>}
        </div>
        <input  name={name} className={inputClassName} {...otherProps} />                    
    </div>  
    )
}

export default SignUpPage