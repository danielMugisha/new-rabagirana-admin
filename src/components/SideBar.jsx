import React from 'react'
import { Outlet, Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div>
      <div class="app-menu navbar-menu">
    <div class="navbar-brand-box">
        <a href="index.html" class="logo logo-dark">
            <span class="logo-sm">
                <img src="assets/images/logo.png" alt="" height="70"/> 
            </span>
            <span class="logo-lg">
                <img src="assets/images/logo.png" alt="" height="70"/>
            </span>
        </a>
        <a href="index.html" class="logo logo-light">
            <span class="logo-sm">
                <img src="assets/images/logo.png" alt="" height="70"/>
            </span>
            <span class="logo-lg">
                <img src="assets/images/logo.png" alt="" height="70"/>
            </span>
        </a>
        <button type="button" class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
            <i class="ri-record-circle-line"></i>
        </button>
    </div>

    <div id="scrollbar">
        <div class="container-fluid mt-5">

            <div id="two-column-menu">
            </div>
            <ul class="navbar-nav" id="navbar-nav">
                {/* <li class="nav-item">
                    <a class="nav-link menu-link" href="#sidebarDashboards" role="button" aria-expanded="false" aria-controls="sidebarDashboards">
                        <i class="ri-dashboard-2-line"></i> <span data-key="t-dashboards">Dashboard</span>
                    </a>
                </li> */}
                <li class="nav-item">
                    <Link class="nav-link menu-link nav-link" to='/manna'  aria-controls="sidebarTables" data-key="t-list-js">
                    <i class="ri-layout-grid-line"></i><span class="" data-key="t-list-js">Manage Manna</span></Link>
                </li>

                <li class="nav-item">
                    <Link class="nav-link menu-link nav-link" to='/event'  aria-controls="sidebarTables" data-key="t-list-js">
                    <i class="ri-layout-grid-line"></i><span class="" data-key="t-list-js">Manage Events</span></Link>
                </li>
            </ul>
        </div>
    </div>
    <div class="sidebar-background"></div>
</div>
<div class="vertical-overlay"></div>
<Outlet />
    </div>
  )
}

export default SideBar
