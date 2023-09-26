import {configureStore} from "@reduxjs/toolkit";
import {composeWithDevTools} from "@redux-devtools/extension";
import {applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import {
    commentPostReducer,
    createPostReducer,
    deletePostReducer,
    likePostReducer,
    postInfoReducer,
    postListReducer,
    updatePostReducer
} from "./reducers/posts";
import {signInReducer, signUpReducer} from "./reducers/auth";

const preloadedState = {
    signUpInfo: {
        userInfo: localStorage.getItem('userInfo') ?
            JSON.parse(localStorage.getItem('userInfo')) : null
    },
    signInInfo : {
        userInfo: localStorage.getItem('userInfo') ?
            JSON.parse(localStorage.getItem('userInfo')) : null
    }
}

const reducers = combineReducers({
    posts: postListReducer,
    // postsBySearch: getPostBySearchReducer,
    postInfo: postInfoReducer,
    createdPost: createPostReducer,
    updatePost: updatePostReducer,
    likePost: likePostReducer,
    deletePost: deletePostReducer,
    commentsPost: commentPostReducer,
    signUpInfo: signUpReducer,
    signInInfo: signInReducer,
})

const composeEnhancer = composeWithDevTools(applyMiddleware(thunk));

const store = configureStore({
    reducer: reducers,
    composeEnhancer,
    preloadedState
})

export default store;