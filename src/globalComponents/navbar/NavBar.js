import React from 'react'
import { IoIosSearch } from "react-icons/io";
import profilePlaceholder from "../../assets/placeholders/profile-placeholder.svg"
import { IoWallet } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import "../../styles/globalComponents/NavBar.css"

const NavBar = ({ userData }) => {

  return (
    <div className='navbar-main-div'>
        <div className='searchbar-div'>
            <input
                type='text'
                placeholder='Search'
                className='search-input-navbar'
            />
            <p className='search-icon'>
                <IoIosSearch />
            </p>
        </div>
        <div className='navbar-user-details'>
            <div className='user-profile'>
                <img 
                    src={profilePlaceholder}
                    className='profile-image'
                    alt='user profile'
                />
                <p className='profile-name'>
                    {userData?.first_name + " " + userData?.last_name}
                </p>
            </div>

            <div className='navbar-extra-icon'>
                <IoWallet />
            </div>

            <div className='navbar-extra-icon'>
                <FaBell />
            </div>
        </div>
    </div>
  )
}

export default NavBar