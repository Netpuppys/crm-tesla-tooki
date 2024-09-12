import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom"
import { IoClose } from "react-icons/io5";
import { MdCloudUpload } from "react-icons/md";
import { IoCloudDoneOutline } from "react-icons/io5";
import RedButton from 'globalComponents/ui/RedButton';
// import userData from 'userDummyData';
import "../../styles/components/DriverAddition/DriverAddition.css"
import axiosInstance from 'utils/AxiosInstance';
import { FaCamera } from 'react-icons/fa';
import { useUserContext } from 'globalComponents/AppContext';
import { ThreeDots } from 'react-loader-spinner';
import majorCities from 'globalComponents/data/majorCities';

const DriverAddition = () => {
    const { setAlert, fetchDrivers } = useUserContext()
    const location = useLocation()
    const [newAdmin, setNewAdmin] = useState({ firstName: "", lastName: "", email: "", mobile: "" });
    const [ userList , setUserList ] = useState()
    const [ fileUploaded, setFileUploaded ] = useState()
    const [ loader, setLoader ] = useState(false)

    useEffect(() => {
      console.log(fileUploaded)
  }, [fileUploaded])

    useEffect(() => {
        const userData = location.state
        console.log(userData)

        if (userData) { 
            setUserList(userData)
        }
    }, [location])

    useEffect(() => {
        console.log(newAdmin);
    }, [newAdmin]);

    const handleInputChange = (value, keyName) => {
        setNewAdmin(prev => ({
            ...prev,
            [keyName]: value,
        }));
    };

    const handleCityChange = (event) => {
        setNewAdmin(prev => ({
            ...prev,
            area: event.target.value,
        }));
    };

    const validatePassword = (password) => {
        const minLength = 8;
        const numberRegex = /\d/;
        // const upperCaseRegex = /[A-Z]/;
        const lowerCaseRegex = /[a-z]/;
    
        if (password.length < minLength) {
          alert(`Password must be at least ${minLength} characters long.`);
          return false
        }
        if (!numberRegex.test(password)) {
          alert('Password must contain at least one number.');
          return false
        }
        // if (!upperCaseRegex.test(password)) {
        //   alert('Password must contain at least one uppercase letter.');
        //   return false
        // }
        if (!lowerCaseRegex.test(password)) {
          alert('Password must contain at least one lowercase letter.');
          return false
        }
        return true;
      };
    

    const handleSubmit = () => {
        console.log("clicked")
        
        // Basic validation
        if (!newAdmin.firstName || !newAdmin.lastName || !newAdmin.email || !newAdmin.mobile || !newAdmin.password || !newAdmin.dL || !newAdmin.aadhar) {
            alert('All fields are required!');
            return;
        }

        if (!validatePassword(newAdmin.password)) {
            return
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newAdmin.email)) {
            alert('Invalid email format!');
            return;
        }
    
        // Mobile number validation (e.g., 10 digits)
        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(newAdmin.mobile)) {
            alert('Invalid mobile number! Must be 10 digits.');
            return;
        }
    
        // Ensure file is uploaded
        if (!fileUploaded) {
            alert('Please upload the police verification letter!');
            return;
        }
    
        const formData = new FormData();
        
        // Append fields from data
        formData.append('first_name', newAdmin.firstName);
        formData.append('last_name', newAdmin.lastName);
        formData.append('email', newAdmin.email);
        formData.append('user_type', "driver");
        formData.append('phone_number', newAdmin.mobile);
        formData.append('password', newAdmin.password);
        formData.append('city', newAdmin.city);
        formData.append('area', newAdmin.area);
        formData.append('license_no', newAdmin.dL);
        formData.append('aadhaar_no', newAdmin.aadhar);
        formData.append('police_verification_letter', fileUploaded);

        setLoader(true)
        
        axiosInstance
            .post("all/adddata/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                setLoader(false)
                console.log(res);
                alert("Driver Created");
                fetchDrivers()
            })
            .catch(err => {
                setLoader(false)
                console.log(err);
                const errors = err.response.data.data;
                const allMessages = [];

                const errMessage = []

                errMessage.push(`${err.response.data.message}: `)
                
                for (let field in errors) {
                    if (errors.hasOwnProperty(field) && field === "email" || field === "phone_number") {
                        allMessages.push(`${field}`);
                    }
                }

                errMessage.push(allMessages.join(", "))
                
                errMessage.push("already registerred.")


                alert(errMessage.join(' '));
            });
    
        return;
    };

    return (
        <div className='driver-add-main-div'>
            <p className='page-title'>Driver Addition</p>
            <p className='sub-title'>Add New Driver</p>

            <div className='driver-add-inputs-container'>
                <div className='new-community-form'>
                    <input
                        type='text'
                        placeholder='First Name'
                        className='community-input'
                        value={newAdmin.firstName}
                        onChange={e => handleInputChange(e.target.value, "firstName")}
                    />
                    <input
                        type='text'
                        placeholder='Last Name'
                        className='community-input'
                        value={newAdmin.lastName}
                        onChange={e => handleInputChange(e.target.value, "lastName")}
                    />
                    {/* <input
                        type='text'
                        placeholder='Username'
                        className='community-input email-input'
                        value={newAdmin.userName}
                        onChange={e => handleInputChange(e.target.value, "userName")}
                    /> */}
                    <input
                        type='email'
                        placeholder='Email ID'
                        className='community-input email-input'
                        value={newAdmin.email}
                        onChange={e => handleInputChange(e.target.value, "email")}
                    />
                    <input
                        type='number'
                        placeholder='Mobile Number'
                        className='community-input email-input'
                        value={newAdmin.mobile}
                        onChange={e => handleInputChange(e.target.value, "mobile")}
                    />
                    <input
                        type='text'
                        placeholder='Create Password'
                        className='community-input email-input'
                        value={newAdmin.password}
                        onChange={e => handleInputChange(e.target.value, "password")}
                    />
                    <input
                        type='number'
                        placeholder='Driving License No.'
                        className='community-input email-input'
                        value={newAdmin.dL}
                        onChange={e => handleInputChange(e.target.value, "dL")}
                        onInput={e => e.target.value = e.target.value.slice(0, 12)}
                    />
                    <input
                        type='number'
                        placeholder='Aadhar Card no.'
                        className='community-input email-input'
                        value={newAdmin.aadhar}
                        onChange={e => handleInputChange(e.target.value, "aadhar")}
                        onInput={e => e.target.value = e.target.value.slice(0, 12)}
                    />
                    <input
                        type='text'
                        placeholder='city'
                        className='community-input email-input'
                        value={newAdmin.city}
                        onChange={e => handleInputChange(e.target.value, "city")}
                    />
                    <select
                        value={newAdmin.area}
                        onChange={handleCityChange}
                        className='community-input email-input'
                    >
                        <option value="">Select Area</option>
                        {majorCities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                    {/* <input
                        type='file'
                        placeholder='Mobile Number'
                        className='community-input file-input email-input'
                        value={newAdmin.policeVerification}
                        onChange={e => handleInputChange(e.target.value, "policeVerification")}
                    /> */}

                    <div className="community-input file-input email-input file-input-group">
                        <p className='label-file-input'>
                            Upload Police Verification Letter
                        </p>
                        <input
                            type='file'
                            placeholder='Mobile Number'
                            className='community-input file-input email-input form-control'
                            // value={fileUploaded?.name}
                            onChange={e => setFileUploaded(e.target.files && e.target.files[0])}
                        />
                        {!fileUploaded &&
                        <div className='upload-icon'>
                            <MdCloudUpload />
                        </div>}
                        
                        {fileUploaded && 
                        <div className='upload-icon'>
                            <IoCloudDoneOutline />
                            <p className='upload-text'>
                                Upload Successful
                            </p>
                        </div>}
                    </div>
                </div>

                {/* <div className='or-divider'>
                    <div className='divider'></div>
                    <div className='divider'></div>
                </div>

                <div className='take-photo-div'>
                  <FaCamera />
                </div> */}
            </div>

            {/* <RedButton text={"Submit"} onClickHandler={handleSubmit}/> */}
            <button
                onClick={handleSubmit}
                className='px-8 py-2 text-xm text-white bg-green-600 rounded-full font-semibold'
            >
                {!loader? "Submit" : <ThreeDots color='#ffffff' height={20} />}
            </button>
        </div>
    );
};

export default DriverAddition;
