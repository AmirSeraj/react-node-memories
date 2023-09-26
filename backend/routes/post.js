import express from "express";
import {
    getPostBySearch,
    createPost,
    getPosts,
    updatePost,
    getPostById,
    deletePost,
    likePost,
    createCommentPost
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//http://localhost:5000/api/posts

// router.get('/', getPosts);
// router.post('/createPost', createPost);
router.route('/').get(getPosts);
router.route('/search').get(getPostBySearch);
router.route('/postInfo/:id').get(getPostById);
router.route('/createPost').post(auth,createPost);
router.route('/updatePost').post(auth, updatePost);
router.route('/deletePost/:id').delete(auth, deletePost);
router.route('/likePost/:id').patch(auth, likePost);
router.route('/commentPost').post(auth, createCommentPost);

export default router;