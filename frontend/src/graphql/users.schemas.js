
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


export const SIGNUP_USER = gql`
    mutation SignUp($username: String!, $email: String!, $password: String!){
        createUser(username:$username, email:$email, password:$password){
            user{
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