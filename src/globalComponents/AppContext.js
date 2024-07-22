import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export const UserProvider = ({ children }) => {
  const [ name, setName] = useState('');
  const [ userId, setUserId ] = useState()
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ userData, setUserData ] = useState()

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
        setUserData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useUserContext = () => useContext(AppContext);
