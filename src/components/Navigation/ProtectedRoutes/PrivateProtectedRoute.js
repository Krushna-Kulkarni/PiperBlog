import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

// Nested Protected Route
// const  PrivateProtectedRoute = ({component:Component, ...rest}) => {
   
//   //check if user is login
//   const user = useSelector(state=>state?.users)
//   const {userAuth} = user;
//   return userAuth? <Component {...rest}/> : <Navigate to="/login"/>
// }

// Outlet
const  PrivateProtectedRoute = () => {
   
    //check if user is login
    const user = useSelector(state=>state?.users)
    const {userAuth} = user;
    return userAuth? <Outlet/> : <Navigate to="/login"/>
  }

export default PrivateProtectedRoute;


