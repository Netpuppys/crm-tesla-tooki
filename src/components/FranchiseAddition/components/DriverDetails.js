import React from 'react'

const DriverDetails = ({
    handleClose,
}) => {

  return (
    <div className='p-5 relative w-[50vw] h-[80vh] rounded-2xl backdrop-blur-md bg-orange-500 bg-opacity-15 border-2 border-orange-600 border-opacity-50 shadow-2xl'>
        
        <button
            onClick={handleClose}
            className='text-orange-600 underline absolute top-3 right-3'
        >
            close
        </button>


    </div>
  )
}

export default DriverDetails