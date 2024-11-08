import React, { useEffect, useState } from 'react';
import axiosInstance from 'utils/AxiosInstance';
import DriverList from './DriverTable';
import { useUserContext } from 'globalComponents/AppContext';
import majorCities from 'globalComponents/data/majorCities';
import "../../styles/components/Communities/Communities.css";
import { ThreeCircles } from 'react-loader-spinner';

const initialFormState = { 
    username: "",
    password: "",
    first_name: "", 
    last_name: "", 
    email: "", 
    phone_number: "", 
    noOfPartners: 1, 
    city: "",
    area: "", 
    user_type: "franchise",
    partners: [
        { name: '', percentage: 15 },
    ] 
}

const FranchiseAddition = () => {
    const { driverList, fetchFranchise, setAlert } = useUserContext()
    const [newFranchiseData, setNewFranchiseData] = useState(initialFormState);
    const [ userList , setUserList ] = useState()
    const [ stateList, setStateList ] = useState([])
    const [ citiesList, setCitiesList ] = useState([])
    const [ areaList, setAreaList ] = useState([])
    const [ fileUploaded, setFileUploaded ] = useState()
    const [ pageLoader, setPageLoader ] = useState(false)
    const [ selectedCity, setSelectedCity ] = useState()
    const [ selectedState, setSelectedState ] = useState()
    const [allCitiesList, setAllCitiesList] = useState([]);

    const totalPercentage = (data) => { 
        return data.reduce((sum, item) => sum + parseFloat(item.percentage), 0);
    }

    useEffect(() => {
        console.log(newFranchiseData);
    }, [newFranchiseData]);

    useEffect(() => {
        setPageLoader(true);
    
        axiosInstance
            .get("all/states/")
            .then(res => {
                setStateList(res.data);
                console.log(res.data);
            })
            .catch((err) => console.error(err));
    
        axiosInstance
            .get("all/cities/")
            .then(res => {
                setAllCitiesList(res.data); // Store all cities data initially
                console.log(res.data);
            })
            .catch((err) => console.error(err))
            .finally(() => setPageLoader(false));
    }, []);

    const handleInputChange = (value, keyName) => {
        setNewFranchiseData(prev => ({
            ...prev,
            [keyName]: value,
        }));
    };

    const handlePartnerNameChange = (value, index) => {
        const updatedPartners = [...newFranchiseData.partners];
        
        // Keep the existing percentage and only update the name
        updatedPartners[index] = {
            ...updatedPartners[index],
            name: value
        };
    
        setNewFranchiseData(prev => ({
            ...prev,
            partners: updatedPartners
        }));
    };

    const handleStateChange = (event) => {
        const selectedState = event.target.value;
    
        setNewFranchiseData(prev => ({
            ...prev,
            state: selectedState,
            city: "",  // Reset city when state changes
            area: "",  // Reset area when state changes
        }));
    
        setSelectedState(selectedState);
    
        // Filter cities based on selected state
        const filteredCities = allCitiesList.filter(city => city.state_id === parseInt(selectedState));
        setCitiesList(filteredCities);
    };

    // const handleCityChange = (event) => {
    //     setSelectedCity(event.target.value)
    //     setNewFranchiseData(prev => ({
    //         ...prev,
    //         area: event.target.value,
    //     }));
    // };

    const handleCityChange = (event) => {
        const selectedCity = event.target.value;
    
        setNewFranchiseData(prev => ({
            ...prev,
            city: selectedCity,
            area: "",  // Reset area when city changes
        }));
    
        setSelectedCity(selectedCity);
    
        // Fetch areas for the selected city
        setPageLoader(true);
        axiosInstance.get(`all/api/cities/${selectedCity}/areas`)
            .then(res => setAreaList(res.data))
            .catch(err => console.error(err))
            .finally(() => setPageLoader(false));
    };

    // const handleAreaChange = (event) => {
    //     setNewFranchiseData(prev => ({
    //         ...prev,
    //         city: event.target.value,
    //     }));
    // };

    const handleAreaChange = (event) => {
        setNewFranchiseData(prev => ({
            ...prev,
            area: event.target.value,
        }));
    };


    const validation = () => {
        // Validate top-level fields of newFranchiseData
        const requiredFields = ["first_name", "last_name", "email", "phone_number", "password", "city", "area"];
        
        for (let field of requiredFields) {
            if (!newFranchiseData[field]) {
                return `${field.replace("_", " ")} is required`;
            }
        }
    
        // Specific email and phone number validation
        if (!/^\S+@\S+\.\S+$/.test(newFranchiseData.email)) {
            return "Email is invalid";
        }
        
        if (!/^\d{10}$/.test(newFranchiseData.phone_number)) {
            return "Phone Number is invalid";
        }
        
        if (!/^(?=.*\d).{8,}$/.test(newFranchiseData.password)) {
            return "Password must be at least 8 characters long and contain at least 1 number";
        }
    
        // Validate partners array fields
        if (newFranchiseData.partners.length === 0) {
            return "At least one partner is required";
        }
    
        for (let i = 0; i < newFranchiseData.partners.length; i++) {
            const partner = newFranchiseData.partners[i];
    
            if (!partner.name) {
                return `Partner ${i + 1}'s name is required`;
            }
    
            if (!partner.percentage || isNaN(partner.percentage) || partner.percentage <= 0 || totalPercentage(newFranchiseData.partners) !== 15) {
                return `Partner ${i + 1}'s percentage must be a valid number greater than 0`;
            }
        }
    
        return true;
    };    

    const handleSubmit = () => {
        const error = validation()
        if (error !== true) {
            setAlert(error)
            return
        }
        
        const formData = {
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

        axiosInstance
            .post("all/adddata/", formData)
            .then(res => {
                console.log(res)
                // setNewFranchiseData(initialFormState)
                alert("Added Successfully")
                fetchFranchise()
            })
            .catch(err => {
                // console.log(err)
                if (err.response.data.data.phone_number) {
                    setAlert("Phone Number already in use")
                    return
                }
                if (err.response.data.data.email) {
                    setAlert("Email already in use")
                }
            })
    }

    const handleCount = (next) => {
        setNewFranchiseData(prev => {
            if (next && prev.noOfPartners<5) {
                const newPartnerCount = prev.noOfPartners + 1;
                return {
                    ...prev,
                    noOfPartners: newPartnerCount,
                    // partners: [...prev.partners, { name: "", percentage: 15 / newPartnerCount }] // Add an empty partner for each new partner count
                };
            } else if (!next && prev.noOfPartners > 1) {
                const newPartnerCount = prev.noOfPartners - 1;
                return {
                    ...prev,
                    noOfPartners: newPartnerCount,
                    // partners: prev.partners.slice(0, -1) // Remove the last partner input when count decreases
                };
            }
            return prev;
        });
    };

    const HandleAddPartners = () => {
        setNewFranchiseData(prev => {
            const noOfPartners = prev.noOfPartners;
            const percentagePerPartner = Math.round((15 / noOfPartners) * 1000) / 1000;
    
            const partnerArr = Array.from({ length: noOfPartners }, () => ({
                name: "",
                percentage: percentagePerPartner
            }));
    
            console.log(partnerArr);
    
            return {
                ...prev,
                partners: partnerArr
            };
        });
    };

    const handleShareChange = (event, index) => {
        const value = event.target.value;
        setNewFranchiseData(prev => {
            const updatedPartners = [...prev.partners];
            updatedPartners[index].percentage = parseFloat(value);
    
            return {
                ...prev,
                partners: updatedPartners
            };
        });
    };
    
    
    return (
        <div className='w-full px-12 pt-5 text-left'>
            {pageLoader &&
            <div className='w-screen h-screen fixed top-0 left-0 flex items-center justify-center backdrop-blur-sm z-[9999]'>
                <ThreeCircles color='#ea580c' />
            </div>}

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
                        className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-[45%] px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none'
                        value={newFranchiseData.first_name}
                        onChange={e => handleInputChange(e.target.value, "first_name")}
                    />
                    <input
                        type='text'
                        placeholder='Last Name'
                        className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-[45%] px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none'
                        value={newFranchiseData.last_name}
                        onChange={e => handleInputChange(e.target.value, "last_name")}
                    />
                    <input
                        type='email'
                        placeholder='Email ID'
                        className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-[55%] px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none email-input'
                        value={newFranchiseData.email}
                        onChange={e => handleInputChange(e.target.value, "email")}
                    />
                    <input
                        type='tel'
                        placeholder='Contact Number'
                        className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-[35%] px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none'
                        value={newFranchiseData.phone_number}
                        onChange={e => {
                            const value = e.target.value;
                            // Only update if value is less than or equal to 10 digits
                            if (value.length <= 10) {
                                handleInputChange(value, "phone_number");
                            }
                        }}
                        maxLength={10} // Note: maxLength does not work with type='number'
                    />
                    <input
                        type='text'
                        placeholder='Password'
                        className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-[30%] px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none'
                        value={newFranchiseData.password}
                        onChange={e => handleInputChange(e.target.value, "password")}
                    />
                    {/* Select dropdown for Area */}
                    <select
                        value={newFranchiseData.state || ""}
                        onChange={e => handleStateChange(e)}
                        className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-[30%] px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none'
                    >
                        <option value="">Select State</option>
                        {stateList?.map(state => (
                            <option 
                                key={state.id} 
                                value={state.id}  // Ensure value is the state ID
                            >
                                {state.state}
                            </option>
                        ))}
                    </select>
                    <select
                        value={newFranchiseData.city || ""}
                        onChange={e => handleCityChange(e)}
                        disabled={!selectedState}
                        className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-[30%] px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none'
                    >
                        <option value="">Select City</option>
                        {citiesList.map(city => (
                            <option key={city.city} value={city.city}>
                                {city.city}
                            </option>
                        ))}
                    </select>


                    <select
                        value={newFranchiseData.area}
                        onChange={handleAreaChange}
                        disabled={selectedCity? false : true}
                        className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-[30%] px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none'
                    >
                        <option value="">Select Area</option>
                        {areaList.map(area => (
                            <option key={area.area} value={area.area}>{area.area}</option>
                        ))}
                    </select>
                    <div className='w-[45%] h-12 flex items-center justify-start gap-4'>
                        <p className='text-[#888888] h-full w-1/2 rounded-full bg-[#FFE3D7] flex items-center justify-start px-6'>
                            {newFranchiseData.noOfPartners ? newFranchiseData.noOfPartners : "Number of Partners"}
                        </p>
                        <button
                            onClick={() => handleCount(false)}
                            className={`h-full aspect-square rounded-xl flex items-center text-white justify-center text-2xl
                            ${newFranchiseData.noOfPartners>1? "bg-[#F76C2E] bg-opacity-90" : "bg-[#FFE3D7]"}
                            `}
                        >
                            -
                        </button>
                        <button
                            onClick={() => handleCount(true)}
                            className={`h-full aspect-square rounded-xl flex items-center text-white justify-center text-2xl
                            ${newFranchiseData.noOfPartners<5? "bg-[#F76C2E] bg-opacity-90" : "bg-[#FFE3D7]"}
                            `}
                        >
                            +
                        </button>
                        <button
                            onClick={HandleAddPartners}
                            className='h-full w-40 rounded-xl text-white bg-[#F76C2E] bg-opacity-90 flex items-center justify-center t'
                        >
                            Add Details
                        </button>
                    </div>
                    {/* <select
                        value={newFranchiseData.city}
                        onChange={handleAreaChange}
                        disabled={selectedCity? false : true}
                        className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-[45%] px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none'
                    >
                        <option value="">Select City</option>
                        {majorCities.filter(item => item.name === selectedCity)[0]?.area.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select> */}
                </div>

                {/* Dynamically render input fields for each partner */}
                {newFranchiseData.partners.length > 0 &&
                    <div className='w-full flex flex-row items-start justify-start flex-wrap gap-x-6 gap-y-4 pt-14'>
                        <div className='mb-2 w-full flex flex-col items-start justify-start gap-2'>
                            <p 
                                className={`${(totalPercentage(newFranchiseData.partners) === 15)? "bg-green-600" : "bg-red-600"} text-nowrap bg-opacity-80 min-w-56 w-fit font-medium text-white h-10 flex items-center justify-center rounded-full px-6`}
                            >
                                Total Percentage:
                                <span className='pl-1'>
                                    {!isNaN(totalPercentage(newFranchiseData.partners)) ? totalPercentage(newFranchiseData.partners) : 0}%
                                </span>
                            </p>
                            <p className='text-slate-500 text-opacity-50 text-sm pl-3'>
                                note: Total Percentage should be 15%
                            </p>
                        </div>

                        <div className='w-full flex flex-row items-start justify-start flex-wrap gap-x-10 gap-y-8'>
                            {newFranchiseData.partners.map((partner, index) => (
                            <div className='w-[45%] h-fit relative'>
                                <p className='text-[#ff5c00] pl-4'>
                                    Partner {index + 1} Name
                                </p>
                                
                                <div className='w-full flex items-center justify-between'>
                                    <input
                                        key={index}
                                        type='text'
                                        placeholder='Name'
                                        className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-1/2 px-6 placeholder:font-medium focus:outline-none'
                                        value={partner.name}
                                        onChange={e => handlePartnerNameChange(e.target.value, index)}
                                    />
                                    
                                    <div className='text-sm w-1/2 font-semibold pl-4 relative text-[#FF6B17] flex items-center justify-center'>
                                    <p className='pr-3'>Share:</p>
                                        <input
                                            type='number'
                                            className=' focus:outline-none text-sm w-full font-semibold text-[#FF6B17] border-2 border-[#FF5C00] rounded-full h-12 px-5'
                                            value={partner.percentage}
                                            onChange={(e) => handleShareChange(e, index)}
                                        />
                                        <span className='absolute top-1/2 -translate-y-1/2 right-3'>
                                            %
                                        </span>
                                    </div>
                                </div>
                            </div>))}
                        </div>
                    </div>
                }
            </div>

            <button
                onClick={handleSubmit}
                disabled={(validation() !== true)? true : false}
                className='mt-16 px-10 bg-[#36CC29] disabled:bg-gray-500 h-10 flex items-center justify-center rounded-full text-white font-medium'
            >
                Submit
            </button>

            {newFranchiseData?.area &&
            <div className='mt-10 w-full'>
                <DriverList driverList={driverList} area={newFranchiseData.area}/>
            </div>}
        </div>
    );
};

export default FranchiseAddition;


// absolute -translate-y-1/2 top-1/2 right-4