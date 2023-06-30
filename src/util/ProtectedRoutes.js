import React from 'react'
import {Outlet, Navigate, } from 'react-router-dom'
// import {useState, useEffect} from 'react'

  function ProtectedRoutes() {
    const isAuthenticated = localStorage.getItem("auth_token");
   // console.log("this", isAuthenticated);
    
    return (
      
          isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    );
  }
  
export default ProtectedRoutes
