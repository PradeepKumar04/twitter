import React, {useState,useEffect, memo} from 'react'
import { LoginUserAction } from '../actions/loginAction';
import classes from './LoginUser.module.css';
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useSelector,useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import postData from '../hooks/postData';
import { DOMAIN, FORGOT_PASSWORD, GET_USERS, LOGIN, REGISTER_USER } from '../API/Endpoints';
import putData from '../hooks/putData';

var initialState={
    isTouched:false,
    isvalid:false
}
const LoginUser = (props) => {

    
    const [isPassword,setPassword]=useState(true);
    const [response,setResponse]=useState('');
    const [usernameValue,setUsernameValue]=useState(initialState);
    const [passwordValue,setPasswordValue]=useState(initialState);
    const [dobValue,setDobValue]=useState(initialState);
    const [userNameError,setUsernameError]=useState('');
    const [passwordError,setPasswordError]=useState('');
    const [passwordLabel,setPasswordLabel]=useState('Password');
    const [username,setUsername]=useState('');
    const [password,setpassword]=useState('');
    const [formSubmit,onSubmit]=useState(false);
    const [usernameLabel,setLabelName]=useState('User Name');
    const [isForgotPassword,setForgotPassword]=useState(false);
    const [dob,setDob]=useState('');
    const [formError,setFormError]=useState('');

    const dispatch=useDispatch();
    const history=useHistory();
   
    const loginData=useSelector(state=>state.login);

    // useEffect(()=>{
    //     if(loginData.data != null){
    //         console.log(loginData.data);
    //        localStorage.setItem('token',`Bearer ${loginData.data.data}`);
    //        let userdata =parseJwt(loginData.data.data);
    //        console.log(userdata);
    //        localStorage.setItem('username',userdata['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'])
    //     }
    // },[loginData])

     function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };

    const onUsernameChange=(e)=>{
        setUsernameValue({isTouched:true,isvalid: e.target.value.length>4})
        loginData.data= null;
        if(e.target.value==""){
            setUsernameError("Required");
        }
        else if(e.target.value.length<=4){
            setUsernameError("Field  must be greater than 4");
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
            if(!isForgotPassword){
                
                await postData(LOGIN,data).then((res)=>{
                    if(res.data.success){
                       localStorage.setItem('token',`Bearer ${res.data.data}`);
                       let userdata =parseJwt(res.data.data);
                       localStorage.setItem('username',userdata['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'])
                       history.push('/home');
                    }
                    else{
                        setFormError(res.data.message)
                    }
                })
                  onSubmit(true);
                  setpassword('');
                  setUsername('');
                  console.log(loginData);
                  setUsernameValue(initialState);
                  setPasswordValue(initialState);
            }
            else if(dob!=""){
                let reqData={...data,Email:data.UserName}
                var date=dob.split('-');
                reqData.DateOfBirth=date[2]+'-'+date[1]+'-'+date[0];
                await putData(FORGOT_PASSWORD,reqData).then((res)=>{
                    if(res.data.success){
                        setForgotPassword(false);
                    }
                    else{
                        setFormError(res.data.message)
                    }
                })
            }
    //  await dispatch(LoginUserAction(data))
        }
    }

    const onForgotPassword=()=>{
        setForgotPassword(!isForgotPassword);
        setPasswordLabel(!isForgotPassword ?'New Password':'Password');
        setUsername('');
        setpassword('');
        setLabelName(usernameLabel=='User Name'? 'Email':'User Name');
    }

    const onDobBlur=()=>{
        if(dob==""){
            setDobValue({isTouched:true,isvalid:false});
        }
        else{
            setDobValue({isTouched:true,isvalid:true});
        }
    }

  return (
    <div>
        
    <div className={'container '+classes.container}>
        {formError!=''?<p className={classes.formErrors}>{formError}</p>:''}
        <form onSubmit={onFormSubmit}>
            <div className='row m-5'>
                {
                    loginData.data!=null && !loginData.data.data.success &&
                     <p className={'text-center ' +classes.formErrors}>{loginData.data.data.message}</p>
                }
            </div>
            <div className='row m-5'>
                <div className='col-2'>
                <label className={classes.label} for="username"> {usernameLabel}:</label>
                </div>
                <div className='col'>
                    <input required value={username} onChange={onSetUsername} id='username' onBlur={onUsernameChange} className={'form-control '+classes.container} placeholder={usernameLabel=='User Name' ?'Enter  User Name':'Enter Email'} type={usernameLabel=="User Name"?"text":"email"}/>
                    {usernameValue.isTouched && !usernameValue.isvalid && <p className={'text-left ' +classes.formErrors}>{userNameError}</p>}
                </div>
                <div className='col'>
                    
                </div>
            </div>
            <div className='row m-5'>
            <div className='col-2'>
                <label className={classes.label} for="password">{passwordLabel}:</label>
            </div>
                <div className='col'>
                    <input required value={password} id='password' onChange={onSetPassword} className={'form-control '+classes.container} onBlur={onPasswordChange} placeholder='Enter Password' type={isPassword?'password':'text'} />
                    {passwordValue.isTouched && !passwordValue.isvalid && <p className={'text-left ' +classes.formErrors}>{passwordError}</p> }
                </div>
                <div className='col'>
                    {
                        isPassword ? <span class={"material-symbols-outlined "+classes.eye} onClick={changePassword} >visibility</span> : <span class={"material-symbols-outlined "+classes.eye} onClick={changePassword}>visibility_off</span>
                    }
                </div>
            </div>
            
           { isForgotPassword && <div className='row m-5'>
            <div className='col-2'>
                <label className={classes.label} for="password">Date of Birth:</label>
            </div>
                <div className='col'>
                    <input type="date" value={dob} onChange={(e)=>{setDob(e.target.value)}}  onBlur={onDobBlur} className={'form-control '+classes.container}/>
                    {dobValue.isTouched && !dobValue.isvalid && <p className={'text-left ' +classes.formErrors}>Required</p> }
                </div>
                <div className='col'>

                </div>
               
            </div>}
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
        <p className={classes.left} onClick={onForgotPassword}>{ !isForgotPassword ? 'Forgot Password' :'Login'}</p>
        <p className={classes.para} onClick={onRegister}>don't have account? register here</p>
    </div>
    </div>
  )
}

export default LoginUser