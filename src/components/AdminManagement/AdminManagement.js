import React, { useEffect, useState } from 'react'
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom"
import UserTable from './components/UserTable';
import "../../styles/components/AdminManagement/AdminManagement.css"
import axiosInstance from 'utils/AxiosInstance';

const AdminManagement = () => {
    const navigate = useNavigate()
    const [ userList, setUserList ] = useState()

    useEffect(() => {
        console.log(userList)
    }, [userList])

    useEffect(() => {
        axiosInstance
            .get("/account/users/")
            .then(res => {
                console.log(res)
                const response = res.data.data
                const adminList = response.filter(user => user.user_type === "admin")
                setUserList(adminList)
            })
            .catch(err => {
                console.error(err)
                alert("something went wrong, please refresh")
            })
    }, [])

    const handleCreateAdmin = () => {
        if (userList) {
            navigate("/admin-management/create", { state: userList })
        }
    }

  return (
    <div className='admin-management-main-div'>
        <div className='page-title'>
            Admin Management
        </div>

        <div className='filters-container'>
            <button className='sort-btn'>
                Sort By Access
            </button>
            <button className='sort-btn'>
                New - Old
            </button>
            <button className='filter-btn'>
                Filter
            </button>
            <button onClick={handleCreateAdmin} className='filter-btn create-admin-btn'>
                Create New Admin <GoPlus />
            </button>
        </div>
        
        <div className='table-container'>
            {userList && <UserTable userList={userList}/>}
        </div>

    </div>
  )
}

export default AdminManagement