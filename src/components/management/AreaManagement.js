import majorCities from 'globalComponents/data/majorCities'
import React, { useEffect, useState } from 'react'
import AddNewArea from './components/AddNewArea'
import axiosInstance from 'utils/AxiosInstance'
import { ThreeDots } from 'react-loader-spinner'
import { useUserContext } from 'globalComponents/AppContext'

const AddNewCity = ({ stateList, setAddNewCity }) => {
  const { setAlert } = useUserContext()
  const [ selectedState, setSelectedState ] = useState("")
  const [ cityName, setCityName ] = useState()
  const [ loader, setLoader ] = useState(false)

  function capitalizeWords(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  }      

  const handleStateChange = (state) => {
    setSelectedState(state)


  }

  const handleSubmit = () => {
    if (selectedState && selectedState !== "") {
      const stateId = stateList.find(item => item.state === selectedState)

      axiosInstance
        .post("all/cities/", { city: capitalizeWords(cityName), state_id: stateId.id })
        .then(res => {
            console.log(res)
            setAlert("City Added")
            setCityName("")
        })
        .catch(err => {
            console.error(err)
            setAlert("error")
        })
        .finally(() => {
            setLoader(false)
        })
    }
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center fixed top-0 left-0 backdrop-blur-sm z-[999]'>
      <div className='w-fit p-6 bg-orange-500 relative bg-opacity-20 z-[9999] px- rounded-xl shadow-3xl border-2 border-orange-600 flex flex-col items-center justify-center gap-5 '>
        <button
          onClick={() => setAddNewCity(false)}
          className='absolute z-10 top-2 right-2 text-sm text-white font-bold underline'
        >
          close
        </button>
        <p className='supermercado text-2xl'>
          Add New City
        </p>
        {console.log(selectedState)}
        <select
          value={selectedState.state}
          onChange={e => handleStateChange(e.target.value)}
          className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-80 px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none'
        >
          <option value="">Select State</option>
          {stateList?.map(state => (
              <option 
                  // onClick={() => setSelectedState(state)}
                  key={state.id} 
                  value={state.name}
              >
                  {state.state}
              </option>
          ))}
        </select>
        

        <input
          type='text'
          className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-80 px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none'
          value={cityName}
          onChange={e => setCityName(e.target.value)}
          placeholder='Enter City Name'
        />

        <button
            onClick={handleSubmit}
            className='px-8 py-2 text-xm text-white bg-green-600 rounded-full font-semibold'
        >
            {!loader? "Submit" : <ThreeDots color='#ffffff' height={20} />}
        </button>
      </div>
    </div>
  )
}

const AddNewCityArea = ({ stateList, cityList, setAddNewCityArea }) => {
  const { setAlert } = useUserContext()
  const [ selectedState, setSelectedState ] = useState("")
  const [ stateId, setStateId ] = useState()
  const [ selectedCity, setSelectedCity ] = useState("")
  const [ areaName, setAreaName ] = useState()
  const [ loader, setLoader ] = useState(false)

  function capitalizeWords(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  }      

  const handleStateChange = (state) => {
    setSelectedState(state)

    const stateId = stateList.find(item => item.state === state)

    setStateId(stateId.id)
  }

  const handleSubmit = () => {
    if (selectedState && selectedState !== "") {

      const cityId = cityList.find(item => item.city === selectedCity)

      axiosInstance
        .post("all/areas/", { area: capitalizeWords(areaName), city_id: cityId.id })
        .then(res => {
            console.log(res)
            setAlert("City Added")
            setAreaName("")
        })
        .catch(err => {
            console.error(err)
            setAlert("error")
        })
        .finally(() => {
            setLoader(false)
        })
    }
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center fixed top-0 left-0 backdrop-blur-sm z-[999]'>
      <div className='w-fit p-6 bg-orange-500 relative bg-opacity-20 z-[9999] px- rounded-xl shadow-3xl border-2 border-orange-600 flex flex-col items-center justify-center gap-5 '>
        <button
          onClick={() => setAddNewCityArea(false)}
          className='absolute z-10 top-2 right-2 text-sm text-white font-bold underline'
        >
          close
        </button>
        <p className='supermercado text-2xl'>
          Add New Area
        </p>
        {console.log(selectedState)}
        <select
          value={selectedState}
          onChange={e => handleStateChange(e.target.value)}
          className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-80 px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none'
        >
          <option value="">Select State</option>
          {stateList?.map(state => (
              <option 
                  // onClick={() => setSelectedState(state)}
                  key={state.id} 
                  value={state.state}
              >
                  {state.state}
              </option>
          ))}
        </select>

        <select
          value={selectedCity}
          onChange={e => setSelectedCity(e.target.value)}
          className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-80 px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none'
        >
          <option value="">Select State</option>
          {cityList?.filter(item => item.state_id === stateId).map(city => (
              <option 
                  // onClick={() => setSelectedState(city)}
                  key={city.id} 
                  value={city.city}
              >
                  {city.city}
              </option>
          ))}
        </select>
        
        <input
          type='text'
          className='text-[#FF5C00] border-2 border-[#FF5C00] rounded-full h-12 w-80 px-6 placeholder:text-[#ff5c00] placeholder:font-medium focus:outline-none'
          value={areaName}
          onChange={e => setAreaName(e.target.value)}
          placeholder='Enter Area Name'
        />

        <button
            onClick={handleSubmit}
            className='px-8 py-2 text-xm text-white bg-green-600 rounded-full font-semibold'
        >
            {!loader? "Submit" : <ThreeDots color='#ffffff' height={20} />}
        </button>
      </div>
    </div>
  )
}

