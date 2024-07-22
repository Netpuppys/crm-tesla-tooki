import React from 'react';
import RedButton from '../../globalComponents/ui/RedButton';
import "../../styles/components/ContactUs/ContactUs.css"

const ContactUs = ({
  userName,
  setUserName,
  setUserEmail,
  commentText,
  setCommentText,
  userPhNumber,
  setUserPhNumber,
  handleSubmit,
  submitLoader
}) => {
    const email = "netpuppys@gmail.com"
    const phoneNumber = "+91 7678631922"
    
    const handleNameChange = (value) => {
    setUserName(value);
    };

    const handleEmailChange = (value) => {
    setUserEmail(value);
    };

    const handlePhNumberChange = (value) => {
    setUserPhNumber(value);
    };

    const handleCommentChange = (value) => {
    setCommentText(value);
    };

    return (
        <div className='contact-us-main-div'>

        <p className='page-title'>Contact Us</p>

        <div className='note'>
            You can contact us at <span>{email}</span>
            {" "}or{" "}
            <span>{phoneNumber}</span>
        </div>

        {/* <p className='request-call'>
            Request a Call back
        </p> */}

        <div className='contact-input-container'>
            <input
                className='contact-us-input'
                placeholder='Full Name *'
                value={userName}
                onChange={(e) => handleNameChange(e.target.value)}
                required
            />

            <input
                className='contact-us-input'
                type='email'
                placeholder='Email'
                onChange={(e) => handleEmailChange(e.target.value)}
                required
            />

            <input
                className='contact-us-input'
                placeholder='Phone Number *'
                value={userPhNumber}
                onChange={(e) => handlePhNumberChange(e.target.value)}
                required
            />
        </div>

        <p className='enter-comments-note'>
            Enter your comments
        </p>
        <textarea
            placeholder="Please enter your comments..."
            rows={5}
            maxLength={500}
            className='textarea'
            value={commentText}
            onChange={(e) => handleCommentChange(e.target.value)}
            required
        />

        <RedButton text={"Submit"} onClickHandler={handleSubmit} loading={submitLoader}/>

        </div>
    );
};

export default ContactUs;