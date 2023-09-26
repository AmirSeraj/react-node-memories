import Post from "./Post";
import {useSelector} from "react-redux";
import Loading from "../Loading";
import Pagination from "../Pagination";
import {useLocation} from "react-router";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Posts = () => {
    const {loading, posts} = useSelector((state) => state.posts);
    const query = useQuery();
    const searchQuery = query.get('searchQuery');
    const tags = query.get('tags');
    return (
        <div className="posts--paginate">
            {loading ? <Loading/> : (
                <div className="posts">
                    {posts?.map(post => (
                        <div className="card" key={post._id}>
                            <Post post={post}/>
                        </div>
                    ))}
                </div>
            )}
            {(!searchQuery && !tags?.length) && (
                <Pagination />
            )}
        </div>
    )
}

export default Posts;