import UserDetails from 'components/FranchiseAddition/components/UserDetails';
import { useUserContext } from 'globalComponents/AppContext';
import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { ThreeCircles } from 'react-loader-spinner';
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

const DeletePopUp = ({ deleteId, setDeleteId }) => {
  const [timer, setTimer] = useState(5);
  const { setDriverList } = useUserContext()

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval); // Clear the interval on component unmount
    } else {
      // Add any action after 5 seconds, like closing the popup
      console.log("Timer finished, proceeding with action.");
    }
  }, [timer]);

  const handleClick = () => {
    if (typeof deleteId === "number") {
      axiosInstance
      .delete(`/all/consumer/${deleteId}/`)
      .then(res => {
        console.log(res)
        setTimer(5)
        setDriverList(prev => {
          const filterred = prev.filter(item => item.id !== deleteId)
          
          return filterred
        })
        setTimeout(() => {
          setDeleteId(null)
        }, 5000)
      })
      .catch(err => {
        console.error(err)
      })
    }
  }

  return (
    <div className='w-fit p-5 text-center backdrop-blur-md bg-orange-500 bg-opacity-15 z-[9999] px-10 rounded-xl shadow-2xl border-2 border-orange-600 flex items-center flex-col justify-center'>
      <p className='text-3xl supermercado'>
        Are You Sure? 
      </p>
      <p className='text-sm pt-4'>
        You can delete in: {timer}
      </p>

      <button
        disabled={timer!==0}
        onClick={handleClick}
        className='w-20 mt-10 h-10 bg-[#ff3333] rounded-full text-white font-medium flex items-center justify-center disabled:bg-gray-500 disabled:opacity-50'
      >
        Delete
      </button>
    </div>
  )
}

const UserTable = ({ driverList, area }) => {
  const [ newDriverList, setNewDriverList ] = useState(driverList)
  const [ showTransactions, setShowTransactions ] = useState(false)
  const [ deleteId, setDeleteId ] = useState(null)
  const [ userDetails, setUserDetails ] = useState()
  const [ showDetails, setShowDetails ] = useState(false)
  const [ loader, setLoader ] = useState(false)

  useEffect(() => {
    if (area) {
      const filterredList = driverList?.filter(driver => driver.area?.toLowerCase() === area?.toLowerCase());
      setNewDriverList(filterredList)
    } else (
      setNewDriverList(driverList)
    )
  }, [driverList, area])

  const handleFetchUserDetails = (id) => {
    if (typeof id === "number") {
      setLoader(true)
      axiosInstance
      .get(`/account/users/${id}/`)
      .then(res => {
        const data = res.data;
        setUserDetails(data)
        setShowDetails(true)
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        setLoader(false)
      })
    }
  }

  const handleCloseDetails = () => {
    setShowDetails(false)
  }

  return (
    <div className="w-full px-4 py-6">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">User List</h2>
      </div>

      {loader &&
      <div className='w-screen h-screen fixed top-0 left-0 backdrop-blur-sm flex items-center justify-center'>
        <ThreeCircles
          color='#ea580c'
        />
      </div>}

      {showTransactions &&
      <div className='w-screen h-screen z-50 flex items-center justify-center bg-black bg-opacity-10 fixed top-0 left-0'>
        <TransactionHistory 
          setShowTransactions={setShowTransactions}
        />
      </div>}

      {showDetails &&
      <div 
        className='w-screen h-screen top-0 left-0 fixed z-[999] flex items-center justify-center pointer-events-auto'
      >
        <UserDetails
          handleClose={handleCloseDetails}
          driverDetails={userDetails}
          setDriverDetails={setUserDetails}
        />
      </div>}

      {typeof deleteId === "number" &&
      <div 
        onClick={() => setDeleteId(null)}
        className='w-screen h-screen fixed z-[9999] top-0 left-0 backdrop-blur-sm flex items-center justify-center'>
        <DeletePopUp
          deleteId={deleteId}
          setDeleteId={setDeleteId}
        />
      </div>}
      
        <div className='w-full'>
        <table className="table-auto w-full relative">
          <thead>
            <tr className="bg-transparent border-[0.5px] border-[#FF7527] h-14 mb-14">
              <th className="text-center text-[#1F384C] text-sm px-4 pl-10 py-4">Name</th>
              <th className="text-center text-[#1F384C] text-sm px-4 py-4">Mobile Number</th>
              <th className="text-center text-[#1F384C] text-sm px-4 py-4">Email</th>
              <th className="text-center text-[#1F384C] text-sm px-4 py-4">Options</th>
              {/* <th className="text-center text-[#1F384C] text-sm px-4 pr-10 py-4">Transactions</th> */}
            </tr>
            <div className="h-12"></div>
          </thead>

          <div className="bg-[#FFB27C] border-[1.5px] border-[#FFB27c] w-full p-4 py-2 absolute top-14 left-0">
            <p className="text-orange-800 font-medium">Showing {newDriverList?.length} of {newDriverList?.length} Drivers</p>
          </div>

          <tbody className="mt-14">
            {newDriverList.map((driver) => (
              <tr key={driver.id} className="text-sm border-b-[1px] text-center border-[#C7CBD9]">
                {/* name */}
                <td className="flex items-start text-left px-4 py-4">
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
                {/* phone number */}
                <td className="px-4 py-4 text-orange-600">{driver.phone_number}</td>
                {/* email */}
                <td className="px-4 py-4 text-orange-600">
                  <a href={`mailto:${driver.email}`} className="hover:underline">{driver.email}</a>
                </td>
                {/* options */}
                <td className="px-2 pr-4 group py-4 text-orange-600 text-right">
                  <button
                    className='underline py-3 relative text-right'
                  >
                    <div className='w-full h-full bg-orange-600 bg-opacity-20 px-1 py-2 rounded-md'>
                      <BsThreeDotsVertical />
                    </div>

                    <div className='w-32 h-fit text-orange-600 border-[1px] border-orange-600 font-semibold backdrop-blur-lg absolute px-2 hidden group-hover:block bottom-[100%] right-0 rounded-2xl bg-white bg-opacity-50 shadow-2xl'>
                      <button 
                        onClick={() => handleFetchUserDetails(driver.id)}
                        className='w-full h-10 flex border-b-[1px] border-orange-600 border-opacity-30 items-center justify-start'
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => setDeleteId(driver.id)}
                        className='w-full mt-5 h-10 flex text-red-600 items-center justify-start'
                      >
                        Delete
                      </button>
                    </div>
                  </button>
                </td>
                {/* <td className="px-4 py-4 text-right">
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
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
