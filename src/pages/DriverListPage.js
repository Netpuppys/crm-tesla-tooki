import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DriverList from 'components/FranchiseAddition/DriverTable'
import { useUserContext } from 'globalComponents/AppContext'
import { IoClose } from 'react-icons/io5'
import majorCities from 'globalComponents/data/majorCities'

const DriverListPage = () => {
  const { driverList } = useUserContext()

  const [ filterArea, setFilterArea ] = useState("")
  
  return (
    <div className='w-full text-left px-14 pt-5'>
        <p className='text-xl font-medium text-[#1F384C]'>
          All Drivers
        </p>

        <div className='w-full mt-10 h-10 flex items-center justify-between'>
          <div className='h-10 flex items-center gap-4'>
            <select
              value={filterArea}
              onChange={e => setFilterArea(e.target.value)}
              className='w-40 rounded-full text-center focus:outline-none h-full flex items-center justify-center text-[#FF5C00] text-sm bg-[#FFE3CF]'
            >
              <option value="">Area</option>
              {majorCities.map(city => (
                  <option key={city.name} value={city.name}>{city.name}</option>
              ))}
            </select>

            {filterArea &&
            <p
              className='w-32 relative rounded-full h-full flex items-center justify-center text-[#FF5C00] text-sm bg-transparent border-2 border-[#FFE3CF]'
            >
              {filterArea}
              
              <span
                onClick={() => setFilterArea("")}
                className='absolute -top-1 text-white p-1 -right-1 bg-[#ffb885] rounded-full flex items-center justify-center'>
                <IoClose />
              </span>
            </p>}
          </div>

          <Link
            to={"/driver-addition"}
            className='px-16 rounded-full h-full flex items-center justify-center text-[#FF5C00] text-sm bg-[#FFE3CF]'
          >
            Add New Driver +
          </Link>
        </div>
        <div className='w-full mt-5'>
          {driverList &&
          <DriverList 
            driverList={driverList} 
            area={filterArea && filterArea !== "" && filterArea} 
          />}
        </div>
    </div>
  )
}

export default DriverListPage