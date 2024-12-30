import DriverAddition from 'components/DriverAddition/DriverAddition'
import DriverAdditionTable from 'components/DriverAddition/DriverAdditionTable'
import { useUserContext } from 'globalComponents/AppContext'
import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { ThreeCircles } from 'react-loader-spinner'
import axiosInstance from 'utils/AxiosInstance'

const DriverAdditionPage = () => {
    const { citiesList } = useUserContext();
    const [ showDriverAddition, setShowDriverAddition ] = useState(false)
    const [ driverList, setDriverList ] = useState([])
    const [ loader, setLoader ] = useState(false)
    const [ filterArea, setFilterArea] = useState("");
    const [ inputCity, setInputCity] = useState("");
    const [ isDropdownVisible, setDropdownVisible] = useState(false);

    // Filter cities based on the input value
    const filteredCities =
        citiesList &&
        citiesList.length > 0 &&
        citiesList.filter((city) =>
        city.city.toLowerCase().includes(inputCity.toLowerCase())
        );

    const handleCitySelect = (cityName) => {
        setInputCity(""); // Set the value of the input to the selected city
        setFilterArea(cityName); // Set the selected city as the filter area
        setDropdownVisible(false); // Close the dropdown after selection
    };

    const handleClose = () => {
        setInputCity("");
        setDropdownVisible(false);
    };

    const handleFetch = () => {
        setLoader(true)

        axiosInstance
        .get("all/driversignupstatus/")
        .then(res => {
            console.log(res)
            setDriverList(res.data)
        })
        .catch(err => {
            console.error(err)
        })
        .finally(() => {
            setLoader(false)
        })
    }

    useEffect(() => {
        handleFetch()
    }, [])

  return (
    <div className='w-full min-h-full text-left px-14 py-10'>
        {showDriverAddition && <DriverAddition setShowDriverAddition={setShowDriverAddition} />}

        {loader && 
        <div className='w-screen h-screen fixed top-0 left-0 z-50 flex items-center justify-center backdrop-blur-sm'>
            <ThreeCircles color='#ea580c' />
        </div>}

        {!showDriverAddition &&
        <div className='w-full h-full'>
            <div className='w-full'>
                <p className='mb-14 text-[#1f384c] text-xl tracking-[0.5px] font-medium'>
                    Driver Addition
                </p>
                <div className='w-full pt-6 flex items-center justify-between'>
                    <div className="h-10 flex items-center gap-4">
                    {/* Select Dropdown */}
                    <div className="relative">
                        {/* Searchable Input */}
                        <input
                        type="text"
                        placeholder="Filter City"
                        className="w-60 rounded-full text-left px-4 focus:outline-none h-10 flex items-center justify-center placeholder:text-[#FF5C00] text-[#FF5C00] text-sm bg-[#FFE3CF]"
                        value={inputCity}
                        onChange={(e) => {
                            setInputCity(e.target.value);
                            setDropdownVisible(true); // Show dropdown as user types
                        }}
                        onFocus={() => setDropdownVisible(true)} // Show dropdown when input is focused
                        />
                        {isDropdownVisible && (
                        <button
                            className="absolute focus:outline-none right-3 z-50 top-[10px] text-[#FF5C00] text-[20px] leading-none"
                            onClick={handleClose}
                        >
                            <IoClose />
                        </button>
                        )}

                        {/* Dropdown with filtered options */}
                        {isDropdownVisible && (
                        <ul
                            onBlur={() => setDropdownVisible(false)}
                            className="absolute z-10 w-60 bg-white border border-gray-300 rounded-lg mt-1 max-h-80 overflow-y-auto shadow-lg"
                        >
                            {inputCity === "" &&
                            citiesList.map((city) => (
                                <li
                                key={city.city}
                                className="px-4 py-2 text-sm text-[#FF5C00] cursor-pointer border-b last:border-b-0 border-[#FFE3CF] border-opacity-40 hover:bg-[#FFE3CF]"
                                onClick={() => handleCitySelect(city.city)}
                                >
                                {city.city}
                                </li>
                            ))}
                            {inputCity !== "" &&
                            filteredCities.length > 0 &&
                            filteredCities.map((city) => (
                                <li
                                key={city.city}
                                className="px-4 py-2 text-sm text-[#FF5C00] cursor-pointer border-b last:border-b-0 border-[#FFE3CF] border-opacity-40 hover:bg-[#FFE3CF]"
                                onClick={() => handleCitySelect(city.city)}
                                >
                                {city.city}
                                </li>
                            ))}
                        </ul>
                        )}
                    </div>

                    {filterArea && (
                        <p className="w-32 relative rounded-full h-full flex items-center justify-center text-[#FF5C00] text-sm bg-transparent border-2 border-[#FFE3CF]">
                        {filterArea}

                        <span
                            onClick={() => setFilterArea("")}
                            className="absolute -top-1 text-white p-1 -right-1 bg-[#ffb885] rounded-full flex items-center justify-center"
                        >
                            <IoClose />
                        </span>
                        </p>
                    )}
                    </div>
                    <button
                        onClick={() => setShowDriverAddition(true)}
                        className='px-16 rounded-full h-10 border-2 border-[#FFE3CF] hover:border-orange-600 hover:border-opacity-50 flex items-center justify-center text-[#FF5C00] text-sm bg-[#FFE3CF]'
                    >
                        Add New Driver +
                    </button>
                </div>
            </div>

            <div className='mt-10'>
                {!loader &&
                <DriverAdditionTable
                    driverList={driverList}
                    area={filterArea}
                    handleFetch={handleFetch}
                    setLoader={setLoader}
                />}
            </div>
        </div>}
    </div>
  )
}

export default DriverAdditionPage