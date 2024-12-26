import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import profilePlaceholder from "../../assets/placeholders/profile-placeholder.svg"
import { IoClose, IoWallet } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { useUserContext } from 'globalComponents/AppContext';
import "../../styles/globalComponents/NavBar.css"
import { useNavigate } from 'react-router-dom';

const NavBar = ({ userData }) => {
    const navigate = useNavigate()

    const { userList, driverList, franchiseList } = useUserContext()

    const [ searchItems, setSearchItems ] = useState([])
    const [ searchInput, setSearchInput ] = useState("")
    const [ searchDropDown, setSearchDropDown ] = useState(false)

    useEffect(() => {
        if (searchInput) {
            const searchTerm = searchInput.toLowerCase();
    
            const filterBySearchTerm = (list) =>
                list?.filter(item =>
                    item?.first_name?.toLowerCase().startsWith(searchTerm) ||
                    item?.email?.toLowerCase().includes(searchTerm) ||
                    item?.phone_number?.toLowerCase().includes(searchTerm)
                );
    
            const filteredUsers = userList && userList.length>0 && filterBySearchTerm(userList) || [];
            const filteredDrivers = driverList && driverList.length>0 && filterBySearchTerm(driverList) || [];
            const filteredFranchises = franchiseList && franchiseList.length>0 && filterBySearchTerm(franchiseList) || [];
    
            const items = [...filteredUsers, ...filteredDrivers, ...filteredFranchises];
    
            setSearchItems(items);
        } else {
            setSearchItems([]); // Clear results when searchInput is empty
        }
    }, [searchInput, franchiseList, userList, driverList]);    

    const handleSearchClick = (data) => {
        const userType = data.user_type;

        setSearchInput(data?.first_name + " " + data?.last_name)
        if (userType==="consumer") {
            navigate("/user-list", { state: { userData: data } })
        } else if (userType==="franchise") {
            navigate("/franchise-list", { state: { userData: data } })
        } else if (userType==="driver") {
            navigate("/driver-list", { state: { userData: data } })
        }
        setSearchDropDown(false)
    }

  return (
    <div className='navbar-main-div'>

        {/* {selectUserData && 
        <UserSearchWindow
            userData={selectUserData}
        />} */}

        <div className={`searchbar-div relative rounded-md ${(searchInput && searchDropDown)? "rounded-b-none border border-b-0 border-black border-opacity-20 shadow-sm" : ""}`}>
            <input
                type='text'
                placeholder='Search'
                className='search-input-navbar capitalize'
                value={searchInput}
                onClick={() => setSearchDropDown(true)}
                onChange={e => setSearchInput(e.target.value)}
            />
            {searchInput? 
            <button 
                onClick={() => { setSearchDropDown(false); setSearchInput("")}}
                className='search-icon'
            >
                <IoClose />
            </button> :
            <p className='search-icon'>
                <IoIosSearch />
            </p>}

            {searchInput && searchDropDown &&
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