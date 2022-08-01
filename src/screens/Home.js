import React, {useState,useEffect, memo} from 'react'
import AddTweet from '../components/AddTweet';
import Tweet from '../components/Tweet';
import {useSelector,useDispatch} from 'react-redux';
import classes from './Home.module.css';
import { LoginUserAction } from '../actions/loginAction';

const Home = () => {
  const [focus,setFocus]=useState(false);
  


  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
            <AddTweet  onFocus={focus} /> 
            <Tweet/>
            <Tweet/>
            <Tweet/>
            <Tweet/>
        </div>
        <div className='col'>

        </div>
      </div>
       
        <button className={classes.addTweet} onClick={e=>setFocus(!focus)} > <i className="fa fa-twitter"></i></button>
    </div>
  )
}

export default memo(Home);