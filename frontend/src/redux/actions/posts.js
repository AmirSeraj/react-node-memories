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
import axios from "axios";
import API from "../../api";

export const getPosts = (page) => async (dispatch) => {
    dispatch({
        type: POST_LIST_REQUEST,
    })
    try {
        const {data} = await axios.get(`/api/posts?page=${page}`);
        dispatch({
            type: POST_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: POST_LIST_FAIL,
            payload: error
        })
    }
}

export const getPostBySearch = (searchQuery) => async (dispatch) => {
    dispatch({
        type: POST_SEARCH_REQUEST,
    })
    try {
        const {data} = await axios.get(`/api/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
        dispatch({
            type: POST_SEARCH_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: POST_SEARCH_FAIL,
            payload: error
        })
    }
}

export const createPost = (post) => async (dispatch) => {
    dispatch({
        type: POST_CREATE_REQUEST,
    })
    try {
        const {data} = await API.post('/api/posts/createPost', post);
        dispatch({
            type: POST_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: POST_CREATE_FAIL,
            payload: error
        })
    }
}

export const getPostInfo = (postId) => async (dispatch) => {
    dispatch({
        type: POST_INFO_REQUEST,
    })
    try {
        const {data} = await axios.get(`/api/posts/postInfo/${postId}`);
        dispatch({
            type: POST_INFO_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: POST_INFO_FAIL,
            payload: error.message
        })
    }
}

export const updatePost = (post, postId) => async (dispatch) => {
    dispatch({
        type: POST_UPDATE_REQUEST,
    })
    try {
        const {data} = await API.post(`/api/posts/updatePost`, {
            postInfo: post,
            postId: postId
        });
        dispatch({
            type: POST_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: POST_UPDATE_FAIL,
            payload: error
        })
    }
}

export const deletePost = (postId) => async (dispatch) => {
    dispatch({
        type: POST_DELETE_REQUEST,
    })
    try {
        await API.delete(`/api/posts/deletePost/${postId}`);
        dispatch({
            type: POST_DELETE_SUCCESS,
            payload: postId
        })
    } catch (error) {
        dispatch({
            type: POST_DELETE_FAIL,
            payload: error
        })
    }
}

export const likePost = (postId) => async (dispatch) => {
    dispatch({
        type: POST_LIKE_REQUEST
    })
    try {
        const {data} = await API.patch(`/api/posts/likePost/${postId}`);
        dispatch({
            type: POST_LIKE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: POST_LIKE_FAIL,
            payload: error
        })
    }
}

export const commentPost = (comment, postId) => async (dispatch) => {
    dispatch({
        type: COMMENT_POST_REQUEST,
    })
    try {
        const {data} = await API.post('/api/posts/commentPost', {comment, postId});
        dispatch({
            type: COMMENT_POST_SUCCESS,
            payload: data,
        })
        return data.comments;
    } catch (error) {
        dispatch({
            type: COMMENT_POST_FAIL,
            payload: error
        })
    }
}
