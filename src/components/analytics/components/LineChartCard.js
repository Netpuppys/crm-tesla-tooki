import React, { useEffect, useState } from 'react'
import { FaArrowUp } from "react-icons/fa";
import { LineChart, Line, ResponsiveContainer } from 'recharts';
// import deleteImg from "../../../assets/delete/lineGraphPlaceholder.png"
import "../../../styles/components/analytics/components/LineChartCard.css"

const LineChartCard = ({ data }) => {
    const [ totalOrders, setTotalOrder ] = useState(0)
    const [ loading, setLoading ] = useState(false)

    const processData = (data) => {
        if (data) {
            return data.map(entry => {
                return {
                    name: entry.date,
                    // pv: Math.floor(Math.random() * (51)) + 50,
                    pv: entry.orders
                };
            });
        }
    };

    useEffect(() => {
        if (data && data.length > 0 && !loading) {
            data.forEach(order => {
                setTotalOrder(prev => prev + order.orders)
                console.log((order.orders !== 0) && order)
            });
            setLoading(true)
        }
    }, [data, loading])
    
    const transformedData = processData(data)

  return (
    <div className='line-chart-card-main-div'>
        <button className='report-btn'>
            View Report
        </button>

        <div className='all-text-div'>
            <p className='main-title'>
                Number of Orders
            </p>
            <p className='card-sub-title'>
                {totalOrders}
            </p>
            <p className='percentage-text'>
                <FaArrowUp /> 2.1% <span>vs last week</span>
            </p>

            <p className='time-period-text'>
                Sales from {data && data[0].date} to {data && data[data.length - 1].date}
            </p>
        </div>

        <div className='chart-container'>
            {/* <img src={deleteImg} style={{ width: "100%" }} alt='remove' /> */}
            <ResponsiveContainer width="100%" height="100%">
                <LineChart width={300} height={100} data={transformedData}>
                <Line type="monotone" dataKey="pv" stroke="#5ACF66" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>

        <div className='chart-indicators'>
            <div className='indicator-div'>
                <div style={{ backgroundColor: "#5ACF65" }} className='indicator'></div>
                <p className='indicator-label'>Last 15 days</p>
            </div>

            <div className='indicator-div'>
                <div style={{ backgroundColor: "#D8D9DB" }} className='indicator'></div>
                <p className='indicator-label'>Last 15 days</p>
            </div>
        </div>
    </div>
  )
}

export default LineChartCard