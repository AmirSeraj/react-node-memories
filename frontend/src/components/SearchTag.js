import {useState} from "react";
import {useNavigate} from "react-router";
import {getPostBySearch} from "../redux/actions/posts";
import {useDispatch} from "react-redux";

const SearchTag = () => {
    const [tags, setTags] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const addTags = (e) => {
        if (e.key === 'Enter' && e.target.value) {
            setTags([...tags, e.target.value])
            e.target.value = ''
        }
    }
    const removeTag = (deletedTag) => {
        const newTag = tags.filter((tag) => tag !== deletedTag)
        setTags(newTag);
    }
    const searchPost = () => {
        if ( search.trim() || tags.length > 0 ) {
            dispatch(getPostBySearch({search, tags: tags.join(',')}));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {
            navigate('/');
        }
        setSearch('');
        setTags([]);
    }
    const handleKeyPressPost = (e) => {
        if (e.key === 'Enter') {
            searchPost();
            e.target.value = ''
        }
    }
    return (
        <>
            <input
                value={search}
                onKeyPress={handleKeyPressPost}
                onChange={(e) => setSearch(e.target.value)}
                className="search"
                placeholder="Search post..."
            />
            <div className="tag-container">
                {
                    tags.map((tag, index) => {
                        return <div className="tag" key={index}>
                            {tag} <span onClick={() => removeTag(tag)}>x</span>
                        </div>
                    })
                }
                <input
                    onKeyPress={addTags}
                    placeholder="Search tags..."
                />
            </div>
            <button onClick={searchPost} className="search--submit" type="submit">Search</button>
        </>
    )
}

export default SearchTag;