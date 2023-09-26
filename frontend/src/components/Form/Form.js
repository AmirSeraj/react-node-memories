import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createPost, updatePost} from "../../redux/actions/posts";
import FileBase from "react-file-base64";
import Loading from "../Loading";

const Form = () => {
    const [loading, setLoading] = useState(false);
    const [postId, setPostId] = useState('');
    const [postData, setPostData] = useState({
        title: '',
        description: '',
        tags: '',
        selectedFile: ''
    });
    const postInfo = useSelector((state) => state.postInfo);
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (postId) {
            dispatch(updatePost({...postData, name: user?.result?.name}, postInfo.post._id));
        } else {
            dispatch(createPost({...postData, name: user?.result?.name}))
        }
        cancel();
    }

    const cancel = () => {
        setPostData({
            title: '',
            description: '',
            tags: '',
            selectedFile: ''
        })
        setPostId(null)
    }

    useEffect(() => {
        !postInfo.post ? setLoading(true) : setLoading(false);
        setPostData(postInfo?.post)
        setPostId(postInfo?.post?._id)
    }, [postInfo?.post?._id])

    // postInfo?.post?.title
    if (!user?.result?.name) {
        return (
            <div className="no-create-post">
                <h6>Please Sign In to create your own memories and like others memories.</h6>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <h6 className="form--title">{postId ? 'Updating' : 'Creating'} a memory</h6>
            {
                loading ? <Loading/> :
                    (<>
                        <div className="form-control">
                            <label>Title</label>
                            <input
                                className="form--input"
                                placeholder="Title"
                                type="text"
                                name="title"
                                value={postData.title}
                                onChange={(e) => setPostData({
                                    ...postData,
                                    title: e.target.value
                                })}
                            />
                        </div>
                        <div className="form-control">
                            <label>Description</label>
                            <textarea
                                className="form--input"
                                placeholder="Description"
                                name="description"
                                value={postData.description}
                                onChange={(e) => setPostData({
                                    ...postData,
                                    description: e.target.value
                                })}
                            />
                            {/*{errors.description && <span className="errorMsg">{errors.description.message}</span>}*/}
                        </div>
                        <div className="form-control">
                            <label>Tags</label>
                            <input
                                className="form--input"
                                placeholder="Tags"
                                type="text"
                                name="tags"
                                value={postData.tags}
                                onChange={(e) => setPostData({
                                    ...postData,
                                    tags: e.target.value.split(',')
                                })}
                            />
                            {/*{errors.tags && <span className="errorMsg">{errors.tags.message}</span>}*/}
                        </div>
                        <div className="form-control">
                            <label></label>
                            <FileBase
                                type="file"
                                multiple={false}
                                onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                            />
                            <img alt="select-img" className="form--img" src={postData.selectedFile}/>
                        </div>
                        <div className="form-control">
                            <button className="form--btn form--submit" type="submit">Submit</button>
                            <button
                                className="form--btn form--cancel"
                                type="button"
                                onClick={cancel}>
                                Cancel
                            </button>
                        </div>
                    </>)
            }
        </form>
    )
}

export default Form;