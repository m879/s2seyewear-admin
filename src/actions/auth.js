import axios from 'axios';
import {baseUrl} from './user';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
  } from './types';

import {baseURL } from '../config/config';

  // CHECK TOKEN & LOAD USER

export const loadUser = () => (dispatch) => {
    dispatch({ type: USER_LOADING });  
};
  
// REGISTER USER
export const userlogin = (userData) => (dispatch) => {
  
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios.post(`${baseURL}/admin/login`,userData,config)
    .then((res) => {
      console.log('Login seccessfully',res.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
        console.log(err);
        dispatch({
            type: LOGIN_FAIL,
        });
      });
};

// LOGOUT USER
export const logout = () => (dispatch) => {
    console.log('LOGOUT ACTION CALL NOW');
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    dispatch({
      type: LOGOUT_SUCCESS,
    });
};

export const Token = () => {
    return  localStorage.getItem('token');
};

  
  
