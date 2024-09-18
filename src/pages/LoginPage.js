import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import mainLogo from "../assets/Logos/mainLogo.png";
import { IoIosMail, IoIosLock, IoMdEye, IoMdEyeOff } from "react-icons/io";
import axiosInstance from 'utils/AxiosInstance';
import { ThreeDots } from 'react-loader-spinner';
import "../styles/components/Login/LoginPage.css";
import { useUserContext } from 'globalComponents/AppContext';
import ForgotPassword from 'components/login/ForgotPassword';

const Login = ({ setLoggedIn, setUserData}) => {
    const navigate = useNavigate()

    const { setAlert } = useUserContext()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const [ showPassword, setShowPassword] = useState(false)
    const [ loader, setLoader ] = useState(false)
    const [ forgotPass, setForgotPass ] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("access")
        const logged = localStorage.getItem("logged")

        if (token && logged) {
            navigate("/analytics")
            return
        }

        localStorage.clear()
        localStorage.setItem("logged", false)
        sessionStorage.setItem("userData", null)
        setLoggedIn(false)
    }, [])

    const onSubmit = (data) => {
        setLoader(true)

        const loginData = {
            email: data.email,
            password: data.password,
            login_type: "admin"
        }
        
        axiosInstance
            .post("/login", loginData)
            .then(res => {
                const response = res.data.data
                console.log(res.data.data.data)
                setUserData(response.user)
                localStorage.setItem("access", res.data.data.access)
                localStorage.setItem("refresh", res.data.data.refresh)
                localStorage.setItem("logged", true)
                sessionStorage.setItem("userData", JSON.stringify(response.user))
                setLoggedIn(true)
                navigate("/analytics")
            })
            .catch(err => {
                setAlert(err.response.data.message)
                
            })
            .finally(() => {
                setLoader(false)
            })
    };

  return (
    <div className='login-page-bg'>
        <div className='main-content'>

            {forgotPass &&
            <ForgotPassword
                setForgotPass={setForgotPass}
            />}

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

                        <div className='w-full flex items-center justify-end mb-2 -mt-3'>
                            <span
                                onClick={() => setForgotPass(true)}
                                className='text-gray-600 text-opacity-70'
                            >
                                Forgot Password?
                            </span>
                        </div>

                        <button type="submit" className="main-login-btn supermercado">
                            {!loader? "Login" : <ThreeDots color='white' />}
                        </button>
                    </form>

            </div>
       </div>
    </div>
  )
}

export default Login