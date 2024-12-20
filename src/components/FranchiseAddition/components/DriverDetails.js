import { useUserContext } from 'globalComponents/AppContext';
import React, { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import axiosInstance from 'utils/AxiosInstance';

const DriverDetails = ({
    handleClose,
    driverDetails,
    setDriverDetails
}) => {
    const { setAlert, vehicleTypes, citiesList } = useUserContext()

    const [ editable, setEditable ] = useState(false)
    const [ areaList, setAreaList ] = useState([])
    const [ changedDetails, setChangedDetails ] = useState(driverDetails)
    const [ loader, setLoader ] = useState(false)
    const [ selectedCity, setSelectedCity ] = useState()

    function findChanges(obj1, obj2) {
        const result = {};
      
        for (const key in obj2) {
            if (obj2[key] !== obj1[key]) {
                result[key] = obj2[key]; // Include only changed values from obj2
            }
        }
      
        return result;
    }

    useEffect(() => {
        if(changedDetails) {
            setSelectedCity(changedDetails.area)
        }
    }, [changedDetails])
    
    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Update nested objects
        if (name.includes('driver_additional_details')) {
            const namesArray = name.split('.');
            const key = namesArray[namesArray.length-1]
            console.log(key, value)
            setChangedDetails(prev => ({
                ...prev,
                driver_additional_details: {
                    ...prev.driver_additional_details,
                    [key]: value
                }
            }));
        } else {
        setChangedDetails({
            ...changedDetails,
            [name]: value
        });
        }
    };

    const handleSubmit = () => {
        setLoader(true)
        const data = findChanges(driverDetails, changedDetails)

        axiosInstance
        .patch(`/all/driver/${driverDetails.id}/`, data)
        .then(res => {
            console.log(res)
            setDriverDetails(changedDetails)
            setAlert("Changed Successfully")
        })
        .catch(err => {
            console.error(err)
        })
        .finally(() => {
            setLoader(false)
            setEditable(false)
        })
    }

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value)
        setChangedDetails(prev => ({
            ...prev,
            area: event.target.value,
        }));
    };

    const handleVehicleTypeChange = (event) => {
        setChangedDetails(prev => ({
            ...prev,
            driver_additional_details: {
                ...prev.driver_additional_details,
                vehicle_type: event.target.value,
            },
        }));
    };

    const handleAreaChange = (event) => {
        setChangedDetails(prev => ({
            ...prev,
            city: event.target.value,
        }));
    };

    useEffect(() => {
        if (!editable) {
            setChangedDetails(driverDetails)
        }
    }, [editable, driverDetails])

    useEffect(() => {
        if (changedDetails.city && changedDetails.city !== "") {
          setLoader(true)
    
          axiosInstance
          .get(`all/api/cities/${changedDetails.city}/areas`)
          .then(res => {
            setAreaList(res.data)
            console.log(res)
          })
          .catch(err => console.error(err))
          .finally(() => setLoader(false))
        }
    }, [changedDetails])

  return (
    <div className='p-5 relative w-[50vw] h-fit pb-10 rounded-2xl backdrop-blur-md bg-orange-500 bg-opacity-15 border-2 border-orange-600 border-opacity-50 shadow-2xl'>
        {/* close button */}
        <div className='flex items-center mb-5 px-5 h-12 justify-between w-full'>
            <button
                onClick={() => setEditable(prev => !prev)}
                style={editable ? { border: "1px solid", background: "#ffffff" } : {}}
                className='text-orange-600 px-6 py-1 border-orange-600 rounded-full bg-white bg-opacity-50'
            >
                Edit
            </button>
            <button
                onClick={handleClose}
                disabled={loader}
                className='text-orange-600 underline'
            >
                close
            </button>
        </div>
        {console.log(changedDetails)}

        <div className='w-full flex flex-row flex-wrap items-start justify-start gap-y-6'>
            <div className='w-1/2 flex flex-col px-2'>
                <label className='text-sm text-orange-600 font-medium mb-1'>First Name: </label>
                <input
                    type="text"
                    disabled={!editable}
                    className='w-full h-10 rounded-full border-2 border-orange-600 border-opacity-50 disabled:bg-opacity-50 disabled:text-opacity-70 px-4'
                    name="first_name" 
                    value={changedDetails.first_name} 
                    onChange={handleChange} 
                />
            </div>
            <div className='w-1/2 flex flex-col px-2'>
                <label className='text-sm text-orange-600 font-medium mb-1'>Last Name: </label>
                <input
                    type="text"
                    disabled={!editable}
                    className='w-full h-10 rounded-full border-2 border-orange-600 border-opacity-50 disabled:bg-opacity-50 disabled:text-opacity-70 px-4' 
                    name="last_name" 
                    value={changedDetails.last_name} 
                    onChange={handleChange} 
                />
            </div>
            <div className='w-1/2 flex flex-col px-2'>
                <label className='text-sm text-orange-600 font-medium mb-1'>Email: </label>
                <input
                    type="email"
                    disabled={!editable}
                    className='w-full h-10 rounded-full border-2 border-orange-600 border-opacity-50 disabled:bg-opacity-50 disabled:text-opacity-70 px-4'
                    name="email" 
                    value={changedDetails.email} 
                    onChange={handleChange} 
                />
            </div>
            <div className='w-1/2 flex flex-col px-2'>
                <label className='text-sm text-orange-600 font-medium mb-1'>Phone Number: </label>
                <input
                    type="tel"
                    disabled={!editable}
                    className='w-full h-10 rounded-full border-2 border-orange-600 border-opacity-50 disabled:bg-opacity-50 disabled:text-opacity-70 px-4' 
                    name="phone_number" 
                    value={changedDetails.phone_number} 
                    onChange={handleChange} 
                />
            </div>
            <div className='w-1/2 flex flex-col px-2'>
                <label className='text-sm text-orange-600 font-medium mb-1'>City: </label>
                <select
                    value={changedDetails.city}
                    onChange={handleAreaChange}
                    disabled={selectedCity && editable? false : true}
                    className='w-full h-10 rounded-full border-2 focus:outline-none border-orange-600 border-opacity-50 disabled:bg-opacity-50 disabled:text-opacity-70 px-4'
                >
                    <option value="">Select City</option>
                    {citiesList.map(city => (
                        <option key={city.id} value={city.city}>{city.city}</option>
                    ))}
                </select>
            </div>
            <div className='w-1/2 flex flex-col px-2'>
                <label className='text-sm text-orange-600 font-medium mb-1'>Area: </label>
                <select
                    value={changedDetails.area}
                    onChange={handleCityChange}
                    disabled={!editable || loader}
                    className='w-full h-10 rounded-full border-2 focus:outline-none border-orange-600 border-opacity-50 disabled:bg-opacity-50 disabled:text-opacity-70 px-4'
                >
                    <option value="">Select Area</option>
                    {areaList.map(city => (
                            <option key={city.id} value={city.area}>{city.area}</option>
                    ))}
                </select>
            </div>
            <div className='w-1/2 flex flex-col px-2'>
                <label className='text-sm text-orange-600 font-medium mb-1'>License No: </label>
                <input
                    type="text"
                    disabled={!editable}
                    className='w-full h-10 rounded-full border-2 border-orange-600 border-opacity-50 disabled:bg-opacity-50 disabled:text-opacity-70 px-4' 
                    name="changedDetails.driver_additional_details.license_no" 
                    value={changedDetails?.driver_additional_details?.license_no}
                    onChange={handleChange} 
                />
            </div>
            <div className='w-1/2 flex flex-col px-2'>
                <label className='text-sm text-orange-600 font-medium mb-1'>Aadhaar No: </label>
                <input
                    type="text"
                    disabled={!editable}
                    className='w-full h-10 rounded-full border-2 border-orange-600 border-opacity-50 disabled:bg-opacity-50 disabled:text-opacity-70 px-4' 
                    name="changedDetails.driver_additional_details.aadhaar_no"
                    value={changedDetails?.driver_additional_details?.aadhaar_no}
                    onChange={handleChange} 
                />
            </div>
            <div className='w-1/2 flex flex-col px-2'>
                <label className='text-sm text-orange-600 font-medium mb-1'>Vehicle: </label>
                <input
                    type="text"
                    disabled={!editable}
                    className='w-full h-10 rounded-full border-2 border-orange-600 border-opacity-50 disabled:bg-opacity-50 disabled:text-opacity-70 px-4' 
                    name="changedDetails.driver_additional_details.vehicle" 
                    value={changedDetails?.driver_additional_details?.vehicle || ''} 
                    onChange={handleChange}
                />
            </div>
            <div className='w-1/2 flex flex-col px-2'>
                <label className='text-sm text-orange-600 font-medium mb-1'>Vehicle Type: </label>
                {/* <input
                    type="text"
                    disabled={!editable}
                    className='w-full h-10 rounded-full border-2 border-orange-600 border-opacity-50 disabled:bg-opacity-50 disabled:text-opacity-70 px-4' 
                    name="changedDetails.driver_additional_details.vehicle_type" 
                    value={changedDetails?.driver_additional_details?.vehicle_type || ''} 
                    onChange={handleChange} 
                /> */}
                <select
                    value={changedDetails?.driver_additional_details?.vehicle_type || ''}
                    onChange={handleVehicleTypeChange}
                    disabled={!editable || loader}
                    className='w-full h-10 rounded-full border-2 focus:outline-none border-orange-600 border-opacity-50 disabled:bg-opacity-50 disabled:text-opacity-70 px-4'
                >
                    <option value="">Select Vehicle Type</option>
                    {vehicleTypes.map((vehicle, id) => (
                            <option key={id} value={vehicle}>{vehicle}</option>
                    ))}
                </select>
            </div>
        </div>
        <div className='w-full flex items-center justify-center'>
            <button
                disabled={!editable}
                onClick={handleSubmit}
                className='bg-green-600 disabled:opacity-60 w-28 h-10 flex items-center justify-center text-white font-medium rounded-full mt-5'
            >
                {!loader? "Submit" : <ThreeDots color='#ffffff' />}
            </button>
        </div>
    </div>
  )
}

export default DriverDetails