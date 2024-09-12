import { useUserContext } from 'globalComponents/AppContext'
import React, { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { ThreeDots } from 'react-loader-spinner'
import axiosInstance from 'utils/AxiosInstance'

const ForgotPassword = ({ setForgotPass }) => {
    const { setAlert } = useUserContext()
    const [ stage, setStage] = useState(1)
    const [ email, setEmail] = useState("")
    const [ loader, setLoader] = useState(false)
    const [ showPassword, setShowPassword ] = useState(false)
    const [ changedDetails, setChangedDetails] = useState({
        otp: "",
        password: "",
        confirm_password: ""
    })

    // Handle input changes
    const handleChange = (e, field) => {
        setChangedDetails({
            ...changedDetails,
            [field]: e.target.value
        });
    }

    // Function to handle sending OTP
    const handleSendOtp = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            setAlert("Please enter an email address");
            return;
        }

        if (!emailRegex.test(email)) {
            setAlert("Please enter a valid email address");
            return;
        }

        setLoader(true)

        axiosInstance
            .post("forgotpassword/", { email })
            .then(res => {
                if (res.data.msg) {
                    setAlert(res.data.msg);
                } else {
                    setAlert("OTP sent successfully");
                    setStage(2); // Move to OTP verification stage
                }
            })
            .catch(err => {
                setAlert("Something went wrong");
                console.error(err);
            })
            .finally(() => {
                setLoader(false);
            });
    }

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password); // Checks for uppercase letter
        const hasLowerCase = /[a-z]/.test(password); // Checks for lowercase letter
        const hasNumber = /[0-9]/.test(password);    // Checks for a number
    
        if (!password || password.length < minLength) {
            setAlert("Password must be at least 8 characters long.");
            return false;
        }
    
        if (!hasUpperCase) {
            setAlert("Password must contain at least one uppercase letter.");
            return false;
        }
    
        if (!hasLowerCase) {
            setAlert("Password must contain at least one lowercase letter.");
            return false;
        }
    
        if (!hasNumber) {
            setAlert("Password must contain at least one number.");
            return false;
        }
    
        return true;
    }

    // Function to handle OTP verification and password change
    const handlePasswordChange = () => {
        const { otp, password, confirm_password } = changedDetails;

        if (!otp || otp.length !== 4) {
            setAlert("Please enter a valid 4-digit OTP");
            return;
        }

        if (!validatePassword(password)) {
            return;
        }

        if (password !== confirm_password) {
            setAlert("Passwords do not match");
            return;
        }

        setLoader(true)

        axiosInstance
            .post(`/forgotpassword/changepassword/${email}/`, { otp, password, confirm_password })
            .then(res => {
                setAlert("Password changed successfully");
                console.log(res)
                // Optionally redirect or take further action
            })
            .catch(err => {
                setAlert(err.response.data.msg);
            })
            .finally(() => {
                setLoader(false);
            });
    }

    const handleClose = () => {
        setEmail("")
        setChangedDetails({ otp: "", password: "", confirm_password: "" })
        setStage(1)
        setForgotPass(false)
    }

    return (
        <div className='w-screen h-screen z-[999] flex items-center justify-center backdrop-blur-sm fixed top-0 left-0'>
            <div className='px-10 py-5 relative bg-white rounded-2xl bg-opacity-80 border-2 border-orange-600 border-opacity-70'>
                <p className='supermercado text-2xl text-center'>
                    Forgot Password?
                </p>

                <button
                    onClick={handleClose}
                    className='text-orange-600 underline text-sm absolute top-2 right-3'
                >
                    close
                </button>

                {/* Step 1: Send OTP */}
                {stage === 1 && (
                    <>
                        <div className='w-full mt-10 flex flex-col items-start'>
                            <p className='text-sm text-orange-600 pl-3 pb-1'>
                                Enter your Email:
                            </p>
                            <input
                                type='email'
                                className='w-72 h-10 rounded-full bg-orange-400 bg-opacity-10 border-orange-600 border-2 px-5 focus:outline-none'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className='flex items-center justify-center w-full mt-5'>
                            <button
                                onClick={handleSendOtp}
                                className='h-10 font-medium bg-orange-600 text-white rounded-full px-10 flex items-center justify-center'
                            >
                                {!loader ? "Send OTP" : <ThreeDots color='#ffffff' />}
                            </button>
                        </div>
                    </>
                )}

                {/* Step 2: OTP and Password Change */}
                {stage === 2 && (
                    <>
                        <div className='w-full'>
                            <p className='text-sm pt-4 text-black text-opacity-70'>
                                OTP sent to{" "}
                                <span className='text-orange-600 font-medium'>{email}</span>{" "}
                                <span
                                    onClick={() => setStage(1)}
                                    className='text-orange-600 underline cursor-pointer'
                                >
                                    change?
                                </span>
                            </p>

                            <div className='mt-5 w-full flex flex-col items-start justify-start gap-1'>
                                <label className='text-sm text-orange-600 px-4'>Enter OTP:</label>
                                <input
                                    type='number'
                                    className='w-72 h-10 px-5 border-orange-600 border-2 rounded-full focus:outline-none tracking-widest'
                                    value={changedDetails.otp}
                                    onChange={e => handleChange(e, 'otp')}
                                    onInput={e => e.target.value = e.target.value.slice(0, 4)}
                                    required
                                />
                            </div>

                            <div className='mt-5 w-full flex flex-col items-start justify-start gap-1'>
                                <label className='text-sm text-orange-600 px-4'>New Password:</label>
                                <div className='w-72 h-10 relative'>
                                    <input
                                        type={showPassword? "text" : 'password'}
                                        className='w-full h-full px-5 border-orange-600 border-2 rounded-full focus:outline-none'
                                        value={changedDetails.password}
                                        onChange={e => handleChange(e, 'password')}
                                        required
                                    />
                                    <button
                                        onClick={() => setShowPassword(prev =>!prev)}
                                        className='absolute top-1/2 text-orange-600 -translate-y-1/2 right-3'
                                    >
                                        {!showPassword? <BsEye /> : <BsEyeSlash />}
                                    </button>
                                </div>
                            </div>

                            <div className='mt-5 w-full flex flex-col items-start justify-start gap-1'>
                                <label className='text-sm text-orange-600 px-4'>Confirm New Password:</label>
                                <input
                                    type={showPassword? "text" : 'password'}
                                    className='w-72 h-10 px-5 border-orange-600 border-2 rounded-full focus:outline-none'
                                    value={changedDetails.confirm_password}
                                    onChange={e => handleChange(e, 'confirm_password')}
                                    required
                                />
                            </div>

                            <div className='flex items-center justify-center w-full mt-5'>
                                <button
                                    onClick={handlePasswordChange}
                                    className='h-10 font-medium bg-orange-600 text-white rounded-full px-10 flex items-center justify-center'
                                >
                                    {!loader ? "Reset Password" : <ThreeDots color='#ffffff' />}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;
