import React, { useEffect, useState } from 'react';
import axiosInstance from 'utils/AxiosInstance';
import { useUserContext } from 'globalComponents/AppContext';

const DeletePopUp = ({ deleteId, setDeleteId }) => {
  const { setFranchiseList } = useUserContext()
  const [ timer, setTimer ] = useState(5);

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
      .delete(`/all/franchise/${deleteId}/`)
      .then(res => {
        console.log(res)
        setTimer(5)
        setFranchiseList(prev => {
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
    <div className='w-fit p-5 text-center backdrop-blur-md bg-orange-500 bg-opacity-15 z-[9999] px-10 rounded-xl shadow-3xl border-2 border-orange-600 flex items-center flex-col justify-center '>
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

export default DeletePopUp