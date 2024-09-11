import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DriverList from 'components/FranchiseAddition/DriverTable'
import { useUserContext } from 'globalComponents/AppContext'
import FranchiseTable from './FranchisesTable'

const FranchiseList = () => {
  const { franchiseList } = useUserContext()

  
  return (
    <div className='w-full text-left px-14 pt-5'>
        <p className='text-xl font-medium text-[#1F384C]'>
          All Franchises
        </p>

        <div className='w-full mt-10 h-10 flex items-center justify-between'>
          <button
            className='px-16 rounded-full h-full flex items-center justify-center text-[#FF5C00] text-sm bg-[#FFE3CF]'
          >
            Filter
          </button>

          <Link
            to={"/franchise-addition"}
            className='px-16 rounded-full h-full flex items-center justify-center text-[#FF5C00] text-sm bg-[#FFE3CF]'
          >
            Add New Franchise +
          </Link>
        </div>
        <div className='w-full mt-5'>
          {franchiseList &&
          <FranchiseTable franchiseList={franchiseList} />}
        </div>
    </div>
  )
}

export default FranchiseList