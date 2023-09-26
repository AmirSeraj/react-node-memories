import {useState, useRef, useEffect} from "react";
import {useDispatch} from "react-redux";
import {commentPost} from "../redux/actions/posts";
// import {scrollIntoView} from "seamless-scroll-polyfill";

const CommentSection = ({post}) => {
    const dispatch = useDispatch();
    const [user,setUser] = useState([]);
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const commentsRef = useRef(null);

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComments(newComments);
        setComment('');
    }

    useEffect(() => {
        commentsRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        const user = JSON.parse(localStorage.getItem('userInfo'));
        setUser(user);
    },[comment])

    return (
        <div>
            <h1 className="font-bold">Comments</h1>
            <div className="overflow-y-scroll max-h-[250px]">
                {comments?.map((c, i) => (
                    <p className="text-lg p-2 border-b" key={i}>
                        <strong>{c.split(': ')[0]}: </strong>
                        {c.split(':')[1]}
                    </p>
                ))}
                <div ref={commentsRef}></div>
            </div>

            {(user && user?.result?.name) && (
                <div className="w-full md:w-[70%] p-3">
                    <h6>Write a Comment</h6>
                    <div className="w-full">
                        <div className="relative w-full min-w-[200px]">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-slate-300 bg-transparent px-3 py-3 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "></textarea>
                            <label
                                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Comment
                            </label>
                        </div>
                    </div>
                    <button type="submit"
                            disabled={!comment}
                            onClick={handleClick}
                            className="inline-flex items-center py-2.5 px-4 text-lg font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Post comment
                    </button>
                </div>
            )}
        </div>
    )
}
export default CommentSection;
