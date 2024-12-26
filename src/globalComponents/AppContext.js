import { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from 'utils/AxiosInstance';

const AppContext = createContext();

export const UserProvider = ({ children }) => {
  const logged = localStorage.getItem("logged")
  const [ name, setName] = useState('');
  const [ userId, setUserId ] = useState()
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ userData, setUserData ] = useState()
  const [ stateList, setStateList ] = useState([])
  const [ citiesList, setCitiesList ] = useState([])
  const [ driverList, setDriverList ] = useState()
  const [ franchiseList, setFranchiseList ] = useState()
  const [ communitiesList, setCommunitiesList ] = useState()
  const [ userList, setUserList ] = useState()
  const [ alert, setAlert ] = useState()

  const vehicleTypes = [
    '2 wheeler 20kg',
    '3 wheeler 500kg',
    'Eeco 500kg',
    'Pickup 8ft 1000kg',
    'Tata Ace 750kg',
    'Pickup 8ft 1250kg',
    'Pickup 9ft 1700kg',
    'Tata 407 2500kg',
    'Pickup 14ft 3500kg',
    'Canter 14ft 3500kg'
  ];
  
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

  const fetchCommunities = () => {
    if (logged) {
      axiosInstance
        .get("all/labourcommunity/")
        .then(res => {
            setCommunitiesList(res.data)
        })
        .catch(err => {
            console.error(err)
        })
    }
  }

  useEffect(() => {
    fetchDrivers()
    fetchFranchise()
    fetchUsers()
    fetchCommunities()
  }, [logged])

  useEffect(() => {
    if (userId) {
        sessionStorage.setItem("userId", userId)
    }
  }, [userId])

  const fetchStateAndCity = () => {
    if (!logged) {
      return
    }


    axiosInstance
      .get("all/states/")
      .then(res => {
        setStateList(res.data)
      })
      .catch((err) => console.error(err))

    axiosInstance
      .get("all/cities/")
      .then(res => {
        setCitiesList(res.data)
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    fetchStateAndCity()
  }, [logged])

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
        communitiesList,
        userList,
        setUserList,
        alert,
        setAlert,
        citiesList,
        stateList,
        vehicleTypes,
        fetchDrivers,
        fetchFranchise,
        fetchUsers,
        fetchCommunities,
        fetchStateAndCity
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useUserContext = () => useContext(AppContext);
