import { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import { Route, Routes, Link } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import './App.css';

function App() {
  const authContext = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const userId = window.localStorage.getItem("userId")
    const token = window.localStorage.getItem("token")
    if(userId && token) {
        authContext.setAuth({userId, token})
    }
    setIsLoading(!isLoading)
  }, [])
  return (
  <>
    {
      (isLoading) 
        ? null
        : 
      <Routes>
        <Route element={<PrivateRoutes />}>
        <Route path="/" element={<UserDashboard />} exact/>
        </Route>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage />}/>
      </Routes>
    }
    
  </>)
}

export default App;
