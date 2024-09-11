import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Circles, ThreeCircles, ThreeDots } from 'react-loader-spinner';
import axiosInstance from 'utils/AxiosInstance';
import { BsThreeDotsVertical } from "react-icons/bs";
import DriverDetails from './components/DriverDetails';

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

const BalancePopUp = ({ id, balance, setBalance, setShowBalance }) => {
  const [ value, setValue ] = useState(0)
  const [ loader, setLoader ] = useState(false)

    const handleClose = () => {
      setShowBalance(false)
    }

    const handleAddPoints = () => {
      if (!value) {
        alert("please enter valid amount")
        return
      }

      if (value) {
        setLoader(true)

        const data = {
          user_id: id,
          points: Number(value)
        }

        axiosInstance
        .post("all/addamount/", data)
        .then(res => {
          console.log(res)
          setBalance(res.data.new_balance)
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          setLoader(false)
          setValue(0)
        })
      }
    }

    const handleMinusPoints = () => {
      if (!value) {
        alert("please enter valid amount")
        return
      }

      if (value) {
        setLoader(true)

        const data = {
          user_id: id,
          points: Number(value)
        }

        axiosInstance
        .post("all/subtractamount/", data)
        .then(res => {
          console.log(res)
          setBalance(res.data.new_balance)
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          setLoader(false)
          setValue(0)
        })
      }
    }

  return (
    <div className='w-full bg-white z-50 overflow-hidden max-w-[30rem] p-6 pb-24 flex items-center justify-start flex-col rounded-3xl shadow-2xl relative'>
      <button
        onClick={handleClose}
        disabled={loader}
        className='w-10 aspect-square absolute top-3 disabled:opacity-20 right-3 rounded-full flex items-center justify-center text-2xl bg-black bg-opacity-20 text-black'
      >
        <IoClose />
      </button>
      <p className='text-2xl supermercado'>
        Balance
      </p>
      <p className='text-4xl pt-5 text-green-600 supermercado'>
        {balance}
      </p>

      <div className='w-full mt-5 h-10 flex items-center justify-between gap-4'>
        <p className='text-sm text-wrap text-[#525252]'>
          How many Points would you like to Add or Subtract:
        </p>
        <input
          type='number'
          disabled={loader}
          className='border-2 border-[#525252] border-opacity-25 px-2 w-20 h-full rounded-lg'
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>

      <div className='w-full h-20 z-20 border-t-2 border-[#525252] border-opacity-20 absolute bottom-0 left-0 flex items-center justify-center gap-2 p-3'>
        <button
          onClick={handleAddPoints}
          disabled={loader}
          className='w-1/2 h-full rounded-2xl flex justify-center items-center bg-green-600 text-white font-medium supermercado text-lg'
        >
          {loader? <ThreeDots color='#ffffff'/> : "Add Points"}
        </button>
        <button
          onClick={handleMinusPoints}
          disabled={loader}
          className='w-1/2 h-full rounded-2xl flex justify-center items-center bg-red-600 text-white font-medium supermercado text-lg'
        >
          {loader? <ThreeDots color='#ffffff'/> : "Subtract Points"}
        </button>
      </div>
    </div>
  )
}

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
  const [ newDriverList, setNewDriverList ] = useState(driverList)
  const [ showTransactions, setShowTransactions ] = useState(false)
  const [ showTripHistory, setShowTripHistory ] = useState(false)
  const [ tripHistory, setTripHistory ] = useState()
  const [ showBalance, setShowBalance ] = useState(false)
  const [ balanceId, setBalanceId ] = useState()
  const [ balance, setBalance ] = useState()
  const [ loader, setLoader ] = useState(false)
  const [ showDetails, setShowDetails ] = useState(false)

  const fetchTripHistory = (id) => {
    setLoader(true)
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
    .finally(() => {
      setLoader(false)
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

  const handleShowBalance = (id) => {
    setLoader(true)
    axiosInstance
      .get(`wallet/amountcheck/${id}/`)
      .then(res => {
        if (res.data.Wallet) {
          setBalance(res.data.Wallet.balance)
        } else if (res.data.Amount) {
          setBalance(res.data.Amount.balance)
        }
        setShowBalance(true)
        setBalanceId(id)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setLoader(false))
  }

  const handleCloseDetails = () => {
    setShowDetails(false)
  }

  return (
    <div className="w-full px-4 py-6 relative">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Driver List</h2>
      </div>

      {loader && 
      <div className='w-screen backdrop-blur-sm h-screen z-[9999] fixed top-0 left-0 flex items-center justify-center pointer-events-auto'>
        <ThreeCircles
          color='#ff6b17'
        />
      </div>}

      {showDetails &&
      <div 
        className='w-screen h-screen top-0 left-0 fixed z-[999] flex items-center justify-center pointer-events-auto'
      >
        <DriverDetails
          handleClose={handleCloseDetails}
        />
      </div>}

      {showBalance &&
      <div className='w-screen h-screen z-50 flex items-center justify-center bg-black bg-opacity-10 fixed top-0 left-0'>
        <BalancePopUp
          id={balanceId}
          balance={balance}
          setBalance={setBalance}
          setShowBalance={setShowBalance}
        />
      </div>}

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
              <th className="text-center text-[#1F384C] text-sm px-4 py-4">Trip History</th>
              <th className="text-center text-[#1F384C] text-sm px-4 pr-10 py-4">Transactions</th>
              <th className="text-center text-[#1F384C] text-sm px-4 py-4">Balance</th>
              <th className="text-right text-[#1F384C] text-sm px-4 py-4">Options</th>
            </tr>
            <div className="h-12"></div>
          </thead>

          <div className="bg-[#FFB27C] border-[1.5px] border-[#FFB27c] w-full p-4 py-2 absolute top-14 left-0">
            <p className="text-orange-800 font-medium">Showing {newDriverList?.length} of {newDriverList?.length} Drivers</p>
          </div>

          <tbody className="mt-14">
            {newDriverList.map((driver) => (
              <tr key={driver.id} className="text-sm border-b-[1px] border-[#C7CBD9]">

                {/* driver name */}
                <td className="flex items-center text-center px-4 py-4">
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
                <td className="px-4 py-4 text-center text-orange-600">
                  {driver.phone_number}
                </td>

                {/* trip history */}
                <td className="px-4 py-4 text-center">
                  <button 
                    onClick={() => fetchTripHistory(driver.id)}
                    className="bg-orange-100 text-orange-600 text-xs px-6 py-1 rounded-full hover:bg-orange-200"
                  >
                    View Trip History
                  </button>
                </td>

                {/* show transactions */}
                <td className="px-4 py-4 text-center">
                  <button 
                    onClick={() => setShowTransactions(true)}
                    className="bg-orange-100 mx-auto text-orange-600 px-6 py-1 text-xs rounded-full flex items-center gap-2 hover:bg-orange-200"
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

                {/* balance */}
                <td className="px-2 pr-4 py-4 text-orange-600 text-center">
                  {/* <a href={`mailto:${driver.email}`} className="hover:underline">{driver.email}</a> */}
                  <button
                    onClick={() => handleShowBalance(driver.id)}
                    className='underline text-center'
                  >
                    view
                  </button>
                </td>

                {/* driver details */}
                <td className="px-2 pr-4 group py-4 text-orange-600 text-right">
                  <button
                    className='underline py-3 relative text-right'
                  >
                    <div className='w-full h-full bg-orange-600 bg-opacity-20 px-1 py-2 rounded-md'>
                      <BsThreeDotsVertical />
                    </div>

                    <div className='w-32 h-fit text-orange-600 border-[1px] border-orange-600 font-semibold backdrop-blur-lg absolute px-2 hidden group-hover:block bottom-[100%] right-0 rounded-2xl bg-white bg-opacity-50 shadow-2xl'>
                      <button 
                        onClick={() => setShowDetails(true)}
                        className='w-full h-10 flex border-b-[1px] border-orange-600 border-opacity-30 items-center justify-start'
                      >
                        View Details
                      </button>
                      <button 
                        className='w-full h-10 flex items-center justify-start'
                      >
                        Suspend
                      </button>
                    </div>
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
