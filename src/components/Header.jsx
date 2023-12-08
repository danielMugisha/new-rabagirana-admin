import React, { useEffect } from 'react'
import useAuth from '../hooks/useAuth'

const Header = () => {
    const {auth, setAuth} = useAuth()


    useEffect(()=>{
        console.log(auth)
    },[])
    return (
        <div>

    <header id="page-topbar">
    <div class="layout-width" >
    <div class="navbar-header" style={{padding: 0}}>
        <div class="d-flex w-100 justify-content-end">
            <div class="dropdown ms-sm-3 header-item topbar-user">
                <span class="p-3" id="page-header-user-dropdown">
                    <span class="d-flex align-items-center">
                        <img class="rounded-circle header-profile-user" src="assets/images/users/avatar-1.jpg" alt="Header Avatar"/>
                        <span class="text-start ms-xl-2">
                            <span class="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{auth?.user?.username}</span>
                            <span class="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text"><button className='btn' style={{padding:0}} onClick={()=>setAuth({})}>Logout</button></span>
                        </span>
                    </span>
                </span>
            </div>
        </div>
    </div>
    </div>
    </header>
        </div>
    )
}

export default Header
