
import { useUserContext } from 'globalComponents/AppContext';
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import axiosInstance from 'utils/AxiosInstance';
import RequestDeletePopUp from './RequestDeletePopUp';

const defaultProfilePhoto = "https://via.placeholder.com/150"

const ViewPoliceVerification = ({ image, setPoliceVerificationImage }) => {
  return (
    <div className='w-screen px-40 h-screen fixed top-0 py-40 left-0 z-50 backdrop-blur-sm flex items-center justify-center'>
      <div className='h-full z-10 aspect-square bg-white bg-opacity-80 rounded-3xl relative border-orange-600 border-2 p-6 overflow-hidden flex items-center justify-start'>
        <button
          onClick={() => setPoliceVerificationImage(null)}
          className='text-lg px-3 absolute top-3 right-3 text-orange-600 border-[1.5px] border-orange-600 hover:bg-opacity-10 bg-orange-600 bg-opacity-20 backdrop-blur-sm rounded-full  '
        >
          close
        </button>
        <img
          src={image}
          className='w-full h-full shadow-md object-contain rounded-2xl'
          alt='police verification'
        />
      </div>
    </div>
  )
}

const DriverAdditionTable = ({ driverList, area, handleFetch, setLoader }) => {
  const { setAlert } = useUserContext()
  const [ newDriverList, setNewDriverList ] = useState(driverList)
  const [ policeVerificationImage, setPoliceVerificationImage ] = useState(null)
  const [ deleteId, setDeleteId ] = useState(null)

  useEffect(() => {
    if (area) {
      const filterredList = driverList?.filter(driver => driver.area?.toLowerCase() === area?.toLowerCase());
      setNewDriverList(filterredList)
    } else (
      setNewDriverList(driverList)
    )
  }, [driverList, area])

  const handleApprove = (id) => {
    if (id) {
      setLoader(true)

      axiosInstance
      .post(`all/status/driver/${id}/`, {})
      .then(res => {
        setAlert("Driver Approved")
        handleFetch()
      })
      .catch(err => {
        console.error(err)
        setAlert("Something went wrong")
      })
      .finally(() => {
        setLoader(false)
      })
    }
  }

  const handleShowImage = (image) => {
    if (!image) {
      setAlert("Image not Uploaded")
      return
    }

    setPoliceVerificationImage(image)
  }

  return (
    <div className="w-full px-4 py-6 relative">

      {deleteId &&
      <div onClick={() => setDeleteId(null)} className='w-screen h-screen backdrop-blur-sm fixed top-0 left-0 z-[999] flex items-center justify-center'>
        <RequestDeletePopUp
          deleteId={deleteId}
          setDeleteId={setDeleteId}
          setNewDriverList={setNewDriverList}
        />
      </div>}

      {policeVerificationImage &&
      <ViewPoliceVerification image={policeVerificationImage} setPoliceVerificationImage={setPoliceVerificationImage} />}

        <div className='w-full'>
        <table className="table-auto w-full relative">
          <thead>
            <tr className="bg-transparent border-[0.5px] border-[#FF7527] h-14 mb-14">
              <th className="text-left text-[#1F384C] text-sm px-4 pl-10 py-4">Name</th>
              <th className="text-center text-[#1F384C] text-sm px-4 py-4">Mobile Number</th>
              <th className="text-center text-[#1F384C] text-sm px-4 py-4">Aadhar</th>
              <th className="text-center text-[#1F384C] text-sm px-4 py-4">License No</th>
              <th className="text-center text-[#1F384C] text-sm px-4 pr-10 py-4">Police Verification </th>
              <th className="text-right text-[#1F384C] text-sm px-4 py-4">Options</th>
            </tr>
            <div className="h-12"></div>
          </thead>

          <div className="bg-[#FFB27C] border-[1.5px] border-[#FFB27c] w-full p-4 py-2 absolute top-14 left-0">
            <p className="text-orange-800 font-medium">Showing {newDriverList?.length} of {newDriverList?.length} Drivers</p>
          </div>

          <tbody className="mt-14">
            {newDriverList.map((driver) => (
              <tr key={driver.driver} className="text-sm border-b-[1px] border-[#C7CBD9]">

                {/* driver name */}
                <td className="flex items-center text-left px-4 py-4">
                  <img
                    src={driver.profile_photo || defaultProfilePhoto} // Assuming a default profile image
                    alt="profile"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-orange-600">{driver.first_name} {driver?.last_name}</p>
                    <p className="text-green-500">{driver.area || "N/A"}</p>
                  </div>
                </td>

                <td className="px-4 py-4 text-center text-orange-600">
                  {driver?.phone_number}
                </td>

                <td className="px-4 py-4 text-center">
                  {driver.aadhaar_no}
                </td>

                <td className="px-4 py-4 text-center">
                  {driver.license_no}
                </td>

                <td className="px-2 pr-4 py-4 text-orange-600 text-center">
                  <button onClick={() => handleShowImage(driver.police_verification_letter)} className='text-orange-600 underline'>
                    View
                  </button>
                </td>

                <td className="group py-4 text-right">
                  <div className='flex items-center justify-end gap-4 text-white font-medium'>
                    <button onClick={() => handleApprove(driver.driver)} className='bg-green-600  text-xs rounded-full px-3 py-1'>
                      Approve
                    </button>
                    <button onClick={() => setDeleteId(driver.driver)} className=' text-xl rounded-full hover:bg-gray-700 hover:bg-opacity-10 p-1 cursor-pointer text-black text-opacity-50'>
                      <MdDeleteForever />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverAdditionTable;