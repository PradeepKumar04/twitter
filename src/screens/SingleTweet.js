import React, { memo, useEffect, useState } from 'react';
import classes from './SingleTweet.module.css';
import SimpleImageSlider from "react-simple-image-slider";
import postData from '../hooks/postData';
import { DOMAIN, GETALLTWEETS } from '../API/Endpoints';
import { useHistory, useParams } from 'react-router-dom';
import getData from '../hooks/getData';
import putData from '../hooks/putData';

const initialState={
    id: "",
    message: "",
    uploadDate: "",
    imagePath: [],
    likedUsers: [],
    replyTweets: [],
    user: {}
}

const SingleTweet = (props) => {
    console.log(props);
    const history=useHistory();
    const [like, setLike] = useState('dislike');
    const tweetId=useParams();
    const [images,setImages]=useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tweet,setTweet]=useState(initialState);
    const[likes,setLikes]=useState(0);
    const [commentText,setCommentText]=useState('');
    const [replies,setReplies] = useState(initialState.replyTweets);
    const [isload,setisLoad]=useState(false);

    useEffect(()=>{
        getData(GETALLTWEETS).then((res)=>{
            res.data.data.map((data)=>{
                if(data.id===tweetId.id){
                    setTweet(data);
                    console.log(data);
                    setLikes(data.likedUsers.length);
                    setImages(data.imagePath);
                    setReplies(data.replyTweets);
                    data.likedUsers.map((users)=>{
                        if(users.userName==localStorage.getItem('username')){
                            setLike('like');
                        }
                    })
                }
            })
           });

    },[isload]);
    const onComment=async()=>{
        if(commentText!=''){
            let data ={
                Reply: commentText
            }
            await postData(DOMAIN+'Tweet/'+localStorage.getItem('username')+'/reply/'+tweetId.id,data);
            setCommentText('');
            setisLoad(!isload);
        }

    }

    const onprofile=()=>{
        history.push(`/home/profile/${props.location.tweetData.user.userName}`)
    }

    const onLike=async()=>{
        like=='like'?setLike('dislike'):setLike('like');
        if(like==='like'){
          setLikes(likes-1)
        }
        else{
          setLikes(likes+1)
        }
        await putData(DOMAIN+'Tweet/'+localStorage.getItem('username')+'/like/'+tweetId.id,null);
    }


    return (
        <div class={"card " + classes.tweetCard} >
            <div class="card-body">
                <h5 class="card-title">
                    <div className='row'>
                        <div className='col-12'>
                            <img  onClick={onprofile} src="https://res.cloudinary.com/dcpyzzvui/image/upload/v1659853355/My%20Uploads/ua6ynafvoijcla7vpade.png" className={classes.profilePic} alt="" />
                            <div className={classes.name}>
                                <b>{tweet.user.firstName+' '+tweet.user.lastName} <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg" className={classes.verifiedTick} /></b>
                                <p>@{tweet.user.userName}</p>
                            </div>
                            <div className={"col-md-3 offset-md-1 " + classes.editSettings} >
                                <p>&#8942;</p>
                            </div>
                            {isEdit && <div className={'card ' + classes.actionCard}>
                                <ul class="list-group">
                                    {props.user.userName == localStorage.getItem('username') && <li class={"list-group-item " + classes.listItem} >Edit Post</li>}
                                    {props.user.userName == localStorage.getItem('username') && <li class={"list-group-item " + classes.listItem}  >Delete Post</li>}
                                    <li class={"list-group-item " + classes.listItem}>Report </li>
                                    <li class={"list-group-item " + classes.listItem}>Porta ac consectetur ac</li>
                                    <li class={"list-group-item " + classes.listItem}>Vestibulum at eros</li>
                                </ul>
                            </div>}
                        </div>

                    </div>
                </h5>
                <p class={"card-text " + classes.tweetCaption}>{tweet.message}</p>
                <p class={"card-text " + classes.postTime}><small class="text-muted">{new Date().toDateString()}</small></p>
                {/* <img src="https://c0.piktochart.com/v2/themes/1449-content-checklist-twitter-post/snapshot/large.jpg" class={"card-img-top "+ classes.postImage} alt="..."/> */}
                {images.length > 0 && <SimpleImageSlider
                    width={700}
                    height={500}
                    images={images}
                    className={"card-img-top " + classes.postImage}
                    showBullets={true}
                    showNavs={true}
                />}
                <hr />
                <p class={"card-text " + classes.postTime}> {`${likes} ${likes==1?'like':'likes'}`}</p>
                <hr />
                <div className='row'>
                    <div className={'col ' + classes.tweetActions} >
                        <span class="material-symbols-outlined">mode_comment</span><span className={classes.reply}>{replies.length}</span>
                    </div>
                    <div className={'col ' + classes.tweetActions}>
                    <span class="iconify" data-icon="ei:retweet"></span>
                    </div>
                    <div className={'col ' + classes.tweetActions} title={like}>
                        <div className={classes[like]} onClick={onLike} >
                            &#10084;
                        </div>
                    </div>
                </div>

                <div className={'row ' + classes.border}>
                    <div className='col-10'>
                        <textarea value={commentText} onChange={(e)=>{setCommentText(e.target.value)}} rows="2" cols="20" type="text" className={"form-control " + classes.textarea} />
                    </div>
                    <div className='col-2'>
                        <button className={"btn " + classes.button} onClick={onComment}>Comment</button>
                    </div>
                </div>
                {
                    replies.map((reply,index)=>{
                     
                return <div class={"card " + classes.tweetCard} key={index}>
                <div className={'row ' + classes.comments}>
                    <div className='col-12'>
                        <img onClick={(e)=>{history.push(`/home/profile/${reply.userName}`)}} src="https://res.cloudinary.com/dcpyzzvui/image/upload/v1659853355/My%20Uploads/ua6ynafvoijcla7vpade.png" className={classes.profilePic} alt="" />
                        <div className={classes.name}>
                            <b>{reply.user.firstName+' '+reply.user.lastName}<img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg" className={classes.verifiedTick} /></b>
                            <p>{reply.userName}</p>
                            <small className={classes.replys}>Replying to <span className={classes.mention}>{tweet.user.userName}</span></small>
                        </div>
                    </div>

                </div>
                <div className={'row'}>
                    <h3 className={classes.postTime + ' ' + classes.comment}>{reply.replyMessage}</h3>
                </div>
                </div>
                    })
                }
            </div>
            </div>
    

    )
}

export default memo(SingleTweet)