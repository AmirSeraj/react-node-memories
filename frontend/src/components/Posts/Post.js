import moment from "moment";
import {getPostInfo, deletePost, likePost} from "../../redux/actions/posts";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Post = (props) => {
    const post = props.post;
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const [like, setLike] = useState('/images/dislike.png');
    const [likes, setLikes] = useState(post?.likes);

    const userId = user?.result?.googleId || user?.result?._id
    const hasLikedPost = post.likes.find((like) => like === userId);

    const handleLike = async () => {
        dispatch(likePost(post._id));
        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId));
        } else {
            setLikes([...post.likes, userId]);
        }
    }
    const editPost = (e) => {
        e.preventDefault();
        dispatch(getPostInfo(post._id));
    }
    const remove = (e) => {
        e.preventDefault();
        dispatch(deletePost(post._id));
    }

    useEffect(() => {
        if (likes.find((like) => like === userId)) {
            setLike('/images/like.png')
        } else {
            setLike('/images/dislike.png')
        }
    }, [likes,userId])

    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === userId) ?
                (
                    <span>&nbsp; {likes.length > 2 ? `You and ${likes.length - 1} others`
                        : `${likes.length} like${likes.length > 1 ? 's' : ''} `}</span>
                ) : (
                    <span>
                        &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
                    </span>
                )
        }
        return <span>&nbsp;Like</span>
    }

    return (
        <>
            <Link to={`/posts/${post._id}`}>
                <div className="post--parent--img">
                    <img className="post--image" alt="selected file" src={post.selectedFile}/>
                    <div className="overlay">
                        <div className="overlay-date-creator">
                            <h6>{post.name}</h6>
                            <p>{moment(post.createdAt).fromNow()}</p>
                        </div>
                        {(user?.result?._id === post?.creator || user?.result?.googleId === post?.creator) && (
                            <div
                                onClick={editPost}
                                className="post--more">
                                <i></i>
                                <i></i>
                                <i></i>
                            </div>
                        )}
                    </div>
                </div>
                <p className="post--tags">{post.tags.map((tag) => `#${tag}`)}</p>
                <p className="post--title">{post.title}</p>
                <p className="post--description">{post.description}</p>
            </Link>
            <div className="post--like-delete">
                <button
                    disabled={!user?.result}
                    className="like"
                    onClick={handleLike}>
                    <img
                        alt="like"
                        src={like}
                    />
                    <Likes/>
                </button>

                {(user?.result?._id === post?.creator || user?.result?.googleId === post?.creator) && (
                    <span className="delete">
                        <img
                            alt="delete"
                            onClick={remove}
                            src="/images/delete.png"/>
                    </span>
                )}

            </div>
        </>
    )
}
export default Post;