import React, {useState,memo} from 'react'
import classes from './ResetPassword.module.css';
import 'react-toastify/dist/ReactToastify.css';
import putData from '../hooks/putData';
import { RESET_PASSWORD } from '../API/Endpoints';
import { useHistory } from 'react-router-dom';

var initialState={
    isTouched:false,
    isvalid:false
}
const ResetPassword = (props) => {

    const history=useHistory();
    const [oldPassword,setOldPassword]=useState('');
    const [newPassword,setNewPassword]=useState('');
    const [oldPasswordError,setOldPasswordError]=useState('');
    const [newPasswordError,setNewPasswordError]=useState('');

    const onFormSubmit=async(e)=>{
        e.preventDefault();
        if(oldPassword.length<=5){
            setOldPasswordError('password length must be greater than 5');
           
        }
        else if(newPassword.length<=5){
            setNewPasswordError('New Password length must be greater than 5');
        }
        else{
            setOldPasswordError('');
            setNewPasswordError('');
            let payload={
                Password:newPassword
            }
            await putData(RESET_PASSWORD,payload).then((res)=>{
                history.push('/home');
            })
        }
    }

   

   


  return (
    <div>
        
    <div className={'container '+classes.container}>
        
        <form onSubmit={onFormSubmit}>
            <div className='row m-5'>
            </div>
            <div className='row m-5'>
                <div className='col-2'>
                <label className={classes.label} for="oldpassword"> Password:</label>
                </div>
                <div className='col'>
                    <input required value={oldPassword} onChange={(e)=>{setOldPassword(e.target.value)}} id='oldpassword'  className={'form-control '+classes.container} placeholder="Enter old password" type="password"/>
                     <p className={'text-left ' +classes.formErrors}>{oldPasswordError}</p>
                </div>
                <div className='col'>
                    
                </div>
            </div>
            <div className='row m-5'>
                <div className='col-2'>
                <label className={classes.label} for="username">New Password:</label>
                </div>
                <div className='col'>
                    <input required value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}} id='newpassword'  className={'form-control '+classes.container} placeholder="Enter new password" type="password"/>
                     <p className={'text-left ' +classes.formErrors}>{newPasswordError}</p>
                </div>
                <div className='col'>
                    
                </div>
            </div>
            <div className='row m-5'>
                <div className='col'>

                    <button type='submit' className={'btn '+ classes.button+' '+classes.container} >Reset Password</button>
                </div>
                <div className='col'>
                </div>
                <div className='col'>

                </div>
            </div>
        </form>
        
    </div>
    </div>
  )
}

export default memo(ResetPassword);