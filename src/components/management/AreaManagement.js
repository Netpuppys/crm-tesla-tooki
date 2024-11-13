import React, { useEffect, useState } from 'react'
import AddNewArea from './components/AddNewArea'
import axiosInstance from 'utils/AxiosInstance'
import { ThreeDots } from 'react-loader-spinner'
import { useUserContext } from 'globalComponents/AppContext'
import { MdDelete } from 'react-icons/md'

const AddNewCity = ({ stateList, setAddNewCity, fetchStateAndCity }) => {
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
            fetchStateAndCity()
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

const AddNewCityArea = ({ stateList, cityList, setAddNewCityArea, fetchStateAndCity }) => {
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
            fetchStateAndCity()
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

const AreaUnderCity = ({ selectedCity, setSelectedCity }) => {
  const { setAlert } = useUserContext()

  const [ areaList, setAreaList ] = useState([])
  const [ loader, setLoader ] = useState(false)

  useEffect(() => {
    if (selectedCity && selectedCity !== "") {
      setLoader(true)

      axiosInstance
      .get(`all/api/cities/${selectedCity.city}/areas`)
      .then(res => {
        setAreaList(res.data)
        console.log(res)
      })
      .catch(err => console.error(err))
      .finally(() => setLoader(false))
    }
  }, [selectedCity])

  const handleDelete = () => {
    if (selectedCity.id) {
      axiosInstance
      .delete(`all/cities/${selectedCity.id}`)
      .then(res => {
        console.log(res)
        setAlert("Deleted Successfully")
        setSelectedCity("")
      })
      .catch(err => console.error(err))
    }
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center fixed top-0 left-0 backdrop-blur-sm z-[999]'>
      <div className='w-fit min-w-80 p-6 bg-orange-500 relative bg-opacity-20 z-[9999] px- rounded-xl shadow-3xl border-2 border-orange-600 flex flex-col items-center justify-center gap-5 '>
        <button
          onClick={() => setSelectedCity("")}
          className='absolute z-10 top-2 right-2 text-sm text-[#ea580c] font-bold underline'
        >
          close
        </button>

        <button className='text-lg absolute text-[#ea580c] top-2 left-2 opacity-70 hover:opacity-100' onClick={handleDelete}><MdDelete /></button>

        <p className='text-2xl supermercado font-bold text-[#ea580c]'>
          {selectedCity.city}{" "}
        </p>

        {loader? 
        <ThreeDots color='#f97316' /> :
        <ul className='w-full'>
          {(areaList && areaList.length>0)? 
          areaList.map((item, index) => (
            <li key={index} className='capitalize text-lg mb-2'>{item.area}</li>
          )) :
          <p className='text-xl text-center font-semibold text-black text-opacity-70'>
            No Area's Found
          </p>
          }
        </ul>}
      </div>
    </div>
  )
}

const AreaManagement = () => {
  const { stateList, citiesList, fetchStateAndCity, setAlert } = useUserContext()

  const [ addNewArea, setAddNewArea ] = useState(false)
  const [ addNewCity, setAddNewCity ] = useState(false)
  const [ addNewCityArea, setAddNewCityArea ] = useState(false)
  const [ selectedCity, setSelectedCity ] = useState("")

  const handleDelete = (id) => {
    if (id) {
      axiosInstance
      .delete(`all/states/${id}`)
      .then(res => {
        console.log(res)
        setAlert("Deleted Successfully")
        fetchStateAndCity()
      })
      .catch(err => console.error(err))
    }
  }

  return (
    <div className='w-full pt-5'>

      {addNewArea &&
      <div className='w-screen h-screen z-[999] backdrop-blur-sm fixed top-0 left-0 flex items-center justify-center p-8 '>
        <AddNewArea 
          setAddNewArea={setAddNewArea}
          fetchStateAndCity={fetchStateAndCity}
        />
      </div>}

      {addNewCity &&
      <AddNewCity
        stateList={stateList}
        setAddNewCity={setAddNewCity}
        fetchStateAndCity={fetchStateAndCity}
      />}

      {addNewCityArea &&
      <AddNewCityArea
        stateList={stateList}
        cityList={citiesList}
        setAddNewCityArea={setAddNewCityArea}
        fetchStateAndCity={fetchStateAndCity}
      />}

      {selectedCity && selectedCity !== "" &&
      <AreaUnderCity
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />}

      <div className='w-full flex items-center justify-between h-10'>
        <p className='text-xl font-medium text-[#1F384C]'>
          Area Management
        </p>
        <div className='flex h-full items-center justify-center gap-4'>
          <button 
            onClick={() => setAddNewArea(true)}
            className='px-10 rounded-full h-full flex items-center justify-center text-[#FF5C00] text-sm bg-[#FFE3CF] border-2 border-[#FFE3CF] hover:bg-transparent'>
            Add New State +
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
              <th className="text-right pl-14 text-[#1F384C] text-sm px-4 py-4">Options</th>
              {/* <th className="text-left pl-14 text-[#1F384C] text-sm px-4 py-4">Areas</th> */}
              {/* <th className="text-center text-[#1F384C] text-sm px-4 py-4">Number of Franchises</th>
              <th className="text-center text-[#1F384C] text-sm px-4 pr-10 py-4">Number of Drivers</th>
              <th className="text-center text-[#1F384C] text-sm px-4 py-4">Number of Users</th> */}
            </tr>
            <div className="h-12"></div>
          </thead>

          <div className="bg-[#FFB27C] border-[1.5px] border-[#FFB27c] w-full p-4 py-2 absolute top-14 left-0">
            <p className='text-sm text-orange-800'>
              <span className='font-semibold'>
                Note:
              </span>{" "}Click on a city name to explore areas within it.
            </p>
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
                      onClick={() => setSelectedCity({city: item.city, id: item.id})}
                      className={`${item.state_id === area.id? "" : "hidden"} block capitalize cursor-pointer` } 
                    >
                      {item.city}
                    </span>
                  ))}
                </td>

                <td className="flex items-center justify-end text-left px-4 py-4">
                  <button className='opacity-50 text-lg hover:opacity-100' onClick={() => handleDelete(area.id)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='w-full flex items-center justify-center'>
        </div>
      </div>
    </div>
  )
}

export default AreaManagement