import React, { useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import axiosInstance from 'utils/AxiosInstance';
import FranchiseDetails from './components/FranchiseDetails';
import { ThreeCircles } from 'react-loader-spinner';
import PartnerDetails from './components/PartnerDetails';
import DeletePopUp from './components/DeletePopUp';
import { useLocation } from 'react-router-dom';

const defaultProfilePhoto = "https://via.placeholder.com/150"

const FranchiseTable = ({ franchiseList, area }) => {
  const franchiseRefs = useRef({}); 

  const location = useLocation()
  const searchFranchiseData = location.state?.userData;

  const [ newfranchiseList, setNewfranchiseList ] = useState(franchiseList)
  const [ partnersDetails, setPartnersDetails ] = useState(null)
  const [ franchiseId, setFranchiseId ] = useState()
  const [ showDetails, setShowDetails ] = useState(false)
  const [ franchiseDetails, setFranchiseDetails ] = useState()
  const [ deleteId, setDeleteId ] = useState(null)
  const [ loader, setLoader ] = useState(false)

  const handleSearchClick = (id) => {
    // Scroll to the specific driver in the list
    const targetRef = franchiseRefs.current[id];
    if (targetRef) {
      targetRef.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    if (searchFranchiseData) {
      handleSearchClick(searchFranchiseData.id)
    }
  }, [searchFranchiseData])

  useEffect(() => {
    if (area) {
      const filterredList = franchiseList?.filter(driver => driver.area?.toLowerCase() === area?.toLowerCase());
      setNewfranchiseList(filterredList)
    } else (
      setNewfranchiseList(franchiseList)
    )
  }, [franchiseList, area])

  const handleFetchFranchise = (id) => {
    if (typeof id === "number") {
      setLoader(true)
      axiosInstance
      .get(`/account/users/${id}/`)
      .then(res => {
        const data = res.data;
        setFranchiseDetails(data)
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

  const handlePartnerView = (id, data) => {
    setFranchiseId(id)
    setPartnersDetails(data)
  }

  return (
    <div className="w-full px-4 py-6">

      {loader &&
      <div className='w-screen h-screen fixed top-0 left-0 z-[9999] backdrop-blur-sm flex items-center justify-center pointer-events-auto'>
        <ThreeCircles
          color='#ea580c'
        />
      </div>}

      {showDetails &&
      <div 
        className='w-screen h-screen top-0 left-0 fixed z-[999] flex items-center justify-center pointer-events-auto'
      >
        <FranchiseDetails
          handleClose={handleCloseDetails}
          driverDetails={franchiseDetails}
          setDriverDetails={setFranchiseDetails}
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
      
      {partnersDetails &&
      <div className='w-screen h-screen z-50 flex items-center justify-center bg-black bg-opacity-10 fixed top-0 left-0'>
        <PartnerDetails
            franchiseId={franchiseId}
            setFranchiseId={setFranchiseId}
            partnersDetails={partnersDetails}
            setPartnersDetails={setPartnersDetails}
        />
      </div>}

      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Franchise List</h2>
      </div>

      
        <div className='w-full'>
        <table className="table-auto w-full relative">
          <thead>
            <tr className="bg-transparent border-[0.5px] border-[#FF7527] h-14 mb-14">
              <th className="text-center text-[#1F384C] text-sm px-4 pl-10 py-4">Name</th>
              <th className="text-center text-[#1F384C] text-sm px-4 py-4">Mobile Number</th>
              <th className="text-center text-[#1F384C] text-sm px-4 py-4">Email</th>
              <th className="text-center text-[#1F384C] text-sm px-4 py-4">Partners</th>
              <th className="text-center text-[#1F384C] text-sm px-4 pr-10">All Partners</th>
              <th className="text-center text-[#1F384C] text-sm px-4 pr-10 py-4">Options</th>
            </tr>
            <div className="h-12"></div>
          </thead>

          <div className="bg-[#FFB27C] border-[1.5px] border-[#FFB27c] w-full p-4 py-2 absolute top-14 left-0">
            <p className="text-orange-800 font-medium">Showing {newfranchiseList?.length} of {newfranchiseList?.length} Franchises</p>
          </div>

          <tbody className="mt-14">
            {newfranchiseList.map((driver) => (
              <tr 
                key={driver.id}
                ref={(el) => (franchiseRefs.current[driver.id] = el)} 
                className={`text-sm border-b-[1px] border-[#C7CBD9] ${searchFranchiseData?.id === driver?.id? "bg-[#FFB27C] bg-opacity-15" : ""}`}
              >
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
                <td className="px-4 py-4 text-center text-orange-600">{driver.phone_number}</td>
                <td className="px-4 py-4 text-center text-orange-600">
                  <a href={`mailto:${driver.email}`} className="hover:underline">{driver.email}</a>
                </td>
                <td className="px-4 py-4 text-center">
                  <p className='text-orange-600'>
                    {driver.additional_details?.partners? driver.additional_details?.partners : 0}
                  </p>
                </td>
                <td className="px-4 py-4 text-center">
                  <button 
                    onClick={() => handlePartnerView(driver.id, driver.another_additional_details)}
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

                {/* franchise details */}
                <td className="px-2 pr-4 group py-4 text-orange-600 text-center">
                  <button
                    className='underline py-3 relative text-right'
                  >
                    <div className='w-full h-full bg-orange-600 bg-opacity-20 px-1 py-2 rounded-md'>
                      <BsThreeDotsVertical />
                    </div>

                    <div className='w-32 h-fit text-orange-600 border-[1px] border-orange-600 font-semibold backdrop-blur-lg absolute px-2 hidden group-hover:block bottom-[100%] right-0 rounded-2xl bg-white bg-opacity-50 shadow-2xl'>
                      <button 
                        onClick={() => handleFetchFranchise(driver.id)}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FranchiseTable;