const AreaManagement = () => {
  const [ stateList, setStateList ] = useState([])
  const [ expanded, setExpanded ] = useState(false)
  const [ addNewArea, setAddNewArea ] = useState(false)
  const [ citiesList, setCitiesList ] = useState([])
  const [ areasList, setAreasList ] = useState([])
  const [ addNewCity, setAddNewCity ] = useState(false)
  const [ addNewCityArea, setAddNewCityArea ] = useState(false)

  useEffect(() => {
    axiosInstance
      .get("all/states/")
      .then(res => {
        setStateList(res.data)
        console.log(res.data)
      })
      .catch((err) => console.error(err))
  },[])

  useEffect(() => {
    axiosInstance
      .get("all/cities/")
      .then(res => {
        setCitiesList(res.data)
        console.log(res.data)
      })
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    axiosInstance
      .get("all/areas/")
      .then(res => {
        setAreasList(res.data)
        console.log(res.data)
      })
      .catch((err) => console.error(err))
  }, [])

  const fetchAreas = (city) => {
    axiosInstance
      .get(`all/api/cities/${city}/areas`)
      .then(res => console.log(res))
      .catch(err => console.error(err))
  }

  // const handleExpand = () => {
  //   if (expanded === true) {
  //     setStateList(majorCities.slice(0,3))
  //     setExpanded(false)
  //   } else {
  //     setStateList(majorCities)
  //     setExpanded(true)
  //   }
  // }

  return (
    <div className='w-full pt-5'>

      {addNewArea &&
      <div className='w-screen h-screen z-[999] backdrop-blur-sm fixed top-0 left-0 flex items-center justify-center p-8 '>
        <AddNewArea 
          setAddNewArea={setAddNewArea}
        />
      </div>}

      {addNewCity &&
      <AddNewCity
        stateList={stateList}
        setAddNewCity={setAddNewCity}
      />}

      {addNewCityArea &&
      <AddNewCityArea
        stateList={stateList}
        cityList={citiesList}
        setAddNewCityArea={setAddNewCityArea}
      />}

      <div className='w-full flex items-center justify-between h-10'>
        <p className='text-xl font-medium text-[#1F384C]'>
          Area Management
        </p>
        <div className='flex h-full items-center justify-center gap-4'>
          <button 
            onClick={() => setAddNewArea(true)}
            className='px-10 rounded-full h-full flex items-center justify-center text-[#FF5C00] text-sm bg-[#FFE3CF] border-2 border-[#FFE3CF] hover:bg-transparent'>
            Add New Location +
          </button>
          <button 
            onClick={() => setAddNewCity(true)}
            className='px-10 rounded-full h-full flex items-center justify-center text-[#FF5C00] text-sm bg-[#FFE3CF] border-2 border-[#FFE3CF] hover:bg-transparent'>
            Add New City +
          </button>
          <button 
            onClick={() => setAddNewCityArea(true)}
            className='px-10 rounded-full h-full flex items-center justify-center text-[#FF5C00] text-sm bg-[#FFE3CF] border-2 border-[#FFE3CF] hover:bg-transparent'>
            Add New Area +
          </button>
        </div>
      </div>

      <div className='w-full mt-10'>
        <table className="table-auto w-full relative">
          <thead>
            <tr className="bg-transparent border-[0.5px] border-[#FF7527] h-14 mb-14">
              <th className="text-left text-[#1F384C] text-sm px-4 pl-10 py-4">State</th>
              <th className="text-left pl-14 text-[#1F384C] text-sm px-4 py-4">Cities</th>
              {/* <th className="text-left pl-14 text-[#1F384C] text-sm px-4 py-4">Areas</th> */}
              {/* <th className="text-center text-[#1F384C] text-sm px-4 py-4">Number of Franchises</th>
              <th className="text-center text-[#1F384C] text-sm px-4 pr-10 py-4">Number of Drivers</th>
              <th className="text-center text-[#1F384C] text-sm px-4 py-4">Number of Users</th> */}
            </tr>
            <div className="h-12"></div>
          </thead>

          <div className="bg-[#FFB27C] border-[1.5px] border-[#FFB27c] w-full p-4 py-2 absolute top-14 left-0">
            <p className="text-orange-800 font-medium">Showing Drivers</p>
          </div>

          <tbody className="mt-14">
            {stateList?.map((area, id) => (
              <tr key={id} className="text-sm border-b-[1px] border-[#C7CBD9]">


                <td className="flex items-center text-left px-4 py-4">
                  {area?.state}
                </td>


                <td className="px-4 py-4 text-left pl-14 text-orange-600 text-wrap">
                  {citiesList.map((item, index) => (
                    <span 
                      key={index}
                      onClick={() => fetchAreas(item.city)} 
                      className={`${item.state_id === id? "" : "hidden"} block`} 
                    >
                      {item.city}
                    </span>
                  ))}
                </td>

                {/* <td className="px-4 py-4 text-left pl-14 text-orange-600 text-wrap">
                  {areasList.map((item, index) => (
                    <span className={`${item.state_id === id? "" : "hidden"}`} key={index}>{item.area}{index < citiesList.length - 1 ? ', ' : ''}</span>
                  ))}
                </td> */}
{/* 
                <td className="px-4 py-4 text-center">
                  --
                </td>

                <td className="px-4 py-4 text-center">
                  --
                </td>

                <td className="px-2 pr-4 py-4 text-orange-600 text-center">
                 --
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <div className='w-full flex items-center justify-center'>
          {/* {majorCities.length > 3 && 
          <button onClick={handleExpand} className='px-12 mt-4 rounded-full flex items-center justify-center py-1 text-orange-700 bg-[#FFB27C]'>
              View {expanded? "less" : "all" }
          </button>} */}
        </div>
      </div>
    </div>
  )
}

export default AreaManagement