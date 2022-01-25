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
const  AdminRoute = () => {
   
    //check if user is login
    const user = useSelector(state=>state?.users)
    const {userAuth} = user;
    return userAuth?.isAdmin ? <Outlet/> : <Navigate to="/"/>
  }

export default AdminRoute;


