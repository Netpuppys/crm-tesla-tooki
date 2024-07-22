import React, { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom"
import Feedback from '../components/FeedBack/Feedback';
import { z } from 'zod';

// Define validation schema using zod
const contactSchema = z.object({
  full_name: z.string().min(1),
  email: z.string().email(),
  content_quality_rating: z.number(),
  ease_of_use_rating: z.number(),
  overall_experience_rating: z.number(),
  feedback_description: z.string(),
});


const FeedBackPage = () => {
  // const navigate = useNavigate()
  const [ userName, setUserName] = useState('');
  const [ userEmail, setUserEmail] = useState('notProvided@email.com');
  const [ contentQualityRating, setContentQualityRating ] = useState()
  const [ easeOfUseRating, setEaseUseRating ] = useState()
  const [ overallExperienceRating, setOverallExperienceRating ] = useState()
  const [ feedBackText, setFeedBackText] = useState('');
  const [ feedBack, setFeedBack ] = useState({})
  const [ feedBackData, setFeedBackData ] = useState()
  const [ validationError, setValidationError] = useState(null);
  const [ alertText, setAlertText ] = useState()
  const [ submitLoader, setSubmitLoader] = useState(false)

  useEffect(() => {
    if (validationError) {
      setAlertText(`Invalid ${validationError[0].path[0]}`)
    }
  }, [validationError])

  useEffect(() => {
    setFeedBackData({
      full_name: userName,
      email: userEmail,
      content_quality_rating: contentQualityRating,
      ease_of_use_rating: easeOfUseRating,
      overall_experience_rating: overallExperienceRating,
      feedback_description: feedBackText,
    });
  }, [ userName, userEmail, contentQualityRating, easeOfUseRating, overallExperienceRating, feedBackText ])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  const handleSubmit = () => {
    setSubmitLoader(true)
    try {
      contactSchema.parse(feedBackData);
      setValidationError(null); // Clear any previous validation errors
      // axiosInstance
      //   .post("contactus/feedback/", feedBackData)
      //   .then((res) => {
      //     scrollToTop()
      //     setSubmitLoader(false)
      //     setShowPopUp(true)
      //     // res.status === 200 && setAlertText("Sent Successfully")
      //   })
      //   .catch((error) => {
      //     scrollToTop()
      //     setSubmitLoader(false)
      //     console.log(error)
      //   });
      console.log(feedBackData)
      setSubmitLoader(false)
    } catch (error) {
      scrollToTop()
      setSubmitLoader(false)
      // Handle validation error
      setValidationError(error.errors);
    }
  }

  // const handlePopUp = () => {
  //   navigate("/home")
  // }

  return (
      <Feedback
        userName={userName}
        setUserName={setUserName}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        feedBackText={feedBackText}
        setFeedBackText={setFeedBackText}
        contentQualityRating={contentQualityRating}
        setContentQualityRating={setContentQualityRating}
        easeOfUseRating={easeOfUseRating}
        setEaseUseRating={setEaseUseRating}
        overallExperienceRating={overallExperienceRating}
        setOverallExperienceRating={setOverallExperienceRating}
        feedBack={feedBack}
        setFeedBack={setFeedBack}
        handleSubmit={handleSubmit}
        validationError={validationError}
        submitLoader={submitLoader}
        alertText={alertText}
      />
  );
};

export default FeedBackPage;
