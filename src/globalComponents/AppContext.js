import { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from 'utils/AxiosInstance';

const AppContext = createContext();

export const UserProvider = ({ children }) => {
  const logged = sessionStorage.getItem("logged")
  const [ name, setName] = useState('');
  const [ userId, setUserId ] = useState()
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ userData, setUserData ] = useState()

  const [ driverList, setDriverList ] = useState()
  const [ franchiseList, setFranchiseList ] = useState()
  const [ userList, setUserList ] = useState()

    useEffect(() => {
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

          axiosInstance
          .get("all/show/franchise/")
          .then(res => {
              // console.log(res)
              setFranchiseList(res.data)
          })
          .catch(err => {
              console.log(err)
          })

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
        franchiseList,
        userList
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useUserContext = () => useContext(AppContext);
