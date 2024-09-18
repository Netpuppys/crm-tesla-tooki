import React, { useEffect, useState } from 'react'
import BarChartCard from './components/BarChartCard'
import LineChartCard from './components/LineChartCard'
import RatingsChartCard from './components/RatingsChartCard'
import MostActiveDriverCard from './components/MostActiveDriverCard'
import LocationServicesCard from './components/LocationServicesCard'
import axiosInstance from 'utils/AxiosInstance'
import "../../styles/components/analytics/Analytics.css"
import ErrorPage from 'globalComponents/ErrorPage/ErrorPage'

const Analytics = () => {
    const [ apiData, setApiData ] = useState()
    const [ error, setError ] = useState(false)

    useEffect(() => {
        axiosInstance
        .get("/analytics/data")
        .then(res => {
            const response = res.data.data;
            setApiData(response);
        })
        .catch(err => {
            setError(true);
            console.error("Error fetching data:", err);
        });
    }, []);

    if (error) {
        return <ErrorPage />;
    }

    // console.log(apiData && apiData['location-service'])

  return (
    <div className='analytics-main-div min-h-screen'>
        <div className='filter-div'>
            <button className='filter-btn'>
                By ID
            </button>
            <button className='filter-btn'>
                By Data
            </button>
        </div>

        <p className='page-heading'>Analytics</p>

        <div className='graph-grid-div'>
            <div className='bar-graph-card analylics-grid-padding'>
                <BarChartCard data={apiData && apiData.number_of_orders} />
            </div>

            <div className='line-graph-card analylics-grid-padding'>
                <LineChartCard data={apiData && apiData.number_of_orders}/>
            </div>

            <div className='bubble-graph-card analylics-grid-padding'>
                <RatingsChartCard />
            </div>

            <div className='active-driver-card analylics-grid-padding'>
                <MostActiveDriverCard serverData={apiData && apiData.most_active_driver} />
            </div>

            <div className='pie-chart-card analylics-grid-padding'>
                {apiData && <LocationServicesCard serverData={apiData && apiData['location-service']} />}
            </div>
        </div>
    </div>
  )
}

export default Analytics