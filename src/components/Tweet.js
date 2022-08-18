import React, { useEffect, useState } from 'react';
import classes from './Tweet.module.css';
import SimpleImageSlider from "react-simple-image-slider";
import axios from 'axios';
import putData from '../hooks/putData';
import { DOMAIN } from '../API/Endpoints';
import deleteData from '../hooks/deleteData';
import { useHistory } from 'react-router-dom';


const Tweet = (props) => {
    
    const [like,setLike]=useState('dislike');
    const images=props.images.map((res)=> {return {url:res}});
    const[isEdit,setIsEdit]=useState(false);
    const[likes,setLikes]=useState(props.likedUsers.length);
    const history=useHistory();

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

    const onEditImage=()=>{
      let imgs=images.slice();
      let imaged=[];
      for (let index = 0; index < imgs.length; index++) {
        imaged.push(imgs[index].url);
      }
      let data={
        message:props.message,
        images:imaged,
        id: props.id
      }

      setIsEdit(false);
      props.onEdit(data);
      window.scrollTo(0, 0)
    }

    const onDeletePost=async()=>{
      await deleteData(DOMAIN+'Tweet/'+localStorage.getItem('username')+'/delete/'+props.id);
      props.isPostData()
      setIsEdit(false);
    }

    const onComment=()=>{
      history.push({pathname:`/home/${props.id}`,tweetData:props});
    }

    const onViewProfile=()=>{
      history.push(`/home/profile/${props.user.userName}`);
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
                  <img onClick={onViewProfile} src="https://res.cloudinary.com/dcpyzzvui/image/upload/v1659853355/My%20Uploads/ua6ynafvoijcla7vpade.png" className={classes.profilePic} alt="" />
                  <div className={classes.name}>
                      <b>{props.user.firstName+" "+props.user.lastName} <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg" className={classes.verifiedTick} /></b>
                      <p>@{props.user.userName}</p>
                  </div>
                  <div className={"col-md-3 offset-md-1 "+classes.editSettings} onClick={onActionClick}>
                     {props.user.userName==localStorage.getItem('username') && <p>&#8942;</p>}
                  </div>
                { isEdit && <div className={'card '+classes.actionCard}>
                              <ul class="list-group">
                                { props.user.userName==localStorage.getItem('username') && <li class={"list-group-item " + classes.listItem} onClick={onEditImage}>Edit Post</li>}
                                 { props.user.userName==localStorage.getItem('username') && <li class={"list-group-item " + classes.listItem} onClick={onDeletePost} >Delete Post</li>}
                                  
                              </ul>
                  </div>}
              </div>

            </div>
    </h5>
    <p class={"card-text "+classes.tweetCaption}>{props.message}</p>
    
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
    <p class={"card-text "+classes.postTime }><small class="text-muted">{new Date(props.uploadDate).toDateString()}</small></p>
    <hr/>
    <p class={"card-text "+classes.postTime }> { `${likes} ${likes==1?'like':'likes'}`}</p>
    <hr/>
    <div className='row'>
        <div className={'col '+classes.tweetActions} onClick={onComment}>
        <span class="material-symbols-outlined">mode_comment</span><span className={classes.reply}>{props.replyTweets.length}</span>
        </div>
        <div className={'col '+classes.tweetActions}>
           {/* <i class="fa fa-retweet" aria-hidden="true"></i> */}
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