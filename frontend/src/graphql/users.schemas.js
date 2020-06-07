
import {gql} from "apollo-boost"

export const ME = gql`
    query Me{
        me{
            username,
            email
        }
    }
`;


export const LOGIN_USER = gql`
    mutation Login($username: String!, $password: String!){
        tokenAuth(username:$username, password:$password){
            token,
            payload,
            refreshExpiresIn
        }
    }
`;

export const SIGNUP_USER_2 = gql`
mutation($input: SignUpUserInput!){
    signUpUser(input: $input){
          user{
          id,
          email,
            username
        },
        errors{
            field,
            messages
        }
    }
  }
`;


export const SIGNUP_USER = gql`
    mutation SignUp($username: String!, $email: String!, $password: String!){
        createUser(username:$username, email:$email, password:$password){
            user{
                id,
                username,
                email,
            }
        }
    }
`;

export const LOGOUT_USER = gql`
mutation {
    deleteTokenCookie {
        deleted
    }
}
`