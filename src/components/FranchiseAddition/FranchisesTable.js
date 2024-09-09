import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

const defaultProfilePhoto = "https://via.placeholder.com/150"

const TransactionHistory = ({ setShowTransactions, showTransactions }) => {
  return (
    <div className='w-full bg-white z-50 max-w-[30rem] p-6 flex items-center justify-start flex-col rounded-3xl shadow-2xl relative'>
        <button
            onClick={() => setShowTransactions(null)}
            className='w-6 aspect-square  absolute top-3 right-3 rounded-full flex items-center justify-center text-2xl bg-black bg-opacity-20'
        >
            <IoClose />
        </button>
        <p className='text-3xl text-orange-600 supermercado'>
            Partner Details
        </p>
        <div className='w-full pt-10'>
        {showTransactions.map((item, index) => (
            <div className='w-full flex py-2  items-center border-b-2 last:border-b-0 border-black border-opacity-15 justify-between'>
                <p className='text-lg text-[#525252]'>
                    Partner {index+1}:
                </p>
                <p className='text-lg'>
                    {item.name}
                </p>
            </div>))}
        </div>
    </div>
  )
}

const FranchiseTable = ({ driverList, area}) => {
  console.log(driverList)
  const [ newDriverList, setNewDriverList ] = useState(driverList)
  const [ showTransactions, setShowTransactions ] = useState(null)

  useEffect(() => {
    if (area) {
      const filterredList = driverList?.filter(driver => driver.area?.toLowerCase() === area?.toLowerCase());
      setNewDriverList(filterredList)
    } else (
      setNewDriverList(driverList)
    )
  }, [driverList, area])

  return (
    <div className="w-full px-4 py-6">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Franchise List</h2>
      </div>

      {showTransactions &&
      <div className='w-screen h-screen z-50 flex items-center justify-center bg-black bg-opacity-10 fixed top-0 left-0'>
        <TransactionHistory 
            showTransactions={showTransactions}
            setShowTransactions={setShowTransactions}
        />
      </div>}
      
        <div className='w-full'>
        <table className="table-auto w-full relative">
          <thead>
            <tr className="bg-transparent border-[0.5px] border-[#FF7527] h-14 mb-14">
              <th className="text-left text-[#1F384C] text-sm px-4 pl-10 py-4">Name</th>
              <th className="text-center text-[#1F384C] text-sm px-4 py-4">Mobile Number</th>
              <th className="text-center text-[#1F384C] text-sm px-4 py-4">Email</th>
              <th className="text-center text-[#1F384C] text-sm px-4 py-4">Partners</th>
              <th className="text-center text-[#1F384C] text-sm px-4 pr-10 py-4">All Partners</th>
            </tr>
            <div className="h-12"></div>
          </thead>

          <div className="bg-[#FFB27C] border-[1.5px] border-[#FFB27c] w-full p-4 py-2 absolute top-14 left-0">
            <p className="text-orange-800 font-medium">Showing {newDriverList?.length} of {newDriverList?.length} Franchises</p>
          </div>

          <tbody className="mt-14">
            {newDriverList.map((driver) => (
              <tr key={driver.id} className="text-sm border-b-[1px] border-[#C7CBD9]">
                <td className="flex items-center px-4 py-4">
                  <img
                    src={driver.profile_photo || defaultProfilePhoto} // Assuming a default profile image
                    alt="profile"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-orange-600">{driver.first_name} {driver.last_name}</p>
                    <p className="text-green-500">{driver.area || "--"}</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-orange-600">{driver.phone_number}</td>
                <td className="px-4 py-4 text-orange-600">
                  <a href={`mailto:${driver.email}`} className="hover:underline">{driver.email}</a>
                </td>
                <td className="px-4 py-4">
                  <p className='text-orange-600'>
                    {driver.additional_details?.partners? driver.additional_details?.partners : 0}
                  </p>
                </td>
                <td className="px-4 py-4 text-right">
                  <button 
                    onClick={() => setShowTransactions(driver.another_additional_details)}
                    className="bg-orange-100 text-orange-600 px-6 py-1 text-xs rounded-full flex items-center gap-2 hover:bg-orange-200"
                  >
                    <span>View Partners</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FranchiseTable;
