import React, { useEffect, useState } from 'react';
// import userData from 'userDummyData';
import { IoSettings } from "react-icons/io5";
import profileplaceholder from "../../../assets/placeholders/profile-placeholder.svg"
import AccessTags from './AccessTags';
import "../../../styles/components/AdminManagement/UserTable.css"

const UserTable = ({ userList }) => {
    console.log(userList)
    const [totalUsers, setTotalUsers] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentUsers, setCurrentUsers] = useState()
    const usersPerPage = 10;

    useEffect(() => {
        if (userList) {
            setTotalUsers(userList.length);
        }
    }, [userList]);

    // Calculate the range of users to display
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    // const currentUsers = userList.length > usersPerPage? userList.slice(indexOfFirstUser, indexOfLastUser) : userList;

    useEffect(() => {
        if (userList.length > usersPerPage)
        setCurrentUsers(userList.slice(indexOfFirstUser, indexOfLastUser))
        else if (userList.length < usersPerPage || userList.length === usersPerPage) {
            setCurrentUsers(userList)
        }
    }, [userList, indexOfFirstUser, indexOfLastUser])

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='main-user-table-div'>
            <div className='table-head table-row'>
                <div className='table-column column-left'>
                    <p className='t-head-title'>Name</p>
                </div>
                <div className='table-column column-mid'>
                    <p className='t-head-title'>Access</p>
                </div>
                <div className='table-column column-right'>
                    <p className='t-head-title'>Actions</p>
                </div>
            </div>

            <div className='table-banner'>
                Showing {Math.min(indexOfLastUser, totalUsers)} of {totalUsers} users
            </div>

            {/* Render user data */}
            {currentUsers && currentUsers.map((user, index) => (
              <div key={index} className='table-row table-body'>
                  <div className='table-column user-info column-left'>
                      <img src={user.profile_photo || profileplaceholder} className='profile-photo' alt='hello' />
                      <p className='user-name'>{user.first_name + " " + user.last_name}</p>
                  </div>
                  <div className='table-column access-tags-column column-mid'>
                        <AccessTags accessId={3} />
                        {user.rights?.map((item) => <AccessTags accessId={item} /> )}
                  </div>
                  <div className='table-column actions-column column-right'>
                      <button className='modify-btn'>
                          <IoSettings /> Modify
                      </button>
                      <button className='toggle-user'>
                          <span className={"active-toggle"}></span>
                          {/* <span className={active && "active-toggle"}></span> */}
                      </button>
                  </div>
              </div>
            ))}

            {/* Pagination */}
            <div className='pagination'>
                {Array.from({ length: Math.ceil(totalUsers / usersPerPage) }).map((_, index) => (
                    <button className='pagination-btn' key={index} onClick={() => handlePagination(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UserTable;
