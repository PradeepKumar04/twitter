import React, { memo, useState } from 'react'
import LoginUser from '../components/LoginUser'
import classes from './Login.module.css'
import Signup from './Signup';



const Login = () => {
  const [isLogin,setLogin]=useState(true);

  const changeLogin=()=>{
    setLogin(true);
  }
  const changeSignup=()=>{
    setLogin(false);
  }
  return (
    <div className={'container m-4 '+ classes.container}>
    <div className="card text-center">
  <div className="card-header">
    <ul className="nav nav-pills card-header-pills">
      <li className="nav-item">
        <a className={ isLogin ?"nav-link active":"nav-link"} onClick={changeLogin} href="#login">Login</a>
      </li>
      <li className="nav-item">
        <a className={ !isLogin ?"nav-link active":"nav-link"} onClick={changeSignup} href="#signup">Signup</a>
      </li>
    </ul>
  </div>
  <div className="card-body">
   {isLogin ? <LoginUser onSignup={changeSignup}/>: <Signup onLogin={changeLogin}/>}
  </div>
</div>
    </div>
  )
}

export default memo(Login);