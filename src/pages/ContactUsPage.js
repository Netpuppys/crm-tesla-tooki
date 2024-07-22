import React, { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom";
import ContactUs from '../components/ContactUs/ContactUs';
import { z } from 'zod';

// Define validation schema using zod
const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  number: z.number().min(10),
  message: z.string(),
});

const ContactUsPage = () => {
  // const navigate = useNavigate()
  const [ userName, setUserName] = useState("");
  const [ userEmail, setUserEmail] = useState("notProvided@email.com");
  const [ userPhNumber, setUserPhNumber] = useState("");
  const [ commentText, setCommentText] = useState("");
  const [ contactData, setContactData] = useState({});
  const [ validationError, setValidationError] = useState(null);
  const [ alertText, setAlertText ] = useState()
  const [ submitLoader, setSubmitLoader] = useState(false)
  const [ showPopUp, setShowPopUp ] = useState(false)

  useEffect(() => {
    if (validationError) {
      setAlertText(`Invalid ${validationError[0].path[0]}`)
    }
  }, [validationError])

  useEffect(() => {
    setContactData({
      name: userName,
      email: userEmail, 
      number: parseInt(userPhNumber, 0),
      message: commentText,
    });
  }, [userName, userEmail, userPhNumber, commentText])

  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth"
  //   })
  // }

  const handleSubmit = () => {
    // Validate contactData against the schema
    setSubmitLoader(true)
    try {
      contactSchema.parse(contactData);
      setValidationError(null); // Clear any previous validation errors
      // axiosInstance
      //   .post("contactus/", contactData)
      //   .then((res) => {
      //     scrollToTop()
      //     setSubmitLoader(false)
      //     setShowPopUp(true)
      //     // res.status === 201 && setAlertText("Sent Successfully")
      //   })
      //   .catch((error) => {
      //     scrollToTop()
      //     setSubmitLoader(false)
      //     console.log(error)
      //   });
    } catch (error) {
      setSubmitLoader(false)
      // Handle validation error
      setValidationError(error.errors);
    }
  }

  // const handlePopUp = () => {
  //   navigate("/home")
  // }

  return (
      <ContactUs
        userName={userName}
        setUserName={setUserName}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        userPhNumber={userPhNumber}
        setUserPhNumber={setUserPhNumber}
        commentText={commentText}
        setCommentText={setCommentText}
        contactData={contactData}
        setContactData={setContactData}
        handleSubmit={handleSubmit}
        validationError={validationError}
        submitLoader={submitLoader}
        alertText={alertText}
        showPopUp={showPopUp}
        setShowPopUp={setShowPopUp}
      />
  );
};

export default ContactUsPage;