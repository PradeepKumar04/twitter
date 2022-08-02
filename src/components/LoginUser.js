import React, {useState,useEffect, memo} from 'react'
import { LoginUserAction } from '../actions/loginAction';
import classes from './LoginUser.module.css';
import { toast,ToastContainer } from "react-toastify";
import {useSelector,useDispatch} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

var initialState={
    isTouched:false,
    isvalid:false
}
const LoginUser = (props) => {

    
    const [isPassword,setPassword]=useState(true);
    const [response,setResponse]=useState('');
    const [usernameValue,setUsernameValue]=useState(initialState);
    const [passwordValue,setPasswordValue]=useState(initialState);
    const [userNameError,setUsernameError]=useState('');
    const [passwordError,setPasswordError]=useState('');
    const [username,setUsername]=useState('');
    const [password,setpassword]=useState('');
    const [formSubmit,onSubmit]=useState(false);

    const dispatch=useDispatch();
    const history=useHistory();
   
    const loginData=useSelector(state=>state.login);
    
    const onUsernameChange=(e)=>{
        setUsernameValue({isTouched:true,isvalid: e.target.value.length>4})
        loginData.data= null;
        if(e.target.value==""){
            setUsernameError("Required");
        }
        else if(e.target.value.length<=4){
            setUsernameError("User Name length must be greater than 4");
        }
    }

    const onPasswordChange=(e)=>{
        setPasswordValue({isTouched:true,isvalid: e.target.value.length>5})
        loginData.data=null;
        if(e.target.value==""){
            setPasswordError("Required");
        }
        else if(e.target.value.length<=4){
            setPasswordError("Password must be greater than 5");
        }
    }

    const changePassword=()=>{
        setPassword(!isPassword);
    }

    const onRegister=()=>{
        props.onSignup();
    }

    const onSetPassword=(e)=>{
        setpassword(e.target.value);
    }

    const onSetUsername=(e)=>{
        setUsername(e.target.value);
    }

    const onFormSubmit=async(e)=>{
        e.preventDefault();
        if((usernameValue.isvalid && passwordValue.isvalid) || (username.length>5 && password.length>5)){
            let data ={
                UserName:username,
                Password:password
            };
     await dispatch(LoginUserAction(data))
      onSubmit(true);
      setpassword('');
      setUsername('');
            console.log(loginData); 
            setUsernameValue(initialState);
            setPasswordValue(initialState);
        }
    }

  return (
    <div>
        
    <div className={'container '+classes.container}>
        <form onSubmit={onFormSubmit}>
            <div className='row m-5'>
                {
                    loginData.data!=null && !loginData.data.data.success &&
                     <p className={'text-center ' +classes.formErrors}>{loginData.data.data.message}</p>
                }
            </div>
            <div className='row m-5'>
                <div className='col-2'>
                <label className={classes.label} for="username"> User Name:</label>
                </div>
                <div className='col'>
                    <input value={username} onChange={onSetUsername} id='username' onBlur={onUsernameChange} className={'form-control '+classes.container} placeholder='Enter User Name' type="text"/>
                    {usernameValue.isTouched && !usernameValue.isvalid && <p className={'text-left ' +classes.formErrors}>{userNameError}</p>}
                </div>
                <div className='col'>
                    
                </div>
            </div>
            <div className='row m-5'>
            <div className='col-2'>
                <label className={classes.label} for="password">Password:</label>
            </div>
                <div className='col'>
                    <input value={password} id='password' onChange={onSetPassword} className={'form-control '+classes.container} onBlur={onPasswordChange} placeholder='Enter Password' type={isPassword?'password':'text'} />
                    {passwordValue.isTouched && !passwordValue.isvalid && <p className={'text-left ' +classes.formErrors}>{passwordError}</p> }
                </div>
                <div className='col'>
                    {
                        isPassword ? <span class={"material-symbols-outlined "+classes.eye} onClick={changePassword} >visibility</span> : <span class={"material-symbols-outlined "+classes.eye} onClick={changePassword}>visibility_off</span>
                    }
                </div>
            </div>
            <div className='row m-5'>
                <div className='col'>

                    <button type='submit' className={'btn '+ classes.button+' '+classes.container} >Login</button>
                </div>
                <div className='col'>
                </div>
                <div className='col'>

                </div>
            </div>
        </form>
        <p className={classes.para} onClick={onRegister}>don't have account? register here</p>
    </div>
    </div>
  )
}

export default LoginUser