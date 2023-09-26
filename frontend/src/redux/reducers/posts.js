import {
    COMMENT_POST_FAIL,
    COMMENT_POST_REQUEST,
    COMMENT_POST_SUCCESS,
    POST_CREATE_FAIL,
    POST_CREATE_REQUEST,
    POST_CREATE_SUCCESS,
    POST_DELETE_FAIL,
    POST_DELETE_REQUEST,
    POST_DELETE_SUCCESS,
    POST_INFO_FAIL,
    POST_INFO_REQUEST,
    POST_INFO_SUCCESS,
    POST_LIKE_FAIL,
    POST_LIKE_REQUEST,
    POST_LIKE_SUCCESS,
    POST_LIST_FAIL,
    POST_LIST_REQUEST,
    POST_LIST_SUCCESS,
    POST_SEARCH_FAIL,
    POST_SEARCH_REQUEST,
    POST_SEARCH_SUCCESS,
    POST_UPDATE_FAIL,
    POST_UPDATE_REQUEST,
    POST_UPDATE_SUCCESS
} from "../constants/constants";

export const postListReducer = (state = {loading: true, posts: []}, action) => {
    switch (action.type) {
        case POST_LIST_REQUEST:
        case POST_SEARCH_REQUEST:
            return {loading: true}
        case POST_LIST_SUCCESS:
        case POST_SEARCH_SUCCESS:
            return {
                loading: false,
                ...state.posts,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }
        case POST_LIST_FAIL:
        case POST_SEARCH_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const postInfoReducer = (state = {loading: true, post: []}, action) => {
    switch (action.type) {
        case POST_INFO_REQUEST:
            return {loading: true}
        case POST_INFO_SUCCESS:
            return {
                loading: false,
                post: action.payload
            }
        case POST_INFO_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const createPostReducer = (state = {loading: true, post: []}, action) => {
    switch (action.type) {
        case POST_CREATE_REQUEST:
            return {loading: true}
        case POST_CREATE_SUCCESS:
            return {loading: false, post: action.payload}
        case POST_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export const updatePostReducer = (state = {loading: true, post: []}, action) => {
    switch (action.type) {
        case POST_UPDATE_REQUEST:
            return {loading: true}
        case POST_UPDATE_SUCCESS:
            return {loading: false, post: action.payload}
        case POST_UPDATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export const deletePostReducer = (state = {loading: true, posts: []}, action) => {
    switch (action.type) {
        case POST_DELETE_REQUEST:
            return {loading: true}
        case POST_DELETE_SUCCESS:
            return {
                loading: false,
                posts: state?.posts?.filter((post) => post.id !== action.payload)
            }
        case POST_DELETE_FAIL:
            return {
                loading: true,
                error: action.payload
            }
        default:
            return state;
    }
}

export const likePostReducer = (state = {loading: true, post: []}, action) => {
    switch (action.type) {
        case POST_LIKE_REQUEST:
            return {loading: true}
        case POST_LIKE_SUCCESS:
            return {
                loading: false,
                post: action.payload
            }
        case POST_LIKE_FAIL:
            return {
                loading: true,
                error: action.payload
            }
        default:
            return state;
    }
}

export const commentPostReducer = (state = {loading: true,
    posts: []}, action) => {
    switch (action.type) {
        case COMMENT_POST_REQUEST:
            return {loading: true}
        case COMMENT_POST_SUCCESS:
            return {
                loading: false,
                // ...state.posts,
                // posts: state?.posts?.map((post) => {
                //     if (post._id === action.payload._id) return action.payload;
                //     return post;
                // }),
                postComment: action.payload
            }
        case COMMENT_POST_FAIL:
            return {
                loading: true,
                error: action.payload
            }
        default:
            return state;
    }
}
