import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getPostBySearch, getPostInfo} from "../redux/actions/posts";
import Loading from "../components/Loading";
import moment from "moment";
import CommentSection from "./CommentSection";

const PostDetail = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const dispatch = useDispatch();

    const {post, loading} = useSelector((state) => state.postInfo);

    useEffect(() => {
        dispatch(getPostInfo(id));
    }, [dispatch, id]);

    const {posts} = useSelector((state) => state.posts);

    useEffect(() => {
        if (post) {
            dispatch(getPostBySearch({search: 'none', tags: post?.tags?.join(',')}))
        }
    }, [post, id,dispatch])

    const recommendedPosts = post && (posts?.filter(({_id}) => _id !== post._id));

    const openPost = (_id) => {
        navigate(`/posts/${_id}`)
    }

    return (
        <>
            {
                loading ? <Loading/> : (
                    <div
                        className="w-full h-full bg-white flex flex-col rounded-2xl justify-between shadow-xl shadow-gray-400">
                        <div className="grid w-full h-full md:grid-cols-2 p-8">
                            <div className="flex flex-col w-full">
                                <p className="text-4xl uppercase font-bold">{post?.title}</p>
                                <p className="py-4 text-2xl text-slate-500">
                                    {post?.tags.map((tag) => `#${tag}`)}
                                </p>
                                <p className="text-2xl">{post?.description}</p>
                                <div className="my-2 pb-2 pt-1 w-full border-b">
                                    <p className="text-3xl font-bold py-2 text-slate-800">
                                        <span className="text-slate-700">Created by :</span>&nbsp;
                                        <span>{post?.name}</span>
                                    </p>
                                    <p className="mt-1 text-slate-600 text-2xl md:text-xl">
                                        {moment(post?.createdAt).fromNow()}
                                    </p>
                                </div>
                                <CommentSection post={post} />
                            </div>
                            <div className="px-2 py-6 order-first md:order-last">
                                <img alt="post" src={post?.selectedFile}
                                     className="max-h-[300px] w-full h-full rounded-xl"/>
                            </div>
                        </div>
                        {recommendedPosts?.length ? (
                            <div className="border border-t p-4 border-t-slate-500">
                                <h5 className="mb-3">You might also like:</h5>
                                <div className="flex flex-col flex-wrap md:flex-row my-3 content-center">
                                    {/*flex flex-col md:grid-cols-2 sm:flex-row*/}
                                    {recommendedPosts.map
                                    (({title, description, name, likes, selectedFile, _id}) => (
                                        <div
                                            key={_id}
                                            onClick={() => openPost(_id)}
                                            className="cursor-pointer w-[95%] sm:max-w-[245px] border rounded-lg flex flex-col justify-between bg-white p-2 m-3 rounded-lg border-slate-500 max-h-[300px]">
                                            <h4 className="font-bold py-2 text-2xl">{title}</h4>
                                            <p className="text-xl py-2">Creator: {name}</p>
                                            <p className="text-xl py-1
                                             max-h-[100px] overflow-hidden">{description}</p>
                                            <p className="text-xl py-2 font-bold">likes: {likes.length}</p>
                                            <img alt="img" className="flex self-center rounded content-end w-full max-h-[100px] place-self-end" src={selectedFile} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                    </div>
                )
            }
        </>
    )
}

export default PostDetail;