import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import axiosInstance from 'utils/AxiosInstance';

const defaultProfilePhoto = "https://via.placeholder.com/150"

const TransactionHistory = ({ setShowTransactions }) => {
  return (
    <div className='w-full bg-white z-50 max-w-[30rem] min-h-[20rem] p-6 flex items-center justify-start flex-col rounded-3xl shadow-2xl relative'>
      <button
        onClick={() => setShowTransactions(false)}
        className='w-10 aspect-square absolute top-3 right-3 rounded-full flex items-center justify-center text-2xl bg-black bg-opacity-20 text-black'
      >
        <IoClose />
      </button>
      <p className='text-3xl supermercado'>
        No Transactions Found
      </p>
    </div>
  )
}

// : 
// Fare
// : 
// "449.0000"
// driver
// : 
// 8
// drop_location
// : 
// "Rohini Sector 13, Sector 13, Rohini, Delhi, 110085, India"
// id
// : 
// 3
// pickup_location
// : 
// "Badshahpur Sohna Rd Hwy, Sector 48, Gurugram, Haryana 122018, India"
// rider_name
// : 
// "shourya"

const TripHistory = ({ data }) => {
  return (
    <div className='w-full overflow-hidden h-fit py-3 px-4 border-b-2 border-slate-300 bg-white rounded-3xl'>
      <p className='w-full font-medium flex items-center justify-between gap-4 overflow-hidden text-nowrap text-green-600'>
        Pickup:
        <span className='font-light text-sm text-[#525252]'>
          {data.pickup_location}
        </span>
      </p>
      <p className='w-full font-medium flex items-center text-nowrap gap-4 overflow-hidden justify-between text-red-600'>
        Drop:
        <span className='font-light text-sm text-[#525252]'>
          {data.drop_location}
        </span>
      </p>
      <p className='w-full pt-4 font-medium flex items-center text-nowrap gap-4 overflow-hidden justify-between text-slate-600'>
        Fare:
        <span className='font-light text-sm text-[#525252]'>
          {data.Fare}
        </span>
      </p>
    </div>
  )
}

const DriverList = ({ driverList, area}) => {
  console.log(driverList)
  const [ newDriverList, setNewDriverList ] = useState(driverList)
  const [ showTransactions, setShowTransactions ] = useState(false)
  const [ showTripHistory, setShowTripHistory ] = useState(false)
  const [ tripHistory, setTripHistory ] = useState()

  const fetchTripHistory = (id) => {
    console.log("hello")
    axiosInstance
    .get(`/all/driver/${id}/historydetails/`)
    .then(res => {
      console.log(res.data["Driver history"])
      setTripHistory(res.data["Driver history"])
      setShowTripHistory(true)
    })
    .catch(err => {
      console.log(err)
      alert("Trip History not found")
    })
  }

  const handleCloseTripHistory = () => {
    setTripHistory(null)
    setShowTripHistory(false)
  }

  useEffect(() => {
    if (area) {
      const filterredList = driverList?.filter(driver => driver.area?.toLowerCase() === area?.toLowerCase());
      setNewDriverList(filterredList)
    } else (
      setNewDriverList(driverList)
    )
  }, [driverList, area])

  return (
    <div className="w-full px-4 py-6 relative">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Driver List</h2>
      </div>

      {showTransactions &&
      <div className='w-screen h-screen z-50 flex items-center justify-center bg-black bg-opacity-10 fixed top-0 left-0'>
        <TransactionHistory 
          setShowTransactions={setShowTransactions}
        />
      </div>}

      {showTripHistory &&
      <div 
        onClick={handleCloseTripHistory}
        className="w-screen h-screen backdrop-blur-sm p-10 z-[999] pl-[20%] pt-[10rem] bg-opacity-10 fixed top-0 left-0 flex flex-col items-center justify-start gap-8"
      >
        <div className='max-w-[40rem] backdrop-blur-lg bg-white px-4 rounded-2xl border-2 border-orange-600 py-4'>
          <p className='text-center text-green-600 supermercado text-3xl'>
            Trip History
          </p>
          <div className='flex flex-col mt-8 items-center max-h-[60vh] overflow-auto justify-start gap-4'>
            {tripHistory.map((item, id) => (
            <div key={id} className='max-w-[40rem] max-h-[20rem] h-fit w-full'>
              <TripHistory
                data={item}
              />
            </div>))}
          </div>
        </div>
      </div>}
      
        <div className='w-full'>
        <table className="table-auto w-full relative">
          <thead>
            <tr className="bg-transparent border-[0.5px] border-[#FF7527] h-14 mb-14">
              <th className="text-left text-[#1F384C] text-sm px-4 pl-10 py-4">Name</th>
              <th className="text-center text-[#1F384C] text-sm px-4 py-4">Mobile Number</th>
              <th className="text-center text-[#1F384C] text-sm px-4 py-4">Email</th>
              <th className="text-center text-[#1F384C] text-sm px-4 py-4">Trip History</th>
              <th className="text-center text-[#1F384C] text-sm px-4 pr-10 py-4">Transactions</th>
            </tr>
            <div className="h-12"></div>
          </thead>

          <div className="bg-[#FFB27C] border-[1.5px] border-[#FFB27c] w-full p-4 py-2 absolute top-14 left-0">
            <p className="text-orange-800 font-medium">Showing {newDriverList?.length} of {newDriverList?.length} Drivers</p>
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
                    <p className="text-green-500">{driver.area || "N/A"}</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-orange-600">{driver.phone_number}</td>
                <td className="px-4 py-4 text-orange-600">
                  <a href={`mailto:${driver.email}`} className="hover:underline">{driver.email}</a>
                </td>
                <td className="px-4 py-4">
                  <button 
                    onClick={() => fetchTripHistory(driver.id)}
                    className="bg-orange-100 text-orange-600 text-xs px-6 py-1 rounded-full hover:bg-orange-200"
                  >
                    View Trip History
                  </button>
                </td>
                <td className="px-4 py-4 text-right">
                  <button 
                    onClick={() => setShowTransactions(true)}
                    className="bg-orange-100 text-orange-600 px-6 py-1 text-xs rounded-full flex items-center gap-2 hover:bg-orange-200"
                  >
                    <span>View Previous Transactions</span>
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

export default DriverList;
