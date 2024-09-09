import React, { useEffect, useState } from 'react';
import RedButton from 'globalComponents/ui/RedButton';
import "../../styles/components/Communities/Communities.css";
import axiosInstance from 'utils/AxiosInstance';
import DriverList from './DriverTable';
import { useUserContext } from 'globalComponents/AppContext';

// Add a list of major cities in India
const majorCities = [
    "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad",
    "Chennai", "Kolkata", "Pune", "Jaipur", "Surat",
    "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane"
];

// {
//     "username": "fran34",
//     "password": "securepassword",
//     "email": "frise@example.com",
//     "first_name": "John",
//     "last_name": "Doe",
//     "user_type": "franchise",
//     "phone_number": "123453367890",
//     "profile_photo": null,
//     "city": "CityName",
//     "area": "AreaName",
//     "license_no": null,
//     "aadhaar_no": null,
//     "police_verification_letter": null,
//     "partners": 3,
//     "partner_details": [
//         {"name": "nirmal"},
//         {"name": "alok"},
//         {"name": "akash"}
//     ]
// }

const initialFormState = { 
    username: "",
    password: "",
    first_name: "", 
    last_name: "", 
    email: "", 
    phone_number: "", 
    noOfPartners: 0, 
    city: "",
    area: "", 
    user_type: "franchise",
    partners: [] 
}

