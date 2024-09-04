import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import mainLogo from "../assets/Logos/mainLogo.png";
import { IoIosMail, IoIosLock, IoMdEye, IoMdEyeOff } from "react-icons/io";
import axiosInstance from 'utils/AxiosInstance';
import "../styles/components/Login/LoginPage.css";
import { ThreeDots } from 'react-loader-spinner';

const Login = ({ setLoggedIn, setUserData}) => {
    const navigate = useNavigate()
    // const { setUserId } = useUserContext()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [showPassword, setShowPassword] = useState(false)
    const [ loader, setLoader ] = useState(false)

    useEffect(() => {
        sessionStorage.setItem("logged", false)
        sessionStorage.setItem("userData", null)
        setLoggedIn(false)
    }, [])

    const onSubmit = (data) => {
        setLoader(true)

        const loginData = {
            email: data.email,
            password: data.password,
            login_type: "consumer"
        }
        axiosInstance
            .post("/login", loginData)
            .then(res => {
                const response = res.data.data
                console.log(res.data.data)
                setUserData(response.user)
                localStorage.setItem("access", res.data.data.access)
                localStorage.setItem("refresh", res.data.data.refresh)
                sessionStorage.setItem("logged", true)
                sessionStorage.setItem("userData", response.user)
                // setUserId(response.user.id)
                setLoggedIn(true)
                navigate("/analytics")
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoader(false)
            })
    };

    // const goToSignUp = () => {
    //     navigate("/signup")
    // }

  return (
    <div className='login-page-bg'>
        <div className='main-content'>

            <img src={mainLogo} className='main-logo' alt='toooki' />

            <div className='login-main-div'>
                    <p className='main-title supermercado'>
                        Sign In
                    </p>
                    <p className='welcome-text supermercado'>
                        Welcome!
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <div className='icon-wrap'>     
                                <IoIosMail />
                            </div>
                            <input
                                type="email"
                                placeholder='Email'
                                {...register("email", { required: true })}
                                className={errors.email? 'form-control input-error' : "form-control"}
                            />
                        </div>

                        <div className="form-group">
                            <div className='icon-wrap'>
                                <IoIosLock />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                {...register("password", { required: true })}
                                className={errors.email? 'form-control input-error' : "form-control"}
                            />
                            <button
                                type="button"
                                className="show-hide-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <IoMdEyeOff /> : <IoMdEye /> }
                            </button>
                        </div>

                        <div className='bottom-buttons'>
                            <div className='checkbox-div'>
                                <input
                                    type='checkbox'
                                    {...register("remember")}
                                    className='remember-checkbox'
                                    defaultChecked
                                />
                                <p className='remember-text'>
                                    Remember me
                                </p>
                            </div>
                            <button className='forgot-btn'>
                                Forgot Password?
                            </button>
                        </div>

                        <button type="submit" className="main-login-btn supermercado">
                            {!loader? "Login" : <ThreeDots color='white' />}
                        </button>
                    </form>

                    {/* <button onClick={goToSignUp} className='create-new-btn'>
                        Create a new account
                    </button> */}
            </div>
       </div>
    </div>
  )
}

export default Login