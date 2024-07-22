import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom"
import { IoClose } from "react-icons/io5";
import RedButton from 'globalComponents/ui/RedButton';
// import userData from 'userDummyData';
import "../../styles/components/Communities/Communities.css"
import axiosInstance from 'utils/AxiosInstance';

const CreateNewAdmin = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [newAdmin, setNewAdmin] = useState({ firstName: "", lastName: "", email: "", mobile: "" });
    const [selectedUser, setSelectedUser] = useState("");
    const [ userList , setUserList ] = useState()

    useEffect(() => {
        const userData = location.state
        console.log(userData)

        if (userData) { 
            setUserList(userData)
        }
    }, [location])

    useEffect(() => {
        console.log(newAdmin);
    }, [newAdmin]);

    const handleInputChange = (value, keyName) => {
        setNewAdmin(prev => ({
            ...prev,
            [keyName]: value,
        }));
    };

    const handleSelectChange = (event) => {
        setSelectedUser(event.target.value);
        console.log(event.target.value)
    };

    const handleSubmit = () => {
        if (selectedUser) {
            console.log(selectedUser)

            axiosInstance
                .patch(`/account/users/${selectedUser}`, { role: "admin" })
                .then(res => console.log(res))
                .catch(err => console.log(err))

            return
        } else if (!selectedUser && newAdmin) {
            console.log(newAdmin)

            const postData = {
                first_name: newAdmin.firstName,
                last_name: newAdmin.lastName,
                email: newAdmin.email,
                phone_number: newAdmin.mobile
            }

            axiosInstance
                .post(`account/createUser/`, postData)
                .then(res => console.log(res))
                .catch(err => console.log(err))

            return
        }
    }

    return (
        <div className='communities-main-div'>
            <p className='page-title'>Admin Management</p>
            <p className='sub-title'>Create New Admin</p>

            <button 
                onClick={() => navigate("/admin-management")} 
                className='close-btn'
            >
                Close <IoClose />
            </button>

            <div className='communities-inputs-container'>
                <div className='new-community-form'>
                    <input
                        type='text'
                        placeholder='First Name'
                        className='community-input'
                        value={newAdmin.firstName}
                        onChange={e => handleInputChange(e.target.value, "firstName")}
                    />
                    <input
                        type='text'
                        placeholder='Last Name'
                        className='community-input'
                        value={newAdmin.lastName}
                        onChange={e => handleInputChange(e.target.value, "lastName")}
                    />
                    <input
                        type='email'
                        placeholder='Email ID'
                        className='community-input email-input'
                        value={newAdmin.email}
                        onChange={e => handleInputChange(e.target.value, "email")}
                    />
                    <input
                        type='number'
                        placeholder='Mobile Number'
                        className='community-input'
                        value={newAdmin.mobile}
                        onChange={e => handleInputChange(e.target.value, "mobile")}
                    />
                </div>

                <div className='or-divider'>
                    <div className='divider'></div>
                    <p className='or-text'>OR</p>
                    <div className='divider'></div>
                </div>

                <div className='select-community-div'>
                    <select 
                        value={selectedUser.id} 
                        onChange={e => handleSelectChange(e)}
                    >
                        <option value="">Select a community</option>
                        {userList && userList.map((user, index) => (
                            <option 
                                key={index} 
                                value={user.id}
                            >
                                {user.first_name + " " + user.last_name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <RedButton text={"Submit"} onClickHandler={handleSubmit}/>
        </div>
    );
};

export default CreateNewAdmin;
