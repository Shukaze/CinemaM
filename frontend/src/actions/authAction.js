import { LOGIN_SUCCESS, LOGIN_ERROR, SIGNOUT, SIGNUP_SUCCESS, SIGNUP_ERROR } from './actionTypes';
import Axios from 'axios';

export const signIn = (credentials) => {
  return async (dispatch) => {
    try {
      const result = await Axios.post('/users/login', credentials)
      dispatch({ type: LOGIN_SUCCESS, payload: result })
    }
    catch (error) {
      dispatch({ type: LOGIN_ERROR, error })
    }
  }
}

export default {
    login : user =>{
      return fetch('/users/login', {
        method : "post",
        body: JSON.stringify(user),
        headers: {
          'Content-Type' : 'application/json'
        }
      }).then(res => {
        if(res.status !== 401)
           return res.json().then(data=>data);
        else  
          return {isAuthenticated : false, user : {username:"", role: ""}};
      })

    },
    register : user =>{
      return fetch('/users/register', {
        method : "post",
        body: JSON.stringify(user),
        headers: {
          'Content-Type' : 'application/json'
        }
      }).then(res => {
        if(res.status !== 401)
           return res.json().then(data=>data);
        else  
          return {isAuthenticated : false, user : {username:"", role: ""}};
      })
    },
    logout : () =>{
      return fetch('/users/logout')
        .then(res => res.json())
        .then(data => data);
    },
    isAuthenticated : () =>{
      return fetch('/users/authenticated')
      .then(res =>{
        if(res.status !== 401)
           return res.json().then(data=>data);
        else  
          return {isAuthenticated : false, user : {username:"", role: ""}};
      }); 
    }
}



export const signUp = (credentials) => {
  return async (dispatch) => {
    try {
      const result = await Axios.post('/users/signup', credentials)
      dispatch({ type: SIGNUP_SUCCESS, payload: result })
    }
    catch (error) {
      dispatch({ type: SIGNUP_ERROR, error })
    }
  }
}


export const signOut = () => {
  return (dispatch) => { dispatch({ type: SIGNOUT }) }
}
