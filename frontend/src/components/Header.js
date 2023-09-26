import {Link,useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {signOut} from "../redux/actions/auth";
import {useEffect, useState} from "react";
import decode from 'jwt-decode';

const Header = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const signOutHandler = () => {
        dispatch(signOut(navigate));
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if (token){
            const decodedData = decode(token);
            if (decodedData.exp * 1000 < new Date().getTime()) signOutHandler();
        }

        setUser(JSON.parse(localStorage.getItem('userInfo')))
    }, [location])

    return (
        <>
            <div className="logo">
                <Link to="/">
                    <h2 className="header--title">Memories</h2>
                </Link>
                <img className="header--img" src="/images/memories.png" alt="memories"/>
            </div>
            {
                (user?.result?.name) ?
                    (<div className="user-logout">
                        <Link onClick={signOutHandler}>Logout</Link>
                        <div className="user">
                            <img alt="user-img" className="user-img" src="/images/user.jpg"/>
                            <p className="user-name">
                                {user?.result?.name}
                            </p>
                        </div>
                    </div>)
                    :
                    <div className="login-logout">
                        <Link to="/auth">Sign In</Link>
                    </div>
            }
        </>
    )
}
export default Header;