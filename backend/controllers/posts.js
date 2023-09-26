import PostMessage from "../mongodb/models/postMessage.js";
import mongoose from "mongoose";

const getPosts = async (req, res) => {
    const {page} = req.query;
    try {
        const LIMIT = 3;  /*pageSize*/
        const startIndex = (Number(page) - 1) * LIMIT; //get the starting index of every page
        const total = await PostMessage.countDocuments({});

        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
        res.status(200).json({
            data: posts,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total / LIMIT)
        });
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

// QUERY -> /posts?page=1 -> (page = 1 is a query)
// PARAMS -> /posts/:id -> /posts/123 -> id=123

const getPostBySearch = async (req, res) => {
    const {searchQuery, tags} = req.query;
    try {
        const title = new RegExp(searchQuery, 'i'); /*this means capital is not important -> test TEST Test --> all are same /// we convert it into regular expression because it is easy for mongodb to search in database */

        const posts = await PostMessage.find({$or: [{title}, {tags: {$in: tags.split(',')}}]});
        /* ${or} stands either find me the title or tags */

        res.status(200).json({data: posts})

    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const createPost = async (req, res) => {
    const post = req.body;
    try {
        // const postExists = await PostMessage.findOne({post.title});
        // if (postExists) {
        //     return res.status(200).json(postExists);
        // }
        const newPost = await PostMessage.create({
            ...post, creator: req.userId,
            createdAt: new Date().toISOString()
        })
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

const updatePost = async (req, res) => {
    const {postInfo, postId} = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).send('No post Found!')

    const updatedPost = await PostMessage.findByIdAndUpdate(postId, {...postInfo, postId}, {new: true})

    res.status(202).json(updatedPost);

}

const getPostById = async (req, res) => {
    const {id: _id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Not Found');
    try {
        const postInfo = await PostMessage.findById(_id);
        res.status(200).json(postInfo);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const deletePost = async (req, res) => {
    const {id: _id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Not Found');
    try {
        await PostMessage.findByIdAndRemove(_id, {new: true});
        res.status(200).json('post deleted successfully!');
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const likePost = async (req, res) => {
    const {id} = req.params;

    if (!req.userId) return res.json({message: 'Unauthenticated'})

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Not Found');

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {    /*it means his id is not in likes array  */
        /* like the post */
        post.likes.push(req.userId);
    } else {
        /* delete his like or rather dislike his post */
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

    res.status(201).json(updatedPost);
}

const createCommentPost = async (req, res) => {
    const {comment, postId} = req.body;
    const post = await PostMessage.findById(postId);
    post.comments.push(comment);
    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(postId, post, {new: true});
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPostBySearch,
    createCommentPost
}