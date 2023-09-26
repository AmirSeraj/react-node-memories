import Home from "./pages/Home";
import Header from "./components/Header";
import {BrowserRouter, Route} from "react-router-dom";
import {Routes, Navigate} from "react-router";
import Auth from "./components/Auth/Auth";
import PostDetail from "./pages/PostDetail";
import {useEffect, useState} from "react";

function App() {
    const [user,setUser] = useState({});
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userInfo')))
    },[user?.token])
    console.log(user)
    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="header">
                    <Header/>
                </header>
                <main>
                    <Routes>
                        <Route path="/" exact element={<Navigate to="/posts" />}/>
                        <Route path="/posts" exact element={<Home/>}/>
                        <Route path="/posts/search" exact element={<Home/>}/>
                        <Route path="/posts/:id" exact element={<PostDetail/>}/>
                        <Route path="/auth" element={user?.token ?
                            <Navigate replace={true} to="/posts" /> : <Auth />
                        }/>
                    </Routes>
                </main>
                <footer></footer>
            </div>
        </BrowserRouter>
    );
}
export default App;
