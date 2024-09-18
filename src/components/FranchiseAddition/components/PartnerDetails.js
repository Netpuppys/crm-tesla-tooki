import React, { useState } from 'react';
import axiosInstance from 'utils/AxiosInstance';
import { useUserContext } from 'globalComponents/AppContext';
import { ThreeDots } from 'react-loader-spinner';

const PartnerDetails = ({ franchiseId, setFranchiseId, setPartnersDetails, partnersDetails }) => {
  const { setAlert, fetchFranchise } = useUserContext()

  const [ editable, setEditable ] = useState(false)
  const [ loader, setLoader ] = useState(false)
  const [ changedDetails, setChangedDetails ] = useState(partnersDetails)

  const totalPercentage = (data) => { 
    const total = data.reduce((sum, item) => sum + parseFloat(item.percentage), 0);

    return total
  }

  const handleEdit = () => {
    setEditable(prev => !prev)
    setChangedDetails(partnersDetails)
  }

  const handleSubmit = () => {
    if (totalPercentage(changedDetails) !== 15) {
      setAlert("Total share of a franchise should be 15%")
      return
    }

    setLoader(true)

    axiosInstance
      .patch(`https://tooki.repsoft.in/all/editfranchisedetail/${franchiseId}/editpartner/`, changedDetails)
      .then(res => {
        console.log(res)
        fetchFranchise()
        setAlert("Changed successfully")
        // setEditable(prev => !prev)
        setPartnersDetails(changedDetails)
      })
      .catch(err => {
        console.error(err)
        setAlert("Something went wrong")
      })
      .finally(() => {
        setLoader(false)
      })
  }

  const handleClose = () => {
    setPartnersDetails(null)
    setFranchiseId(null)
  }

  return (
    <div className='w-full backdrop-blur-md bg-orange-500 bg-opacity-15 border-2 border-orange-600 z-50 max-w-[40rem] p-6 pt-2 flex items-center justify-start flex-col rounded-3xl shadow-2xl relative'>
        <div className='w-full flex items-center h-14 justify-between'>
          <button
                onClick={handleEdit}
                style={editable ? { border: "1px solid", background: "#ffffff" } : {}}
                className='text-orange-600 text-sm w-16 py-1 border-orange-600 rounded-full bg-white bg-opacity-50'
            >
                Edit
            </button>
            <p className='text-3xl pt-3 text-orange-600 supermercado'>
                Partner Details
            </p>
            <button
                onClick={handleClose}
                className='text-orange-600 w-16 text-right underline'
            >
                close
            </button>
        </div>

        <div className={`w-full ${editable? "pt-3" : "pt-12"}`}>
        {editable &&
        <div className='mb-2 w-full flex items-center justify-end'>
          <p 
            className={`${(totalPercentage(changedDetails) === 15)? "bg-green-600" : "bg-red-600"} text-nowrap bg-opacity-80 w-56 font-medium text-white h-7 flex items-center justify-center text-sm rounded-full px-6`}
          >
            Total Percentage:{" "}
            <span className=''>
              {totalPercentage(changedDetails)}%
            </span>
          </p>
        </div>}

        {changedDetails.map((item, index) => (
        <div className='w-full flex py-2  items-center border-b-2 last:border-b-0 border-black border-opacity-15 justify-between'>
            <p className='text-lg text-[#525252]'>
                Partner {index+1}:
            </p>
            <div className='w-fit flex items-center justify-center gap-3'>
              <input
                type='text'
                disabled={(!editable && !loader)? true : false}
                className='disabled:bg-transparent text-right rounded-full disabled:px-0 focus:outline-none w-60 py-1 px-3 bg-white bg-opacity-50 text-nowrap capitalize'
                value={item.name}
                onChange={e => setChangedDetails(prev => 
                  prev.map((partner, i) => {
                    if (i === index) {
                      // Update the specific object at the given index
                      return {
                        ...partner,
                        name: e.target.value
                      };
                    }
                    return partner; // Unchanged partner
                  })
                )}
              />
              <p className='px-2 text-nowrap bg-orange-600 bg-opacity-50 backdrop-blur-sm text-white rounded-full w-fit py-1 text-xs font-medium'>
                Share:{" "}
                {editable? 
                <input 
                  type='number'
                  disabled={(!editable && !loader)? true : false}
                  className='disabled:bg-transparent text-black rounded-full disabled:px-0 focus:outline-none w-16 disabled:w-10 py-1 text-center disabled:text-right bg-white bg-opacity-50 text-nowrap'
                  value={item.percentage}
                  onChange={e => setChangedDetails(prev => 
                    prev.map((partner, i) => {
                      if (i === index) {
                        // Update the specific object at the given index
                        return {
                          ...partner,
                          percentage: e.target.value
                        };
                      }
                      return partner; // Unchanged partner
                    })
                  )}
                  step={0.1}
                /> :
                <span>{item.percentage}</span>}{" "}%
              </p>
            </div>
        </div>))}

        {editable &&
        <div className='w-full flex items-center justify-center pt-6 relative'>
          <button
            onClick={handleSubmit}
            className='h-8 px-8 bg-green-600 rounded-full text-white font-medium'
          >
            {loader? <ThreeDots color='#fff' height={"16px"} /> : "Save"}
          </button>
        </div>}
        </div>
    </div>
  )
}

export default PartnerDetails