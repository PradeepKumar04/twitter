import React, {useState,useEffect, memo} from 'react'
import AddTweet from '../components/AddTweet';
import Tweet from '../components/Tweet';
import {useSelector,useDispatch} from 'react-redux';
import classes from './Home.module.css';
import { LoginUserAction } from '../actions/loginAction';
import { GetTweetsAction } from '../actions/getTweets';
import axios from 'axios';
import Modal from '../components/Modal';
import Trends from './Trends';
import getData from '../hooks/getData';
import { GETALLTWEETS } from '../API/Endpoints';

const Home = () => {
  
  const [isPostData,getPostData]=useState(false);
  const [tweetsData,setTweetsData]=useState([]);
  const [message,setMessage]=useState('');
  const[images,setImages]=useState([]);
  const [id,setId]=useState(null);
 
  // const tweets=useSelector(state=>state.getTweets);
// console.log(tweets);

const onEditTweet=(tweet)=>{
  setMessage(tweet.message);
  setImages(tweet.images);
  setId(tweet.id);
}

const onPostData=()=>{
  getPostData(!isPostData);
}

  useEffect(()=>{
   getData(GETALLTWEETS).then((res)=>{
    console.log(res);
    res.data.data.sort((a,g)=> {return new Date(a.uploadDate)> new Date(g.uploadDate)?-1:1});
    setTweetsData(res.data.data);
   });
  },[isPostData]);
  


  return (
    <div className='container'>
      <div className='row'>
        {
          
        tweetsData.length<=0    ?'':<div className={'col '+classes.col}>
            <AddTweet   onPost={onPostData} message={message} images={images} id={id} /> 
            {
              tweetsData.map((tweet)=>{
                return <Tweet message={tweet.message} isPostData={onPostData} onEdit={onEditTweet} id={tweet.id} images={tweet.imagePath} likedUsers={tweet.likedUsers} replyTweets={tweet.replyTweets} uploadDate={tweet.uploadDate} user={tweet.user}/>
              })
            }
        </div>
        
        }
        <div className={'col '+classes.trendscol}>
          <Trends/>
        </div>
      </div>
    </div>
  )
}

export default memo(Home);