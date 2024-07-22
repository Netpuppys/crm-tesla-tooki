import React from 'react'
// import { FaArrowUp } from "react-icons/fa";
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
// import deleteImg from "../../../assets/delete/chart.svg"
import "../../../styles/components/analytics/components/LocationServicesCard.css"

const LocationServicesCard = ({ serverData }) => {
    // Extracting data from props

    console.log(serverData)
  const { morning_count, afternoon_count, evening_count } = serverData;

  // Doughnut chart data
  const chartData = {
    labels: ['Morning', 'Afternoon', 'Evening'],
    datasets: [
      {
        data: [morning_count, afternoon_count, evening_count],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // This will allow you to set your own width and height
    width: 350, // Change the width as needed
    // height: 350, // Change the height as needed
  };


  return (
    <div className='location-card-main-div'>
        <button className='report-btn'>
            View Report
        </button>

        <div className='all-text-div'>
            <p className='main-title'>
                Location Services
            </p>
            {/* <p className='card-sub-title'>
                Lorem ipsum
            </p>
            <p className='percentage-text'>
                <FaArrowUp /> 2.1% <span>vs last week</span>
            </p> */}

            <p className='time-period-text'>
                Rides from 1-29 Feb, 2024
            </p>
        </div>

        <div className='chart-container'>
            {/* <img src={deleteImg} style={{ width: "50%" }} alt='remove' /> */}
            <Doughnut 
                data={chartData} 
                options={chartOptions} 
            />
        </div>

        {/* <div className='chart-indicators'>
            <div className='indicator-div'>
                <div style={{ backgroundColor: "#5ACF65" }} className='indicator'></div>
                <p className='indicator-label'>Last 15 days</p>
            </div>

            <div className='indicator-div'>
                <div style={{ backgroundColor: "#D8D9DB" }} className='indicator'></div>
                <p className='indicator-label'>Last 15 days</p>
            </div>
        </div> */}
    </div>
  )
}

export default LocationServicesCard