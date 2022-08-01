import React, { useState } from 'react';
import classes from './Signup.module.css';


const initialState={
    isTouched:false,
    isValid:false,
    error:''
}

const Signup = (props) => {

    const formIsDirty = true; 
    const onLogin=()=>{
        props.onLogin();
    }


    const onProfilePicUpload=(e)=>{
        let image = document.getElementById('profile');
        image.src=URL.createObjectURL(e.target.files[0]);
        changeProfile(image.src);
    }
    
    const [firstname,changeFirstname]=useState('');
    const [lastname,changeLastname]=useState('');
    const [email,changeEmail]=useState('');
    const [username,changeUsername]=useState('');
    const [phonenumber,changePhonenumer]=useState('');
    const [dateofBirth,changeDateofBirth]=useState('');
    const [password,changePassword]=useState('');
    const[confirmPassword,changeConfirmPassword]=useState('');
    const[gender,changeGender]=useState('0');

    const [firstnameValidation,changeFirstnameValidation]=useState(initialState);
    const [lastnameValidation,changeLastnameValidation]=useState(initialState);
    const [emailValidation,changeEmailValidation]=useState(initialState);
    const [usernameValidation,changeUsernameValidation]=useState(initialState);
    const [phonenumberValidation,changePhonenumerValidation]=useState(initialState);
    const [dateofBirthValidation,changeDateofBirthValidation]=useState(initialState);
    const [passwordValidation,changePasswordValidation]=useState(initialState);
    const[confirmPasswordValidation,changeConfirmPasswordValidation]=useState(initialState);
    const[genderValidation,changeGenderValidation]=useState(initialState);
    
    const[profilePic,changeProfile]=useState("https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg");

    const onChangeFirstName=(e)=>{
        changeFirstname(e.target.value);
        if(e.target.value===""){
            changeFirstnameValidation({isTouched:true,isValid:false,error:'Required'});
        }
        else{
            changeFirstnameValidation({isTouched:true,isValid:true,error:''});
        }
    }

    const onFormSubmit=(e)=>{
        e.preventDefault();
        if(confirmPassword!==password){
            changeConfirmPasswordValidation({isTouched:true,isValid:false,error:'Password must be match with confirm password'});
        }
        if(!firstnameValidation.isValid){
            changeFirstnameValidation({isTouched:true,isValid:false,error:'Required'});
        }
         if(!lastnameValidation.isValid){
            changeLastnameValidation({isTouched:true,isValid:false,error:'Required'});
        }
         if(!emailValidation.isValid){
            changeEmailValidation({isTouched:true,isValid:false,error:'Required'});
        }
         if(!usernameValidation.isValid){
            changeUsernameValidation({isTouched:true,isValid:false,error:'Required'});
        }
         if(!phonenumberValidation.isValid){
            changePhonenumerValidation({isTouched:true,isValid:false,error:'Required'});
        }
         if(!dateofBirthValidation.isValid){
            changeDateofBirthValidation({isTouched:true,isValid:false,error:'Required'});
        }
         if(!passwordValidation.isValid){
            changePasswordValidation({isTouched:true,isValid:false,error:'Required'});
        }
         if(!confirmPasswordValidation.isValid){
            changeConfirmPasswordValidation({isTouched:true,isValid:false,error:'Required'});
        }
         if(gender==="0"){
            changeGenderValidation({isTouched:true,isValid:false,error:'Required'});
        }
    }
    
    const onChangeLastname=(e)=>{
        changeLastname(e.target.value);
        if(e.target.value===""){
            changeLastnameValidation({isTouched:true,isValid:false,error:'Required'});
        }
        else{
            changeLastnameValidation({isTouched:true,isValid:true,error:''});
        }
    }
    
    const onChangeEmail=(e)=>{
        changeEmail(e.target.value);
        if(e.target.value===""){
            changeEmailValidation({isTouched:true,isValid:false,error:'Required'});
        }else if(!e.target.value.includes('@')){
            changeEmailValidation({isTouched:true,isValid:false,error:'Invalid Email'});
        }
        else{
            changeEmailValidation({isTouched:true,isValid:true,error:''});
        }
        
    }
    
    const onChangeUsername=(e)=>{
        changeUsername(e.target.value);
        if(e.target.value===""){
            changeUsernameValidation({isTouched:true,isValid:false,error:'Required'});
        }
        else if(e.target.value.length<5){
            changeUsernameValidation({isTouched:true,isValid:false,error:'User Name length must be greater than 4'});
        }
        else{
            changeUsernameValidation({isTouched:true,isValid:true,error:''});
        }
    }
    
    const onChangePhonenumer=(e)=>{
        changePhonenumer(e.target.value);
        if(e.target.value===""){
            changePhonenumerValidation({isTouched:true,isValid:false,error:'Required'});
        }
        else{
            changePhonenumerValidation({isTouched:true,isValid:true,error:''});
        }
    }
    
    const onChangeDateofBirth=(e)=>{
        changeDateofBirth(e.target.value);
        if(e.target.value===""){
            changeDateofBirthValidation({isTouched:true,isValid:false,error:'Required'});
        }
        else{
            changeDateofBirthValidation({isTouched:true,isValid:true,error:''});
        }
    }
    
    const onChangePassword=(e)=>{
        changePassword(e.target.value);
        if(e.target.value===""){
            changePasswordValidation({isTouched:true,isValid:false,error:'Required'});
        }
        else if(e.target.value.length<5){
            changePasswordValidation({isTouched:true,isValid:false,error:'Password must be greater than 5'});
        }
        else{
            changePasswordValidation({isTouched:true,isValid:true,error:''});
        }
    }
    
    const onChangeConfirmPassword=(e)=>{
        changeConfirmPassword(e.target.value);
        if(e.target.value===""){
            changeConfirmPasswordValidation({isTouched:true,isValid:false,error:'Required'});
        }
        else{
            changeConfirmPasswordValidation({isTouched:true,isValid:true,error:''});
        }
    }

    const onChangeGender=(e)=>{
        changeGender(e.target.value);
        if(e.target.value==="0"){
            changeGenderValidation({isTouched:true,isValid:false,error:'Required'});
        }
        else{
            changeGenderValidation({isTouched:true,isValid:true,error:''});
        }
    }


  return (
    <div className={'container '+classes.container}>
        <form onSubmit={onFormSubmit}>
        <div className='row'>
            <div className='col p-2'>
            </div>
            <div className='col p-2'>
                <img id="profile" src={profilePic} className={classes.profilepic} width="150" />
            </div>
            <div className='col p-2'>

            </div>
        </div>
        <div className='row '>
            <div className='col p-2'>
                <label className={classes.label} for="firstname">First Name<span className={classes.required}>*</span></label>
            </div>
            <div className='col p-2'>
                <label className={classes.label} for="lastname">Last Name<span className={classes.required}>*</span></label>
            </div>
        </div>
        <div className='row '>
            <div className='col p-2'>
               <input type="text" onChange={onChangeFirstName}  value={firstname} className={'form-control '+classes.input} id="firstname" />
               {firstnameValidation.isTouched && !firstnameValidation.isValid && <p className="text-left text-danger">{firstnameValidation.error}</p>}
            </div>
            <div className='col p-2'>
                <input type="text" onChange={onChangeLastname} value={lastname} className={'form-control '+classes.input} id="lastname"/>
                {lastnameValidation.isTouched && !lastnameValidation.isValid && <p className="text-left text-danger">{lastnameValidation.error}</p>}
            </div>
        </div>
        <div className='row '>
            <div className='col p-2'>
               <label className={classes.label} for="email">Email<span className={classes.required}>*</span></label>
            </div>
            <div className='col p-2'>
               <label className={classes.label} for="username">User Name<span className={classes.required}>*</span></label>
            </div>
        </div>
        <div className='row '>
            <div className='col p-2'>
               <input type="email" onChange={onChangeEmail} value={email}  className={'form-control '+classes.input} id="email" />
               {emailValidation.isTouched && !emailValidation.isValid && <p className="text-left text-danger">{emailValidation.error}</p>}
            </div>
            <div className='col p-2'>
                <input type="text" onChange={onChangeUsername} value={username}  className={'form-control '+classes.input} id="username"/>
                {usernameValidation.isTouched && !usernameValidation.isValid && <p className="text-left text-danger">{usernameValidation.error}</p>}
            </div>
        </div>
        <div className='row '>
            <div className='col p-2'>
               <label className={classes.label} for="phone">Phone Number<span className={classes.required}>*</span></label>
            </div>
            <div className='col p-2'>
               <label className={classes.label} for="dob">Date of Birth<span className={classes.required}>*</span></label>
            </div>
        </div>
        <div className='row '>
            <div className='col p-2'>
               <input type="text" onChange={onChangePhonenumer} value={phonenumber}  className={'form-control '+classes.input} id="phone" />
               {phonenumberValidation.isTouched && !phonenumberValidation.isValid && <p className="text-left text-danger">{phonenumberValidation.error}</p>}
            </div>
            <div className='col p-2'>
                <input type="date" onChange={onChangeDateofBirth} value={dateofBirth}  className={'form-control '+classes.input} id="dob"/>
                {dateofBirthValidation.isTouched && !dateofBirthValidation.isValid && <p className="text-left text-danger">{dateofBirthValidation.error}</p>}
            </div>
        </div>
        <div className='row '>
            <div className='col p-2'>
               <label className={classes.label} for="password">Password<span className={classes.required}>*</span></label>
            </div>
            <div className='col p-2'>
               <label className={classes.label} for="confirmPassword">Confirm Password<span className={classes.required}>*</span></label>
            </div>
        </div>
        <div className='row '>
            <div className='col p-2'>
            <input type="password" onChange={onChangePassword} value={password} className={'form-control '+classes.input} id="password" />
            {passwordValidation.isTouched && !passwordValidation.isValid && <p className="text-left text-danger">{passwordValidation.error}</p>}
            </div>
            <div className='col p-2'>
            <input type="password" onChange={onChangeConfirmPassword} value={confirmPassword}  className={'form-control '+classes.input} id="confirmPassword" />
            {confirmPasswordValidation.isTouched && !confirmPasswordValidation.isValid && <p className="text-left text-danger">{confirmPasswordValidation.error}</p>}
            </div>
        </div>
        <div className='row '>
            <div className='col p-2'>
               <label className={classes.label} for="gender">Gender<span className={classes.required}>*</span></label>
            </div>
            <div className='col p-2'>
            <label className={classes.label} for="photo">Profile Photo</label>
            </div>
        </div>
        <div className='row '>
            <div className='col p-2'>
               <select id='gender' value={gender} onChange={onChangeGender} className={'form-control '+classes.input}>
                    <option value="0">--Select Gender--</option>
                    <option value="1">Male</option>
                    <option value="1">Female</option>
                    <option value="3">Prefer not to say</option>
               </select>
               {genderValidation.isTouched && !genderValidation.isValid && <p className="text-left text-danger">{genderValidation.error}</p>}
            </div>
            <div className='col p-2'>
                <input type="file"  id="photo" onChange={onProfilePicUpload} className={'form-control '+classes.input}  />
            </div>
        </div>
        <div className='row p-4'>
            <div className='col'>
                <button className={'btn '+classes.button} >Signup</button>
            </div>
        </div>
        </form>
        <p className={classes.para} onClick={onLogin} >already have account login here</p>
    </div>
  )
}

export default Signup