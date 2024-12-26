import React from 'react'
import "../../../styles/components/analytics/components/RatingsChartCard.css"
import { useUserContext } from 'globalComponents/AppContext'
import { useNavigate } from 'react-router-dom'

const RatingsChartCard = () => {
    const { driverList, userList, franchiseList } = useUserContext()

    const navigate = useNavigate()

    const data = [
        { title: "Franchises", list: franchiseList, link: "/franchise-list" },
        { title: "Drivers", list: driverList, link: "/driver-list" },
        { title: "Users", list: userList, link: "/user-list" },
    ]

  return (
    <div className='rating-card-main-div pt-4'>

        <p className='text-left'>
            Total numbers:
        </p>

        {data.map((item, index) => (
        <div key={index} className='w-full mt-5 rounded-xl py-2 border-l-2 border-r-2 border-orange-600 shadow-2xl mb-4 backdrop-blur-md bg-opacity-10 flex items-center justify-between px-5'>
            <p className='text-orange-600 font-semibold '>
                {item.title}:
            </p>

            <div className='flex items-center'>
                <p className=' font-medium text-black pr-3 border-opacity-30 border-r border-gray-500'>
                    {(item.list && item.list.length > 0)? item.list.length : 0}
                </p>

                <button
                    onClick={() => navigate(item.link)}
                    className='px-3 py-1 w-fit shadow-md bg-[#EBFFE1] text-nowrap text-[#00A510] text-sm ml-2'
                >
                    View All
                </button>
            </div>
        </div>))}
{/* 
        <div className='w-full rounded-xl py-2 border-l-2 border-r-2 border-orange-600 shadow-2xl mb-4 backdrop-blur-md bg-opacity-10 flex items-center justify-between px-5'>
            <p className='text-orange-600 font-semibold '>
                Users:
            </p>

            <p className=' font-medium text-black pr-3 border-opacity-30 border-r border-gray-500'>
                {(userList && userList.length > 0)? userList.length : 0}
            </p>
        </div>

        <div className='w-full rounded-xl py-2 border-l-2 border-r-2 border-orange-600 shadow-2xl mb-4 backdrop-blur-md bg-opacity-10 flex items-center justify-between px-5'>
            <p className='text-orange-600 font-semibold '>
                Franchises:
            </p>

            <p className=' font-medium text-black pr-3 border-opacity-30 border-r border-gray-500'>
                {(franchiseList && franchiseList.length > 0)? franchiseList.length : 0}
            </p>
        </div> */}

        {/* <div className='all-text-div'>
            <p className='main-title'>
                Ratings
            </p>

            <p className='percentage-text'>
            </p>
        </div>

        <div className='chart-container'>
            <img src={deleteImg} style={{ width: "100%" }} alt='remove' />
        </div> */}
    </div>
  )
}

export default RatingsChartCard