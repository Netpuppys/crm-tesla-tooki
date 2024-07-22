import React from 'react'
import { FaArrowUp } from "react-icons/fa";
import { Bar } from 'react-chartjs-2';
// import deleteImg from "../../../assets/delete/barChart.png"
import "../../../styles/components/analytics/components/BarChartCard.css"

const BarChartCard = ({ data }) => {

    const dates = data?.map(item => item.date);
    const orders = data?.map(item => item.orders);

    const chartData = {
        labels: dates,
        datasets: [
          {
            label: 'Number of Orders',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: orders
          }
        ]
      };
    
      // Chart options
      const chartOptions = {
        title: {
          display: true,
          text: 'Number of Orders Over Time',
          fontSize: 20
        },
        legend: {
          display: true,
          position: 'top'
        }
      };

  return (
    <div className='bar-chart-card-main-div'>
        <button className='report-btn'>
            View Report
        </button>

        <div className='all-text-div'>
            <p className='main-title'>
                Number of Rides Booked
            </p>
            <p className='card-sub-title'>
                Lorem ipsum
            </p>
            <p className='percentage-text'>
                <FaArrowUp /> 2.1% <span>vs last week</span>
            </p>

            <p className='time-period-text'>
                Rides from 1-29 Feb, 2024
            </p>
        </div>

        <div className='chart-container'>
            {/* <img src={deleteImg} style={{ width: "100%" }} alt='remove' /> */}
            <Bar
                data={chartData}
                options={chartOptions}
                width={600}
                height={150}
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

export default BarChartCard