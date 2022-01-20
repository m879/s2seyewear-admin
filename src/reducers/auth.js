import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
} from '../actions/types';
  

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: localStorage.getItem('token') ? true : false,
  isLoading: false,
  user: localStorage.getItem('user'),
};
  
export default function (state = initialState, action) {
    switch (action.type) {
      case USER_LOADING:
        return {
          ...state,
          isLoading: true,
        };

      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload,
        };

      case LOGIN_SUCCESS:
          console.log("Reducer",action.payload);
          localStorage.setItem('user', action.payload);
          localStorage.setItem('token', action.payload.token);
          return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            isLoading: false,
            user: action.payload,
          };

      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT_SUCCESS:
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        console.log("LOGOUT SUCCESS");
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          user:null,
          isLoading: false,
        };

       default:
        return state;
    }
}
  