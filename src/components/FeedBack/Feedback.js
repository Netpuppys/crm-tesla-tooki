import React from 'react';
import RedButton from '../../globalComponents/ui/RedButton';
import starEmpty from "../../assets/ui/StarEmpty.png"
import starFilled from "../../assets/ui/StarFilled.png"
import "../../styles/components/FeedBack/Feedback.css"

const Feedback = ({
  userName,
  setUserName,
  // userEmail,
  setUserEmail,
  contentQualityRating,
  setContentQualityRating,
  easeOfUseRating,
  setEaseUseRating,
  overallExperienceRating,
  setOverallExperienceRating,
  feedBackText,
  setFeedBackText,
  handleSubmit,
  submitLoader
}) => {
    const starIdArray = [ 1, 2, 3, 4, 5 ]
    
      const handleNameChange = (value) => {
        setUserName(value);
      };
    
      const handleEmailChange = (value) => {
        setUserEmail(value);
      };
    
      const handleFeedbackChange = (value) => {
        setFeedBackText(value);
      };

  return (
    <div className='feedback-main-div'>
      <p className='page-title'>Feedback</p>
      <div className='note'>
        Please take a few minutes to share your feedback with us
      </div>

      <div className='input-row'>
        <input
          className='feedback-input'
          placeholder='Full Name *'
          value={userName}
          onChange={(e) => handleNameChange(e.target.value)}
        />

        <input
          className='feedback-input'
          type='email'
          placeholder='Email'
          // value={}
          onChange={(e) => handleEmailChange(e.target.value)}
        />
      </div>

      <div className='feedback-stars-container'>
        <div className='feedback-star-div'>
          <p className='label'>Content Quality Rating *</p>
          <div className='stars-container'>
          {starIdArray.map((item, id) => (
              <img 
                  key={id}
                  src={(id < contentQualityRating)? starFilled : starEmpty}
                  className='star-icon'
                  alt='star'
                  onClick={() => setContentQualityRating(item)}
              />
          ))}
          </div>
        </div>

        <div className='feedback-star-div'>
          <p className='label'>Ease of Use Rating *</p>
          <div className='stars-container'>
          {starIdArray.map((item, id) => (
              <img 
                  key={id}
                  src={(id < easeOfUseRating)? starFilled : starEmpty}
                  className='star-icon'
                  alt='star'
                  onClick={() => setEaseUseRating(item)}
              />
          ))}
          </div>
        </div>

        <div className='feedback-star-div'>
          <p className='label'>Overall Experience Rating *</p>
          <div className='stars-container'>
          {starIdArray.map((item, id) => (
              <img 
                  key={id}
                  src={(id < overallExperienceRating)? starFilled : starEmpty}
                  className='star-icon'
                  alt='star'
                  onClick={() => setOverallExperienceRating(item)}
              />
          ))}
          </div>
        </div>
      </div>

      <p className='label'>
        Any other feedback you would like to share with us
      </p>
      <textarea
        placeholder='Please Write Here...'
        rows={5}
        className='textarea'
        value={feedBackText}
        onChange={(e) => handleFeedbackChange(e.target.value)}
      />

      <RedButton text={"Submit"} onClickHandler={handleSubmit} loading={submitLoader}/>

    </div>
  );
};

export default Feedback;