import {useLocation, useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getPosts} from "../redux/actions/posts";
import {RxChevronLeft} from "react-icons/rx";
import {RxChevronRight} from "react-icons/rx";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Pagination = () => {
    const query = useQuery();
    const page = query.get('page') || 1;
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const postCreate = useSelector((state) => state.createdPost)
    const postUpdate = useSelector((state) => state.updatePost)
    const postDelete = useSelector((state) => state.deletePost)
    const postLike = useSelector((state) => state.likePost);
    const {numberOfPages} = useSelector((state) => state.posts);  /*total page count*/
    const [currentPage, setCurrentPage] = useState(page);
    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    useEffect(() => {
        if (currentPage) dispatch(getPosts(currentPage));
        navigate(`/posts?page=${currentPage}`)
    }, [dispatch, postCreate, postUpdate, postDelete, postLike, currentPage])

    const pages = [];
    for (let i = 1; i <= numberOfPages; i++) {
        pages.push(i);
    }

    const handleClick = (e) => {
        setCurrentPage(Number(e.target.id))
    }

    const renderPageNumbers = pages.map(number => {
        if (number <= maxPageNumberLimit && number > minPageNumberLimit) {
            return (
                <li
                    className={currentPage === number ? 'active' : null}
                    key={number}
                    id={number}
                    onClick={handleClick}>{number}</li>
            )
        } else {
            return null;
        }
    })

    const handlePrevBtn = () => {
        setCurrentPage(currentPage - 1);
        if ((currentPage - 1) % pageNumberLimit === 0){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }

    const handleNextBtn = () => {
        setCurrentPage(currentPage + 1);
        if ((currentPage + 1) > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit){
        pageIncrementBtn = <li onClick={handleNextBtn}>&hellip;</li>
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevBtn}>&hellip;</li>
    }

    return (
        <ul className="pageNumbers">
            <li>
                <button disabled={currentPage === 1}
                        onClick={handlePrevBtn}><RxChevronLeft size={18}/></button>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            <li>
                <button disabled={currentPage === pages[pages.length - 1]}
                    onClick={handleNextBtn}><RxChevronRight size={18}/></button>
            </li>
        </ul>
    )
}

export default Pagination;
