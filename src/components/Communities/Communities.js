import React, { useState } from 'react';
import RedButton from 'globalComponents/ui/RedButton';
import "../../styles/components/Communities/Communities.css"
import axiosInstance from 'utils/AxiosInstance';
import { useUserContext } from 'globalComponents/AppContext';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const communities = [
    "Community A",
    "Community B",
    "Community C",
    "Community D",
    "Community E",
];

const Communities = () => {
    const { vehicleTypes, setAlert, fetchCommunities } = useUserContext()

    const [newCommunityData, setNewCommunityData] = useState({ firstName: "", lastName: "", mobile: "" });

    const handleInputChange = (value, keyName) => {
        setNewCommunityData(prev => ({
            ...prev,
            [keyName]: value,
        }));
    };

    const handleSubmit = () => {
        const { firstName, lastName, mobile, community, vehicleType } = newCommunityData;

        // Validation
        if (!firstName.trim()) return setAlert("First name is required.");
        if (!lastName.trim()) return setAlert("Last name is required.");
        if (!community) return setAlert("Please select a community.");
        if (!vehicleType) return setAlert("Please select a vehicle type.");
        if (!/^\d{10}$/.test(mobile)) return setAlert("Please enter a valid 10-digit mobile number.");

        const data = {
            firstname: firstName,
            lastname: lastName,
            mobile_number: mobile,
            vehicle_type: vehicleType,
            community: community
        }

        axiosInstance
            .post("all/labourcommunity/", data)
            .then(res => {
                console.log(res)
                fetchCommunities()
                setAlert("Community Created")
            })
            .catch(err => {
                console.error(err)
                setAlert("Something went wrong")
            })
    }

    return (
        <div className='communities-main-div relative'>
            <p className='page-title'>Communities</p>
            <p className='sub-title'>Create New Community</p>

            <Link
                to={"/communities"}
                className='rounded-full border text-[#FF5C00] px-5 h-10 font-semibold border-[#FFB27C] text-sm absolute top-10 right-10 flex items-center justify-center gap-1'
            >
                Close 
                <span className='text-lg'>
                    <IoClose />
                </span>
            </Link>

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
                    <select 
                        className='community-input min-w-full'
                        value={newCommunityData.community}
                        onChange={e => handleInputChange(e.target.value, "community")}
                    >
                        <option value="">Select a community</option>
                        {communities.map((community, index) => (
                            <option 
                                key={index} 
                                value={community}
                            >
                                {community}
                            </option>
                        ))}
                    </select>
                    <input
                        type='tel'
                        placeholder='Mobile Number'
                        className='community-input'
                        value={newCommunityData.mobile}
                        onChange={e => handleInputChange(e.target.value, "mobile")}
                    />
                    <select
                        className='community-input'
                        value={newCommunityData.vehicleType}
                        onChange={e => handleInputChange(e.target.value, "vehicleType")}
                    >
                        <option value="">Select Vehicle Type</option>
                        {vehicleTypes.map((item, id) => (
                            <option
                                value={item}
                                key={id}
                            >
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <RedButton text={"Submit"} onClickHandler={handleSubmit}/>
        </div>
    );
};

export default Communities;
