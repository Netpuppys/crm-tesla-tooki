import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import profilePlaceholder from "../../assets/placeholders/profile-placeholder.svg"
import { IoWallet } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { useUserContext } from 'globalComponents/AppContext';
import "../../styles/globalComponents/NavBar.css"
import UserSearchWindow from 'components/userSearchWindow/UserSearchWindow';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ userData }) => {
    const navigate = useNavigate()

    const { userList, driverList, franchiseList } = useUserContext()

    const [ searchItems, setSearchItems ] = useState([])
    const [ searchInput, setSearchInput ] = useState("")
    const [ selectUserData, setSelectUserData ] = useState()

    useEffect(() => {
        if (searchInput) {

            let filteredUsers = userList.filter(item =>
                item.first_name?.toLowerCase().startsWith(searchInput.toLowerCase())
            );
        
            let filteredDrivers = driverList.filter(item =>
                item.first_name?.toLowerCase().startsWith(searchInput.toLowerCase())
            );
        
            let filteredFranchises = franchiseList.filter(item =>
                item.first_name?.toLowerCase().startsWith(searchInput.toLowerCase())
            );

            const items = [ ...filteredUsers, ...filteredDrivers, ...filteredFranchises]

            console.log(items)
        
            setSearchItems(items);
        } else {
            setSearchItems([]); // Clear results when searchInput is empty
        }
    }, [searchInput, franchiseList, userList, driverList]);

    const handleSearchClick = (data) => {
        setSearchInput("")
        navigate("/search", { state: { userData: data } })
    }

  return (
    <div className='navbar-main-div'>

        {selectUserData && 
        <UserSearchWindow
            userData={selectUserData}
        />}

        <div className={`searchbar-div relative rounded-md ${searchInput? "rounded-b-none border border-b-0 border-black border-opacity-20 shadow-sm" : ""}`}>
            <input
                type='text'
                placeholder='Search'
                className='search-input-navbar'
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
            />
            <p className='search-icon'>
                <IoIosSearch />
            </p>

            {searchInput &&
            <div className='min-h-8 w-[calc(100%+2px)] absolute border border-t-0 border-black border-opacity-20 top-full left-1/2 -translate-x-1/2 rounded-b-md bg-white z-50'>
                {searchItems.map((item, index) => (
                    <div onClick={() => handleSearchClick(item)} key={index} className='w-full cursor-pointer hover:bg-black hover:bg-opacity-5 text-left px-4 h-10 flex items-center justify-start relative border-b last:border-b-0 border-gray-600 border-opacity-20'>
                        {item.first_name + " " + item.last_name}

                        <div className='absolute top-1/2 px-4 right-2 flex items-center justify-center rounded-full bg-orange-600 bg-opacity-65 h-6 text-xs -translate-y-1/2'>
                            {item.user_type}
                        </div>
                    </div>
                ))}
            </div>}
        </div>
        <div className='navbar-user-details'>
            <div className='user-profile'>
                <img 
                    src={profilePlaceholder}
                    className='profile-image'
                    alt='user profile'
                />
                <p className='profile-name text-nowrap'>
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