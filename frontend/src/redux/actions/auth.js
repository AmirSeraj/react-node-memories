import API from "../../api/index.js";
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
} from "../constants/constants";

export const signUp = (user,navigate) => async (dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST,
    })
    try {
        const {data} = await API.post('api/user/signUp', user);
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload: data
        })
        // localStorage.setItem('userInfo', JSON.stringify(data))
        navigate('/')
    } catch (error) {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload: error
        })
    }
}

export const signIn = (user,navigate) => async (dispatch) => {
    dispatch({
        type:USER_LOGIN_REQUEST,
    })
    try {
        const {data} = await API.post('/api/user/signIn',user);
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        // localStorage.setItem('userInfo', JSON.stringify(data))
        navigate('/')
    }catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:error
        })
    }
}

export const signOut = (navigate) => (dispatch) => {
    // localStorage.removeItem('userInfo')
    localStorage.clear();
    dispatch({
        type: USER_LOGOUT
    })
    navigate('/')
}

