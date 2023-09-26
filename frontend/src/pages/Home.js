import Posts from "../components/Posts/Posts";
import Form from "../components/Form/Form";
import SearchTag from "../components/SearchTag";

const Home = () => {
    return(
        <div className="container">
            <Posts />
            <div className="form">
                <SearchTag />
                <Form />
            </div>
        </div>
    )
}

export default Home;