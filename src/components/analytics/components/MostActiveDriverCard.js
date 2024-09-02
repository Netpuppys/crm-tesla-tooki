import React from 'react'
import profileAvatar from "../../../assets/placeholders/profile-avatar.png"
import "../../../styles/components/analytics/components/MostActiveDriverCard.css"

// const driverData = [
//     { name: "vijay kumar", noOfRides: 45 },
//     { name: "vijay kumar", noOfRides: 45 },
//     { name: "vijay kumar", noOfRides: 45 },
//     { name: "vijay kumar", noOfRides: 45 },
//     { name: "vijay kumar", noOfRides: 45 },
//     { name: "vijay kumar", noOfRides: 45 },
//     { name: "vijay kumar", noOfRides: 45 },
//     { name: "vijay kumar", noOfRides: 45 },
//     { name: "vijay kumar", noOfRides: 45 },
//     { name: "vijay kumar", noOfRides: 45 },
//     { name: "vijay kumar", noOfRides: 45 },
//     { name: "vijay kumar", noOfRides: 45 },
//     { name: "vijay kumar", noOfRides: 45 },
// ]

const MostActiveDriverCard = ({ serverData }) => {
  return (
    <div className='active-driver-card-main-div'>

        <div className='all-text-div'>
            <p className='main-title'>
                Ratings
            </p>

            <p className='percentage-text'>
                {/* <span>Lorem ipsum dolor sit amet, consectetur</span> */}
            </p>
        </div>

        <div className='table-container'>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>No of Rides</th>
                    </tr>
                </thead>
                <tbody>
                    {serverData?.map((driver, index) => (
                        <tr key={index}>
                            <td className='table-data-profile'>
                                <img 
                                    src={profileAvatar} 
                                    className='profile-avatar' 
                                    alt={driver.driver_name}
                                />
                                {driver.driver_name}
                            </td>
                            <td>{driver.orders}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default MostActiveDriverCard