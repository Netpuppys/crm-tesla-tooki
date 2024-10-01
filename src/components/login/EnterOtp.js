import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
import OTPInput from 'react-otp-input';
import axiosInstance from 'utils/AxiosInstance';
import { useUserContext } from 'globalComponents/AppContext';

const EnterOtp = ({ setLoggedIn, phoneNumber, setOtpSent }) => {
  const navigate = useNavigate()
  const { setUserData } = useUserContext()

  const [ otp, setOtp] = useState('');
  const [ timer, setTimer] = useState(60); // 1-minute timer
  const [ isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [ loader, setLoader] = useState(false);

  // Timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setIsButtonDisabled(false); // Enable the button when timer hits 0
    }
  }, [timer]);

  const handleResendOtp = () => {
    axiosInstance
    .post("/resendotplogin/", { phone_number: `${phoneNumber}` })
    .then(res => {
        console.log(res)
        setIsButtonDisabled(true);
        setTimer(60);
    }) 
    .catch(err => {
        console.error(err)
    })
  };

  const handleSendOtp = () => {
    setLoader(true);
    // Logic to verify OTP

    axiosInstance
        .post("/verifyloginotp/", { phone_number: `${phoneNumber}`, otp: `${otp}`})
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
            console.error(err)
        })
        .finally(() => {
            setLoader(false)
        })
  };


  return (
    <div className='w-full lg:w-1/2 h-fit pt-10 px-6 flex flex-col items-center justify-start lg:justify-center'>

      <p className='text-center text-xs pt-4 text-black text-opacity-40'>
        Otp sent to {phoneNumber}.{" "}<span onClick={() => setOtpSent(false)} className='text-orange-600 cursor-pointer'>edit?</span>
      </p>

      <div className='mt-5 text-left'>
        {/* <label className='text-left text-orange-600'>OTP:</label> */}
        <div className='flex items-center justify-center gap-2 py-5'>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span className='text-2xl text-orange-600 mx-2'>-</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
                width: '50px', // Increase width
                height: '60px', // Increase height
                border: '2px solid #ea580c', // Orange-600 color
                borderRadius: '8px', // Rounded corners
                fontSize: '24px', // Increase font size
                textAlign: 'center', // Center the input text
                color: '#000', // Set text color
              }}
          />
        </div>
      </div>

      <button
        disabled={loader}
        onClick={handleSendOtp}
        className='bg-orange-600 mt-3 max-w-[17.815rem] disabled:bg-black disabled:bg-opacity-20 w-full flex items-center justify-center h-10 rounded-xl font-medium text-white'
      >
        {loader ? <ThreeDots color='#fff' /> : 'Enter'}
      </button>

      <div className='mt-4 text-center'>
        <button
          disabled={isButtonDisabled}
          onClick={handleResendOtp}
          className={`mt-5 w-full flex active:text-white items-center justify-center h-10 rounded-xl font-medium ${
            isButtonDisabled ? 'text-black text-opacity-20' : 'text-orange-600 '
          }`}
        >
          Resend OTP {isButtonDisabled && `(${timer}s)`}
        </button>
      </div>
    </div>
  );
};

export default EnterOtp;
