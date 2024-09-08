import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SideBar from './globalComponents/SideBar/SideBar';
import AnalyticsPage from './pages/AnalyticsPage';
import NavBar from './globalComponents/navbar/NavBar';
import AdminManagementPage from 'pages/AdminManagementPage';
import ContactUsPage from 'pages/ContactUsPage';
import FeedBackPage from 'pages/FeedBackPage';
import CommunitiesPage from 'pages/CommunitiesPage';
import CreateNewAdmin from 'components/AdminManagement/CreateNewAdmin';
import { useState } from 'react';
import DriverAdditionPage from 'pages/DriverAdditionPage';
import LoginPage from 'pages/LoginPage';
import { UserProvider } from 'globalComponents/AppContext';
import FranchiseAdditionPage from 'pages/FranchiseAdditionPage';
import DriverAddition from 'components/DriverAddition/DriverAddition';
import FranchiseList from 'components/FranchiseAddition/FranchiseList';
import UserListPage from 'components/User/UserListPage';

function App() {
  // const loggedIn = sessionStorage.getItem("logged")
  const [ loggedIn, setLoggedIn ] = useState(sessionStorage.getItem("logged")) 
  const [ userData, setUserData ] = useState(JSON.parse(sessionStorage.getItem("userData")))

  // useEffect(() => {
  //   const dummyUserLogin = {
  //     email: "shawmishra1122@gmail.com",
  //     password: "smsmsmsm",
  //     login_type: "consumer"
  //   }

  //   axiosInstance
  //     .post("/login", dummyUserLogin)
  //     .then(res => {
  //       const response = res.data.data
  //       setUserData(response.user)
  //       localStorage.setItem("access", response.access)
  //       localStorage.setItem("refresh", response.refresh)
  //       setLoggedIn(true)
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  // }, [])

  return (
    <div className="App">
      <UserProvider>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/login' element={<LoginPage setLoggedIn={setLoggedIn} setUserData={setUserData} />} />
          {!loggedIn && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>

          {loggedIn &&
          <div className='main-app-container'>
            <div className='sidebar-app-container'>
              <SideBar />
            </div>

            <div className='main-app-left'>
              <div className='navbar-app-container'>
                <NavBar userData={userData} />
              </div>

              <div className='main-app-pages'>
                <Routes>
                  <Route path='/' element={<Navigate to="/login" />} />
                  <Route path='/contact-us' element={<ContactUsPage />} />
                  <Route path='/feedback' element={<FeedBackPage />} />
                  <Route path='/analytics' element={<AnalyticsPage />} /> 
                  <Route path='/Driver-addition' element={<DriverAddition />} /> 
                  <Route path='/driver-list' element={<DriverAdditionPage />} /> 
                  <Route path='/franchise-list' element={<FranchiseList />} /> 
                  <Route path='/user-list' element={<UserListPage />} /> 
                  <Route path='/admin-management' element={<AdminManagementPage />} /> 
                  <Route path='/admin-management/create' element={<CreateNewAdmin />} /> 
                  <Route path='/communities' element={<CommunitiesPage />} /> 
                  <Route path='/franchise-addition' element={<FranchiseAdditionPage />} /> 
                </Routes>
              </div>

            </div>
          </div>}
      </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;