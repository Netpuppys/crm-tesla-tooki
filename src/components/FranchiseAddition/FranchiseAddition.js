import React, { useEffect, useState } from 'react';
import RedButton from 'globalComponents/ui/RedButton';
import "../../styles/components/Communities/Communities.css"
import axiosInstance from 'utils/AxiosInstance';

const franchise = [
  'A', 'B', 'C'
];


const FranchiseAddition = () => {
    const [newCommunityData, setNewCommunityData] = useState({ firstName: "", lastName: "", email: "", mobile: "" });
    const [selectedCommunity, setSelectedCommunity] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        console.log(newCommunityData);
    }, [newCommunityData]);

    const handleInputChange = (value, keyName) => {
        setNewCommunityData(prev => ({
            ...prev,
            [keyName]: value,
        }));
    };

    const handleSelectChange = (event) => {
        setSelectedCommunity(event.target.value);
    };

    const validation = () => {
        const newErrors = {};

        // Validate newCommunityData fields
        if (!newCommunityData.firstName) newErrors.firstName = "First Name is required";
        if (!newCommunityData.lastName) newErrors.lastName = "Last Name is required";
        if (!newCommunityData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(newCommunityData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!newCommunityData.mobile) {
            newErrors.mobile = "Mobile Number is required";
        } else if (!/^\d{10}$/.test(newCommunityData.mobile)) {
            newErrors.mobile = "Mobile Number is invalid";
        }

        // Validate selectedCommunity
        if (!selectedCommunity) newErrors.selectedCommunity = "Please select a franchise";

        setErrors(newErrors);
    }

    const handleSubmit = () => {
        validation()

        const formData = {
            first_name: newCommunityData.firstName,
            last_name: newCommunityData.lastName,
            email_id: newCommunityData.email,
            phone_number: newCommunityData.mobile,
            select_franchise: selectedCommunity
        }

        // If no errors, proceed with form submission
        if (Object.keys(errors).length === 0) {
            console.log("Form submitted successfully");
            // Perform form submission logic here

            axiosInstance
                .post("/Addfranchise/data", formData)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        }
    }

    return (
        <div className='communities-main-div'>
            <p className='page-title'>Franchise Addition</p>
            <p className='sub-title'>Create New Franchise</p>

            <div className='communities-inputs-container'>
                <div className='new-community-form'>
                    <input
                        type='text'
                        placeholder='First Name'
                        className='community-input'
                        value={newCommunityData.firstName}
                        onChange={e => handleInputChange(e.target.value, "firstName")}
                    />
                    <input
                        type='text'
                        placeholder='Last Name'
                        className='community-input'
                        value={newCommunityData.lastName}
                        onChange={e => handleInputChange(e.target.value, "lastName")}
                    />
                    <input
                        type='email'
                        placeholder='Email ID'
                        className='community-input email-input'
                        value={newCommunityData.email}
                        onChange={e => handleInputChange(e.target.value, "email")}
                    />
                    <input
                        type='number'
                        placeholder='Mobile Number'
                        className='community-input'
                        value={newCommunityData.mobile}
                        onChange={e => handleInputChange(e.target.value, "mobile")}
                    />
                </div>

                <div className='or-divider'>
                    <div className='divider'></div>
                    {/* <p className='or-text'>OR</p> */}
                    {/* <div className='divider'></div> */}
                </div>

                <div className='select-community-div'>
                    <select 
                        value={selectedCommunity} 
                        onChange={handleSelectChange}
                    >
                        <option value="">Select a franchise</option>
                        {franchise.map((community, index) => (
                            <option 
                                key={index} 
                                value={community}
                            >
                                {community}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <RedButton text={"Submit"} onClickHandler={handleSubmit}/>
        </div>
    );
};

export default FranchiseAddition;
