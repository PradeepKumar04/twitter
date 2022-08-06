import React, { useEffect, useState } from 'react';
import classes from './Tweet.module.css';
import SimpleImageSlider from "react-simple-image-slider";
import axios from 'axios';
import putData from '../hooks/putData';
import { DOMAIN } from '../API/Endpoints';


const Tweet = (props) => {
    
    const [like,setLike]=useState('dislike');
    const images=props.images.map((res)=> {return {url:res}});
    const[isEdit,setIsEdit]=useState(false);
    const[likes,setLikes]=useState(props.likedUsers.length);
    useEffect(()=>{
      if(props.likedUsers.length>0){
       let isliked= props.likedUsers.some((user)=>{
            return user.userName==localStorage.getItem('username')})
       setLike(isliked?'like':'dislike');
      }
    },[]);
    const onLike=async()=>{
        like=='like'?setLike('dislike'):setLike('like');
        if(like==='like'){
          setLikes(likes-1)
        }
        else{
          setLikes(likes+1)
        }
        await putData(DOMAIN+'Tweet/'+localStorage.getItem('username')+'/like/'+props.id,null)
    }

    const onImageClick=(e)=>{
        console.log(e);
    }

    const onActionClick=(e)=>{
        setIsEdit(!isEdit);
    }
  return (
    <div class={"card "+classes.tweetCard} >
  <div class="card-body">
    <h5 class="card-title">
            <div className='row'>
              <div className='col-12'>
                  <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" className={classes.profilePic} alt="" />
                  <div className={classes.name}>
                      <b>{props.user.firstName+" "+props.user.lastName} <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg" className={classes.verifiedTick} /></b>
                      <p>@{props.user.userName}</p>
                  </div>
                  <div className={"col-md-3 offset-md-1 "+classes.editSettings} onClick={onActionClick}>
                      <p>&#8942;</p>
                  </div>
                { isEdit && <div className={'card '+classes.actionCard}>
                              <ul class="list-group">
                                { props.user.userName==localStorage.getItem('username') && <li class={"list-group-item " + classes.listItem}>Edit Post</li>}
                                 { props.user.userName==localStorage.getItem('username') && <li class={"list-group-item " + classes.listItem}>Delete Post</li>}
                                  <li class={"list-group-item " + classes.listItem}>Report </li>
                                  <li class={"list-group-item " + classes.listItem}>Porta ac consectetur ac</li>
                                  <li class={"list-group-item " + classes.listItem}>Vestibulum at eros</li>
                              </ul>
                  </div>}
              </div>

            </div>
    </h5>
    <p class={"card-text "+classes.tweetCaption}>{props.message}</p>
    <p class={"card-text "+classes.postTime }><small class="text-muted">{new Date(props.uploadDate).toDateString()}</small></p>
    {/* <img src="https://c0.piktochart.com/v2/themes/1449-content-checklist-twitter-post/snapshot/large.jpg" class={"card-img-top "+ classes.postImage} alt="..."/> */}
  { images.length>0 && <SimpleImageSlider
        width={700}
        height={500}
        images={images}
        onClick={onImageClick}
        class={"card-img-top "+ classes.postImage}
        showBullets={true}
        showNavs={true}
      />}
    <hr/>
    <p class={"card-text "+classes.postTime }> { `${likes} likes`}</p>
    <hr/>
    <div className='row'>
        <div className={'col '+classes.tweetActions}>
        <span class="material-symbols-outlined">mode_comment</span><span className={classes.reply}>{props.replyTweets.length}</span>
        </div>
        <div className={'col '+classes.tweetActions}>
            retweet
        </div>
        <div className={'col '+classes.tweetActions} title={like}>
            <div className={classes[like]} onClick={onLike}>
            &#10084;
            </div>
        </div>
    </div>
  </div>
  
</div>

  )
}

export default Tweet