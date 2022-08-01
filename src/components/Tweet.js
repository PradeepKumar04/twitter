import React, { useState } from 'react';
import classes from './Tweet.module.css';
import SimpleImageSlider from "react-simple-image-slider";


const images = [
    { url: "https://img.freepik.com/premium-photo/senior-businesswoman-young-business-people-work-modern-office_52137-28330.jpg?w=2000" },
    { url: "https://img.freepik.com/premium-photo/senior-businesswoman-young-business-people-work-modern-office_52137-28330.jpg?w=2000" },
    { url: "https://img.freepik.com/premium-photo/senior-businesswoman-young-business-people-work-modern-office_52137-28330.jpg?w=2000" },
    { url: "https://img.freepik.com/premium-photo/senior-businesswoman-young-business-people-work-modern-office_52137-28330.jpg?w=2000" },
    { url: "https://img.freepik.com/premium-photo/senior-businesswoman-young-business-people-work-modern-office_52137-28330.jpg?w=2000" },
    { url: "https://img.freepik.com/premium-photo/senior-businesswoman-young-business-people-work-modern-office_52137-28330.jpg?w=2000" },
    { url: "https://img.freepik.com/premium-photo/senior-businesswoman-young-business-people-work-modern-office_52137-28330.jpg?w=2000" },
  ];

const Tweet = () => {
    
    const [like,setLike]=useState('dislike');
    const[isEdit,setIsEdit]=useState(false);
    const onLike=()=>{
        like=='like'?setLike('dislike'):setLike('like');
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
                      <b>User Name <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg" className={classes.verifiedTick} /></b>
                      <p>@username</p>
                  </div>
                  <div className={"col-md-3 offset-md-1 "+classes.editSettings} onClick={onActionClick}>
                      <p>&#8942;</p>
                  </div>
                { isEdit && <div className={'card '+classes.actionCard}>
                              <ul class="list-group">
                                  <li class={"list-group-item " + classes.listItem}>Edit Post</li>
                                  <li class={"list-group-item " + classes.listItem}>Delete Post</li>
                                  <li class={"list-group-item " + classes.listItem}>Report </li>
                                  <li class={"list-group-item " + classes.listItem}>Porta ac consectetur ac</li>
                                  <li class={"list-group-item " + classes.listItem}>Vestibulum at eros</li>
                              </ul>
                  </div>}
              </div>

            </div>
    </h5>
    <p class={"card-text "+classes.tweetCaption}>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <p class={"card-text "+classes.postTime }><small class="text-muted">Last updated 3 mins ago</small></p>
    {/* <img src="https://c0.piktochart.com/v2/themes/1449-content-checklist-twitter-post/snapshot/large.jpg" class={"card-img-top "+ classes.postImage} alt="..."/> */}
    <SimpleImageSlider
        width={700}
        height={500}
        images={images}
        onClick={onImageClick}
        class={"card-img-top "+ classes.postImage}
        showBullets={true}
        showNavs={true}
      />
    <hr/>
    <p class={"card-text "+classes.postTime }> {like=="like"?'You and 2 others liked':'2 likes'}</p>
    <hr/>
    <div className='row'>
        <div className={'col '+classes.tweetActions}>
        <span class="material-symbols-outlined">mode_comment</span>
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