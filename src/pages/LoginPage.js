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
import EnterOtp from 'components/login/EnterOtp';

const Login = ({ setLoggedIn, setUserData}) => {
    const navigate = useNavigate()

    const { setAlert } = useUserContext()
    const { register, handleSubmit, formState: { errors }, trigger } = useForm()

    const [ showPassword, setShowPassword] = useState(false)
    const [ loader, setLoader ] = useState(false)
    const [ forgotPass, setForgotPass ] = useState(false)
    const [ otpLogin, setOtpLogin ] = useState(false)
    const [ phoneNumber, setPhoneNumber ] = useState("")
    const [ disabled, setDisabled ] = useState(true)
    const [ otpSent, setOtpSent ] = useState(false)

    useEffect(() => {
        // Enable button only when the phone number has exactly 10 digits (ignoring hyphens)
        if (phoneNumber && phoneNumber.replace(/\D/g, '').length === 10) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [phoneNumber]);

    useEffect(() => {
        const token = localStorage.getItem("access")
        const logged = localStorage.getItem("logged")
        const refreshToken = localStorage.getItem("refresh")

        if (token && logged && refreshToken) {
            axiosInstance
            .post("/refresh", { refresh: refreshToken })
            .then(res => {
                console.log(res)
                localStorage.setItem("access", res.data.access)
                navigate("/analytics")
            })
            .catch(err => {
                localStorage.clear()
                localStorage.setItem("logged", false)
                sessionStorage.setItem("userData", null)
                setLoggedIn(false)
                console.log(err)
            })
        }
    }, [])

    // Handle Enter key press to trigger form submission
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                trigger(); // Validates form
                document.querySelector('form').dispatchEvent(new Event('submit')); // Triggers submit
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [trigger]);

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

    const handleSendOtp = () => {
        setLoader(true)

        axiosInstance
        .post("/login", { phone_number: `${phoneNumber}`, login_type: "admin" })
        .then(res => {
            console.log(res)
            setOtpSent(true)
        })
        .catch(err => {
            console.error(err)
            const res = err.response.data
            if (res.message === "User does not exist" || res.message === "Invalid Credentials") {
                setAlert("User not found")
            }
        })
        .finally(() => {
            setLoader(false)
        })
    }

  return (
    <div className='login-page-bg'>
        <div className='main-content'>

            {forgotPass &&
            <ForgotPassword
                setForgotPass={setForgotPass}
            />}

            <img 
                src={mainLogo} 
                className='main-logo' 
                alt='toooki' 
            />

            <div className='login-main-div'>
                <p className='main-title supermercado'>
                    Sign In
                </p>
                <p className='welcome-text supermercado'>
                    Welcome!
                </p>

                {!otpLogin &&
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

                    <div className='w-full flex max-w-[25rem] items-center justify-between mb-2 -mt-3'>
                        <span
                            onClick={() => setOtpLogin(true)}
                            className='underline cursor-pointer text-xs text-orange-600'
                        >
                            sign in with otp
                        </span>
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
                </form>}

                {otpLogin &&
                (!otpSent?
                <div className='max-w-[20rem] w-full flex flex-col items-center justify-center'>
                    <p className='text-gray-500 text-opacity-50 text-left text-xs'>
                        Please enter the mobile number and wait for OTP
                    </p>
                    <div className='mt-5 text-left w-full'>
                        <label className=' text-left text-orange-600'>
                            Phone Number:
                        </label>
                        <div className='flex mt-2 items-center w-full justify-center h-10 gap-2'>
                            <div className='bg-orange-600 w-16 h-full flex items-center justify-center bg-opacity-20 rounded-xl border-2 border-orange-600 border-opacity-40'>
                                +91
                            </div>
                            <input  
                                type='tel'
                                disabled={loader}
                                className='bg-orange-600 px-4 w-full h-full focus:outline-none bg-opacity-20 rounded-xl border-2 border-orange-600 border-opacity-40'
                                placeholder='eg: 888-999-0000'
                                value={phoneNumber}
                                onChange={e => {
                                    const value = e.target.value;
                                    // Allow only numbers and limit to 10 digits
                                    if (/^\d{0,10}$/.test(value)) {
                                        setPhoneNumber(value);
                                    }
                                }}
                                maxLength={10}
                            />
                        </div>
                    </div>
                    <button
                        disabled={(disabled || loader)? true : false} 
                        onClick={handleSendOtp}
                        className='bg-orange-600 disabled:bg-black disabled:bg-opacity-20 mt-4 w-full flex items-center justify-center h-10 rounded-xl font-medium text-white'
                    >
                        {loader? <ThreeDots color='#fff' /> : 'Send Otp'}
                    </button>
                    <button disabled={loader} onClick={() => setOtpLogin(false)} className='bg-transparent mt-4 w-full flex items-center justify-center rounded-xl font-medium text-orange-600'>
                        Sign In With Email
                    </button>
                </div> :
                <EnterOtp
                    phoneNumber={phoneNumber}
                    setOtpSent={setOtpSent}
                    setLoggedIn={setLoggedIn}
                />)}
            </div>
       </div>
    </div>
  )
}

export default Login