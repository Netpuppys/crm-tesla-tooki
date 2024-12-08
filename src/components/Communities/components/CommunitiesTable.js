import React, { useEffect, useState } from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const CommunitiesTable = ({ communitiesList, area }) => {
  const [ newcommunitiesList, setNewcommunitiesList ] = useState(communitiesList)
  const [ loader, setLoader ] = useState(false)

  useEffect(() => {
    if (area) {
      const filterredList = communitiesList?.filter(driver => driver.area?.toLowerCase() === area?.toLowerCase());
      setNewcommunitiesList(filterredList)
    } else (
      setNewcommunitiesList(communitiesList)
    )
  }, [communitiesList, area])

  return (
    <div className="w-full px-4 py-6">

      {loader &&
      <div className='w-screen h-screen fixed top-0 left-0 z-[9999] backdrop-blur-sm flex items-center justify-center pointer-events-auto'>
        <ThreeCircles
          color='#ea580c'
        />
      </div>}

        <div className='w-full'>
        <table className="table-auto w-full relative">
          <thead>
            <tr className="bg-transparent border-[0.5px] border-[#FF7527] h-14 mb-14">
              <th className="text-center text-[#1F384C] text-sm px-4 pl-10 py-4">Community Founder</th>
              <th className="text-center text-[#1F384C] text-sm px-4 py-4">Mobile Number</th>
              <th className="text-center text-[#1F384C] text-sm px-4 py-4">Vehicle Type</th>
              <th className="text-center text-[#1F384C] text-sm px-4 pr-10 py-4">Type Of Community</th>
            </tr>
            <div className="h-12"></div>
          </thead>

          <div className="bg-[#FFB27C] border-[1.5px] border-[#FFB27c] w-full p-4 py-2 absolute top-14 left-0">
            <p className="text-orange-800 font-medium">Showing {newcommunitiesList?.length} of {newcommunitiesList?.length} Communities</p>
          </div>

          <tbody className="mt-14">
            {newcommunitiesList?.map((community) => (
              <tr key={community.id} className="text-sm border-b-[1px] border-[#C7CBD9]">

                <td className="flex items-center justify-center px-4 py-4">
                  <div>
                    <p className="font-semibold text-orange-600">{community.firstname} {community.lastname}</p>
                  </div>
                </td>

                <td className="px-4 py-4 text-center text-orange-600">{community.mobile_number}</td>

                <td className="px-4 py-4 text-center">
                  <p className='text-orange-600'>
                    {community.vehicle_type}
                  </p>
                </td>

                <td className="px-4 py-4 text-center">
                    <p className='text-orange-600'>
                        {community.community}
                    </p>
                </td>

                {/* franchise details */}
                {/* <td className="px-2 pr-4 group py-4 text-orange-600 text-center">
                  <button
                    className='underline py-3 relative text-right'
                  >
                    <div className='w-full h-full bg-orange-600 bg-opacity-20 px-1 py-2 rounded-md'>
                      <BsThreeDotsVertical />
                    </div>

                    <div className='w-32 h-fit text-orange-600 border-[1px] border-orange-600 font-semibold backdrop-blur-lg absolute px-2 hidden group-hover:block bottom-[100%] right-0 rounded-2xl bg-white bg-opacity-50 shadow-2xl'>
                      <button 
                        onClick={() => handleFetchFranchise(community.id)}
                        className='w-full h-10 flex border-b-[1px] border-orange-600 border-opacity-30 items-center justify-start'
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => setDeleteId(community.id)}
                        className='w-full mt-5 h-10 flex text-red-600 items-center justify-start'
                      >
                        Delete
                      </button>
                    </div>
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommunitiesTable;