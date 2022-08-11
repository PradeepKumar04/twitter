import React, { memo, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './SideNavbar.css';
import { BrowserRouter,Switch, Routes, Route } from 'react-router-dom';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import ProtectedRoute from '../auth/ProtectedRoute';
import SingleTweet from '../screens/SingleTweet';
import UserProfile from '../screens/UserProfile';
import ResetPassword from '../screens/ResetPassword';

const SideNavbar = () => {

  const [toggleClass,settoggleClass]= useState('sidebar');
  const [toggleDarkClass,setDarktoggleClass]= useState('');
  const [isLogin,setLogin]=useState(false);

  const toggleDarkButton =()=>{
    toggleDarkClass==''?setDarktoggleClass('dark'):setDarktoggleClass('');
  }

  const toggleNavbar=()=>{
   toggleClass=='sidebar'?settoggleClass('sidebar close'):settoggleClass('sidebar');
  }

  useEffect(()=>{
    setLogin(localStorage.getItem('token')!==undefined)
  },[]);

  return (
    <body className={toggleDarkClass}>
      <div className='container'>
      <div className='row'>
        <div className='col-5'>
          <nav class={toggleClass}>
          <header>
              <div class="image-text">
                  <span class="image">
                  </span>

                  <div class="text logo-text">
                      <span class="name"> Twitter</span>
                  </div>
              </div>

              <i class='bx bx-chevron-right toggle' onClick={toggleNavbar}></i>
          </header>

          <div class="menu-bar">
              <div class="menu">

                  <li class="search-box">
                      <i class='bx bx-search icon'></i>
                      <input type="text" placeholder="Search..."/>
                  </li>

                  <ul class="menu-links">
                      <li class="nav-link">
                          <NavLink  to='/home' className={isActive => "nav-link" + (!isActive ? "" : " active")}>
                              <i class='bx bx-home-alt icon' ></i>
                              <span class="text nav-text">Home</span>
                          </NavLink>
                      </li>

                      <li class="nav-link">
                      <NavLink  to='/account' className={isActive => "nav-link" + (!isActive ? "" : " active")}>
                              <i class='bx bx-profile-alt icon' ></i>
                              <span class="text nav-text">Accounts</span>
                        </NavLink>
                      </li>
                      <li class="nav-link">
                      <NavLink  to='/reset' className={isActive => "nav-link" + (!isActive ? "" : " active")}>
                              <i class='bx bx-bar-chart-alt-2 icon' ></i>
                              <span class="text nav-text">Reset Password</span>
                        </NavLink>
                      </li>
                  </ul>
              </div>

              <div class="bottom-content">
                  <li class="mode">
                      <div class="sun-moon">
                          <i class='bx bx-moon icon moon'></i>
                          <i class='bx bx-sun icon sun'></i>
                      </div>
                      <span class="mode-text text">Dark mode</span>

                      <div class="toggle-switch" onClick={toggleDarkButton}>
                          <span class="switch" ></span>
                      </div>
                  </li>

                  {isLogin && <li class="">
                      <a href="#">
                          <i class='bx bx-log-out icon' ></i>
                          <span class="text nav-text">Logout</span>
                      </a>
                  </li>}
              </div>
          </div>

      </nav>
      <section class="home">
        
        <Switch>
                {/* <Route exact  path='/home' component={Home} /> */}
                <Route exact path='/account' component={Login} />
                <ProtectedRoute  path='/home/profile/:username' component={UserProfile} />
                <ProtectedRoute exact  path='/home/:id' component={SingleTweet} />
                <ProtectedRoute  path='/home' component={Home} />
                <ProtectedRoute path='/reset' component={ResetPassword} />
        </Switch>
    </section>
        </div>
      </div>
      </div>
    </body>

  )
}

export default memo(SideNavbar);