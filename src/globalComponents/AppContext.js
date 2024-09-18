import { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from 'utils/AxiosInstance';

const AppContext = createContext();

export const UserProvider = ({ children }) => {
  const logged = localStorage.getItem("logged")
  const [ name, setName] = useState('');
  const [ userId, setUserId ] = useState()
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ userData, setUserData ] = useState()

  const [ driverList, setDriverList ] = useState()
  const [ franchiseList, setFranchiseList ] = useState()
  const [ userList, setUserList ] = useState()
  const [ alert, setAlert ] = useState()

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(alert)
      setAlert(null);
    }, 5000);
  
    // Cleanup function to clear the timeout
    return () => clearTimeout(timer);
  }, [alert]);

  const fetchFranchise = () => {
    if (logged) {
      axiosInstance
      .get("all/show/franchise/")
      .then(res => {
          // console.log(res)
          setFranchiseList(res.data)
      })
      .catch(err => {
          console.log(err)
      })
    }
  }
  
  const fetchDrivers = () => {
    if(logged) {
      axiosInstance
      .get("all/show/driver/")
      .then(res => {
          // console.log(res)
          setDriverList(res.data)
      })
      .catch(err => {
          console.log(err)
      })
    }
  }

  const fetchUsers = () => {
    if (logged) {
    axiosInstance
      .get("all/show/consumer/")
      .then(res => {
          // console.log(res)
          setUserList(res.data)
      })
      .catch(err => {
          console.log(err)
      })
    }
  }

    useEffect(() => {
      fetchDrivers()
      fetchFranchise()
      fetchUsers()
    }, [logged])

  useEffect(() => {
    if (userId) {
        sessionStorage.setItem("userId", userId)
    }
  }, [userId])

  return (
    <AppContext.Provider
      value={{
        name,
        setName,
        userId,
        setUserId,
        loggedIn,
        setLoggedIn,
        userData,
        setUserData,
        driverList,
        setDriverList,
        franchiseList,
        setFranchiseList,
        userList,
        setUserList,
        alert,
        setAlert,
        fetchDrivers,
        fetchFranchise,
        fetchUsers
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useUserContext = () => useContext(AppContext);
