import React from 'react'
import deleteImg from "../../../assets/delete/ratingChart.png"
import "../../../styles/components/analytics/components/RatingsChartCard.css"

const RatingsChartCard = () => {
  return (
    <div className='rating-card-main-div'>

        <div className='all-text-div'>
            <p className='main-title'>
                Ratings
            </p>

            <p className='percentage-text'>
                <span>Lorem ipsum dolor sit amet, consectetur</span>
            </p>
        </div>

        <div className='chart-container'>
            <img src={deleteImg} style={{ width: "100%" }} alt='remove' />
        </div>
    </div>
  )
}

export default RatingsChartCard