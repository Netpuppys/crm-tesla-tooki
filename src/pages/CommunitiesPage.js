
import CommunitiesTable from 'components/Communities/components/CommunitiesTable'
import { useUserContext } from 'globalComponents/AppContext'
import React from 'react'
import { Link } from 'react-router-dom'

const CommunitiesPage = () => {
  const { communitiesList } = useUserContext()

  return (
    <div className='w-full text-left px-14 pt-8'>
        <div className='w-full h-10 flex items-center justify-between'>
          <p className='text-xl font-medium text-[#1F384C]'>
            All Communities
          </p>

          <Link
            to={"/add-community"}
            className='px-16 rounded-full h-full flex items-center justify-center text-[#FF5C00] text-sm bg-[#FFE3CF]'
          >
            Add New Community +
          </Link>
        </div>
        <div className='w-full mt-5'>
          {communitiesList &&
          <CommunitiesTable
            communitiesList={communitiesList} 
          />}
        </div>
    </div>
  )
}

export default CommunitiesPage