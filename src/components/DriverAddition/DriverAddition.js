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

const majorCities = [
    "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad",
    "Chennai", "Kolkata", "Pune", "Jaipur", "Surat",
    "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane"
];

const DriverAddition = () => {
    const { setAlert } = useUserContext()
    const location = useLocation()
    const [newAdmin, setNewAdmin] = useState({ firstName: "", lastName: "", email: "", mobile: "" });
    const [ userList , setUserList ] = useState()
    const [ fileUploaded, setFileUploaded ] = useState()

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

    const handleSubmit = () => {
        // Basic validation
        if (!newAdmin.firstName || !newAdmin.lastName || !newAdmin.email || !newAdmin.mobile || !newAdmin.password || !newAdmin.dL || !newAdmin.aadhar || !newAdmin.area) {
            setAlert('All fields are required!');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newAdmin.email)) {
            setAlert('Invalid email format!');
            return;
        }
    
        // Mobile number validation (e.g., 10 digits)
        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(newAdmin.mobile)) {
            setAlert('Invalid mobile number! Must be 10 digits.');
            return;
        }
    
        // Ensure file is uploaded
        if (!fileUploaded) {
            setAlert('Please upload the police verification letter!');
            return;
        }
    
        const formData = new FormData();
        
        // Append fields from data
        formData.append('first_name', newAdmin.firstName);
        formData.append('last_name', newAdmin.lastName);
        formData.append('email', newAdmin.email);
        formData.append('username', newAdmin.userName);
        formData.append('user_type', "driver");
        formData.append('phone_number', newAdmin.mobile);
        formData.append('password', newAdmin.password);
        formData.append('area', newAdmin.area);
        formData.append('license_no', newAdmin.dL);
        formData.append('aadhaar_no', newAdmin.aadhar);
        formData.append('police_verification_letter', fileUploaded);
        
        axiosInstance
            .post("all/adddata/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                console.log(res);
                setAlert("Driver Created");
            })
            .catch(err => {
                console.log(err);
                setAlert(err.response.data.message);
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
                    <input
                        type='text'
                        placeholder='Username'
                        className='community-input email-input'
                        value={newAdmin.userName}
                        onChange={e => handleInputChange(e.target.value, "userName")}
                    />
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
                    />
                    <input
                        type='number'
                        placeholder='Aadhar Card no.'
                        className='community-input email-input'
                        value={newAdmin.aadhar}
                        onChange={e => handleInputChange(e.target.value, "aadhar")}
                    />
                    <select
                        value={newAdmin.area}
                        onChange={handleCityChange}
                        className='community-input email-input'
                    >
                        <option value="" disabled>Select Area</option>
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

            <RedButton text={"Submit"} onClickHandler={handleSubmit}/>
        </div>
    );
};

export default DriverAddition;
