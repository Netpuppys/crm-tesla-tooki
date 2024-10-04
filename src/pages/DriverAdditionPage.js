import DriverAddition from 'components/DriverAddition/DriverAddition'
import DriverAdditionTable from 'components/DriverAddition/DriverAdditionTable'
import React, { useEffect, useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner'
import axiosInstance from 'utils/AxiosInstance'

const DriverAdditionPage = () => {
    const [ showDriverAddition, setShowDriverAddition ] = useState(false)
    const [ driverList, setDriverList ] = useState([])
    const [ loader, setLoader ] = useState(false)

    const handleFetch = () => {
        setLoader(true)

        axiosInstance
        .get("all/driversignupstatus/")
        .then(res => {
            console.log(res)
            setDriverList(res.data)
        })
        .catch(err => {
            console.err(err)
        })
        .finally(() => {
            setLoader(false)
        })
    }

    useEffect(() => {
        handleFetch()
    }, [])

  return (
    <div className='w-full min-h-full text-left px-14 py-10'>
        {showDriverAddition && <DriverAddition setShowDriverAddition={setShowDriverAddition} />}

        {loader && 
        <div className='w-screen h-screen fixed top-0 left-0 z-50 flex items-center justify-center backdrop-blur-sm'>
            <ThreeCircles color='#ea580c' />
        </div>}

        {!showDriverAddition &&
        <div className='w-full h-full'>
            <div className='w-full flex items-center justify-between'>
                <p className='mb-14 text-[#1f384c] text-xl tracking-[0.5px] font-medium'>
                    Driver Addition
                </p>
                <button
                    onClick={() => setShowDriverAddition(true)}
                    className='px-16 rounded-full h-10 border-2 border-[#FFE3CF] hover:border-orange-600 hover:border-opacity-50 flex items-center justify-center text-[#FF5C00] text-sm bg-[#FFE3CF]'
                >
                    Add New Driver +
                </button>
            </div>

            <div className='mt-10'>
                {!loader &&
                <DriverAdditionTable
                    driverList={driverList}
                    handleFetch={handleFetch}
                    setLoader={setLoader}
                />}
            </div>
        </div>}
    </div>
  )
}

export default DriverAdditionPage