const FranchiseAddition = () => {
    const { driverList } = useUserContext()
    const [newFranchiseData, setNewFranchiseData] = useState(initialFormState);
    const [selectedFranchise, setSelectedFranchise] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        console.log(newFranchiseData);
    }, [newFranchiseData]);

    const handleInputChange = (value, keyName) => {
        setNewFranchiseData(prev => ({
            ...prev,
            [keyName]: value,
        }));
    };

    const handlePartnerNameChange = (value, index) => {
        const updatedPartners = [...newFranchiseData.partners];
        updatedPartners[index] = { name: value };

        setNewFranchiseData(prev => ({
            ...prev,
            partners: updatedPartners
        }));
    };

    // const handleSelectChange = (event) => {
    //     setSelectedFranchise(event.target.value);
    // };

    const handleCityChange = (event) => {
        setNewFranchiseData(prev => ({
            ...prev,
            area: event.target.value,
        }));
    };


    const validation = () => {
        const newErrors = {};

        // Validate newFranchiseData fields
        if (!newFranchiseData.first_name) newErrors.first_name = "First Name is required";
        if (!newFranchiseData.last_name) newErrors.last_name = "Last Name is required";
        if (!newFranchiseData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(newFranchiseData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!newFranchiseData.phone_number) {
            newErrors.phone_number = "phone_number Number is required";
        } else if (!/^\d{10}$/.test(newFranchiseData.phone_number)) {
            newErrors.phone_number = "phone_number Number is invalid";
        }

        // Validate selectedFranchise
        if (!selectedFranchise) newErrors.selectedFranchise = "Please select a franchise";

        setErrors(newErrors);
    }

    const handleSubmit = () => {
        validation()
        
        const formData = {
            username: newFranchiseData.username,
            user_type: "franchise",
            first_name: newFranchiseData.first_name,
            last_name: newFranchiseData.last_name,
            email: newFranchiseData.email,
            password: newFranchiseData.password,
            phone_number: newFranchiseData.phone_number,
            city: newFranchiseData.city,
            area: newFranchiseData.area,
            partners: newFranchiseData.noOfPartners,
            partner_details: newFranchiseData.partners
        }

        // If no errors, proceed with form submission
        if (Object.keys(errors).length === 0) {
            console.log("Form submitted successfully");
            // Perform form submission logic here

            axiosInstance
                .post("all/adddata/", formData)
                .then(res => {
                    console.log(res)
                    // setNewFranchiseData(initialFormState)
                    alert("Added Successfully")
                })
                .catch(err => console.log(err))
        }
    }

    const handleCount = (next) => {
        setNewFranchiseData(prev => {
            if (next && prev.noOfPartners<5) {
                const newPartnerCount = prev.noOfPartners + 1;
                return {
                    ...prev,
                    noOfPartners: newPartnerCount,
                    partners: [...prev.partners, { name: "" }] // Add an empty partner for each new partner count
                };
            } else if (!next && prev.noOfPartners > 0) {
                const newPartnerCount = prev.noOfPartners - 1;
                return {
                    ...prev,
                    noOfPartners: newPartnerCount,
                    partners: prev.partners.slice(0, -1) // Remove the last partner input when count decreases
                };
            }
            return prev;
        });
    };
    
    return (
        <div className='w-full px-12 pt-5 text-left'>
            <p className='text-2xl text-[#1F384C] font-medium'>
                Franchise Addition
            </p>
            <div className='mt-10'>
                <p className='text-lg'>Add New Franchise</p>
            </div>

            <div className='w-full md:pr-32'>
                <div className='w-full flex flex-row items-start justify-start flex-wrap gap-x-6 gap-y-8 pt-8'>
                    <input
                        type='text'
                        placeholder='First Name'
                        className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-[30%] px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none'
                        value={newFranchiseData.first_name}
                        onChange={e => handleInputChange(e.target.value, "first_name")}
                    />
                    <input
                        type='text'
                        placeholder='Last Name'
                        className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-[30%] px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none'
                        value={newFranchiseData.last_name}
                        onChange={e => handleInputChange(e.target.value, "last_name")}
                    />
                    <input
                        type='text'
                        placeholder='User Name'
                        className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-[27%] px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none'
                        value={newFranchiseData.username}
                        onChange={e => handleInputChange(e.target.value, "username")}
                    />
                    <input
                        type='email'
                        placeholder='Email ID'
                        className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-[55%] px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none email-input'
                        value={newFranchiseData.email}
                        onChange={e => handleInputChange(e.target.value, "email")}
                    />
                    <input
                        type='number'
                        placeholder='Contact Number'
                        className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-[35%] px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none'
                        value={newFranchiseData.phone_number}
                        onChange={e => handleInputChange(e.target.value, "phone_number")}
                    />
                    <input
                        type='text'
                        placeholder='Password'
                        className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-[30%] px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none'
                        value={newFranchiseData.password}
                        onChange={e => handleInputChange(e.target.value, "password")}
                    />
                    <input
                        type='text'
                        placeholder='City'
                        className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-[60%] px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none'
                        value={newFranchiseData.city}
                        onChange={e => handleInputChange(e.target.value, "city")}
                    />
                    <div className='w-[45%] h-12 flex items-center justify-start gap-4'>
                        <p className='text-[#888888] h-full w-full rounded-full bg-[#FFE3D7] flex items-center justify-start px-6'>
                            {newFranchiseData.noOfPartners ? newFranchiseData.noOfPartners : "Number of Partners"}
                        </p>
                        <button
                            onClick={() => handleCount(false)}
                            className='h-full aspect-square rounded-xl bg-[#FFE3D7] flex items-center justify-center text-2xl'
                        >
                            -
                        </button>
                        <button
                            onClick={() => handleCount(true)}
                            className='h-full aspect-square rounded-xl bg-[#F76C2E] flex items-center justify-center text-2xl'
                        >
                            +
                        </button>
                    </div>
                    {/* <input
                        type='text'
                        placeholder='Area'
                        className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-[45%] px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none'
                        value={newFranchiseData.area}
                        onChange={e => handleInputChange(e.target.value, "area")}
                    /> */}
                    {/* Select dropdown for Area */}
                    <select
                        value={newFranchiseData.area}
                        onChange={handleCityChange}
                        className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-[45%] px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none'
                    >
                        <option value="" disabled>Select Area</option>
                        {majorCities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>

                {/* Dynamically render input fields for each partner */}
                {newFranchiseData.noOfPartners !== 0 &&
                    <div className='w-full flex flex-row items-start justify-start flex-wrap gap-x-6 gap-y-8 pt-8'>
                        {newFranchiseData.partners.map((partner, index) => (
                            <div className='w-[45%] h-fit relative'>
                                <input
                                    key={index}
                                    type='text'
                                    placeholder={`Partner ${index + 1} Name`}
                                    className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-full px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none'
                                    value={partner.name}
                                    onChange={e => handlePartnerNameChange(e.target.value, index)}
                                />
                                <p className='absolute -translate-y-1/2 top-1/2 right-4 text-sm font-semibold text-[#FF6B17]'>
                                    Share: {newFranchiseData.noOfPartners > 0 
                                        ? (Math.round((15 / newFranchiseData.noOfPartners) * 1000) / 1000) 
                                        : "N/A"}%
                                </p>
                            </div>
                        ))}
                    </div>
                }
            </div>

            <button
                onClick={handleSubmit}
                className='mt-16 px-10 bg-[#36CC29] h-10 flex items-center justify-center rounded-full text-white font-medium'
            >
                Submit
            </button>

            {newFranchiseData.area &&
            <div className='mt-10 w-full'>
                <DriverList driverList={driverList} area={newFranchiseData.area}/>
            </div>}
        </div>
    );
};

export default FranchiseAddition;
