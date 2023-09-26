import {BsEyeFill, BsEyeSlashFill} from "react-icons/bs";
import {FcGoogle} from "react-icons/fc";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {GoogleLogin} from 'react-google-login';
import {signUp, signIn} from "../../redux/actions/auth";
import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";

// const initialState = {
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
// }

const Auth = () => {

    const userSignUpInfo = useSelector((state) => state.signUpInfo)
    const userSignInInfo = useSelector((state) => state.signInInfo)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [formData, setFormData] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword((prevState) => !prevState);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleShowConfirmPassword = () => setShowConfirmPassword((prevState) => !prevState);
    const switchMode = () => {
        setIsSignup((prevState) => !prevState)
        setShowPassword(false)
        setShowConfirmPassword(false)
        reset()
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm()

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (isSignup) {
    //         ///sign up user
    //         dispatch(signUp(formData, navigate))
    //     } else {
    //         dispatch(signIn(formData, navigate))
    //     }
    // }

    const onSubmit = (data) => {
        if (isSignup) {
            ///sign up user
            dispatch(signUp(data, navigate))
        } else {
            dispatch(signIn(data, navigate))
        }
    }

    // const handleChange = (e) => {
    //     setFormData({...formData, [e.target.name]: e.target.value});
    // }

    const googleSuccess = (res) => {
        console.log(res)
    }

    const googleFailure = () => {
        console.log("Google Sign In was unSuccessful. try again later")
    }

    return (
        <div className="container--sign">
            <div className="sign">

                {
                    userSignUpInfo.error && userSignUpInfo.error.response &&
                    userSignUpInfo.error.response.data.message
                    || userSignInInfo.error && userSignInInfo.error.response &&
                    userSignInInfo.error.response.data.message
                        ?
                        <>
                            <p className="serverError">
                                {userSignUpInfo.error &&
                                userSignUpInfo.error.response.data.message
                                ||
                                userSignInInfo.error &&
                                userSignInInfo.error.response.data.message}
                            </p>
                        </>
                        : null
                }

                {
                    isSignup ?
                        <div className="sign--left">
                            <p className="sign--memory">Memory</p>
                            <h4 className="left--title">Start your journey with us.</h4>
                            <p className="left--description">
                                Discover your world,s best memory
                            </p>
                            <div className="sign--people--experience">
                                <p>Simply unbelievable! I am really satisfied with recording my memory
                                    and share it with other people.</p>
                                <img alt="user" src="/images/user.jpg"/>
                            </div>
                        </div>
                        :
                        <div className="sign--left">
                            <p className="sign--memory">Memory</p>
                            <h4 className="left--title">Welcome Back.</h4>
                            <p className="left--description">
                                Discover your world,s best memory
                            </p>
                            <div className="sign--people--experience">
                                <p>Simply unbelievable! I am really satisfied with recording my memory and share it with
                                    other people.</p>
                                <img alt="user" src="/images/user.jpg"/>
                            </div>
                        </div>
                }

                <div className="sign--right">
                    <h4 className="sign--right--title">{isSignup ? 'Sign Up' : 'Sign In'}</h4>
                    <p className="account">
                        {
                            isSignup ? 'Already have an account?' : 'Dont have an account?'
                        }
                        &nbsp;
                        <span onClick={switchMode}>
                            {isSignup ? 'Sign In' : 'Sign Up'}
                        </span>
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {
                            isSignup &&
                            <div className="form-control">
                                <label>Full name</label>
                                <input
                                    placeholder="Full name"
                                    type="text" name="name" {...register("name", {
                                    required: true,
                                })} />
                                {errors.name && errors.name.type === "required" && (
                                    <p className="errorMsg">Name is required.</p>
                                )}
                            </div>
                        }

                        <div className="form-control">
                            <label>Email</label>
                            <input
                                placeholder="email"
                                type="text" name="email" {...register("email", {
                                required: true,
                                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                            })} />

                            {errors.email && errors.email.type === "required" && (
                                <p className="errorMsg">Email is required.</p>
                            )}
                            {errors.email && errors.email.type === "pattern" && (
                                <p className="errorMsg">Email is not valid.</p>
                            )}

                        </div>

                        <div className="form-control">
                            <label>Password</label>
                            <div className="password--container">
                                <input
                                    className="password--input"
                                    placeholder="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    {...register("password", {
                                        required: true,
                                        validate: {
                                            checkLength: (value) => value.length >= 6,
                                            matchPattern: (value) =>
                                                /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                                                    value
                                                )
                                        }
                                    })}
                                />
                                <span
                                    onClick={handleShowPassword}
                                    className="password--icon">
                                    {
                                        showPassword ? <BsEyeFill/> : <BsEyeSlashFill/>
                                    }
                                </span>
                            </div>
                            {errors.password?.type === "required" && (
                                <p className="errorMsg">Password is required.</p>
                            )}
                            {errors.password?.type === "checkLength" && (
                                <p className="errorMsg">
                                    Password should be at-least 6 characters.
                                </p>
                            )}
                            {errors.password?.type === "matchPattern" && (
                                <p className="errorMsg">
                                    Password should contain at least one uppercase letter, lowercase
                                    letter, digit, and special symbol.
                                </p>
                            )}
                        </div>

                        {
                            isSignup &&
                            <div className="form-control">
                                <label>Confirm Password</label>
                                <div className="password--container">
                                    <input
                                        className="password--input"
                                        placeholder="confirm Password"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        {...register("confirmPassword", {
                                            required: true,
                                            validate: {
                                                checkLength: (value) => value.length >= 6,
                                                matchPattern: (value) =>
                                                    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                                                        value
                                                    )
                                            }
                                        })}
                                    />
                                    <span
                                        onClick={handleShowConfirmPassword}
                                        className="password--icon">
                                    {
                                        showConfirmPassword ? <BsEyeFill/> : <BsEyeSlashFill/>
                                    }
                                    </span>
                                </div>
                                {errors.confirmPassword?.type === "required" && (
                                    <p className="errorMsg">Password is required.</p>
                                )}
                                {errors.confirmPassword?.type === "checkLength" && (
                                    <p className="errorMsg">
                                        Password should be at-least 6 characters.
                                    </p>
                                )}
                                {errors.confirmPassword?.type === "matchPattern" && (
                                    <p className="errorMsg">
                                        Password should contain at least one uppercase letter, lowercase
                                        letter, digit, and special symbol.
                                    </p>
                                )}
                            </div>
                        }

                        <div className="form-control">
                            &nbsp;
                            <button type="submit" className="register-btn">
                                {isSignup ? 'Sign Up' : 'Sign In'}
                            </button>
                            {!isSignup &&

                            <GoogleLogin
                                clientId={'GOOGLE ID'}
                                render={(renderProps) => (
                                    <button
                                        onClick={renderProps.onClick}
                                        type="submit" className="register-btn--google">
                                        <FcGoogle size={25}/>
                                        &nbsp;
                                        {/*<img alt="google" src="/images/google.png"/>*/}
                                        Sign In with Google
                                    </button>
                                )}
                                onSuccess={googleSuccess}
                                onFailure={googleFailure}
                                cookiePolicy="single_host_origin"
                            />
                            }
                        </div>

                    </form>

                </div>

            </div>
        </div>
    )
}

export default Auth;