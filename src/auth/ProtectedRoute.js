import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({component: Component, path:path}) => {
    
    const isLogin=()=>{
        var token =localStorage.getItem('token');
        if(!token){
            return false
        }
        token = token.split(' ')[1];
        if(!token){
            return false;
        }
        let tokenData=parseJwt(token);
        console.log(tokenData);
        return true;
    }

    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };
    return (
        <>
        {
            isLogin()?<Route path='/home' exact component={Component}/>:<Redirect to='/account' />
        }
        </>

        
      )
}

export default ProtectedRoute