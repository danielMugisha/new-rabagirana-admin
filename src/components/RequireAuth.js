import React, { useEffect } from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Header from "./Header.jsx"
import SideBar from "./SideBar.jsx";

const RequireAuth = () => {
    const {auth} = useAuth()
    const location = useLocation()

    useEffect(()=>{
        console.log(auth)
    },[])

    return (
        auth?.user
        ?  <>
            <Header/>
            <SideBar/>
        </>
        : <Navigate to='/login' state={{from: location}} replace />
    )
}

export default RequireAuth
