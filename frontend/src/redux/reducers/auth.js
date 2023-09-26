import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS
} from "../constants/constants";

export const signUpReducer = (state = {loading: true, userInfo: []}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                loading: true
            }
        case USER_REGISTER_SUCCESS:
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
            return {
                loading: false,
                user: action.payload
            }
        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const signInReducer = (state = {loading: true, userInfo: []}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true
            }
        case USER_LOGIN_SUCCESS:
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
            return {
                loading: false,
                userInfo: action.payload
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}