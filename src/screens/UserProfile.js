import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GETALLTWEETS } from '../API/Endpoints';
import Tweet from '../components/Tweet';
import getData from '../hooks/getData';
import classes from './UserProfile.module.css';

const UserProfile = () => {

    const [tweetsData,setTweetsData]=useState([]);
    let username=useParams().username;

    useEffect(()=>{
        getData(GETALLTWEETS).then((res)=>{
            console.log(username);
            res.data.data.sort((a,g)=> {return new Date(a.uploadDate)> new Date(g.uploadDate)?-1:1});
           let data= res.data.data.filter((d)=>
            d.user.userName==username

            )
            console.log(data);
         setTweetsData(data);
        });
       },[]);
       

  return (
    <div className={"container "+classes.height}>
    <div className="row">
        <div className="col-sm-10"></div>
        <div className="col-sm-2">
          <div className={"icon "+classes.icon}></div>
      </div>
      </div>
      
    <div className="row mt-2">
        <div className="col-sm-0 col-md-0"></div>
        <div className={"col-sm-12 col-md-12 "+classes.overflow}>
            <div className={"row "+classes.back} >
                <div className={"col-sm-12 "+classes.white }>
                    <div className="row">
                        <div className="col-sm-4">
                            <img src="https://res.cloudinary.com/dcpyzzvui/image/upload/v1659853355/My%20Uploads/ua6ynafvoijcla7vpade.png"
                             height="100px" width="100px" className={classes.profile} />
                        </div>
                        <div className={"col-sm-2 "+classes.tabs }>
                            <span className={classes.tabElements1}>Tweets</span><br/>
                            <span className={classes.tabElements2}>{tweetsData.length}</span>
                        </div>
                        <div className={"col-sm-2 "+classes.tabs }>
                            <span className={classes.tabElements1}>Photos/Videos</span><br/>
                            <span className={classes.tabElements2}>25</span>
                        </div>
                        <div className={"col-sm-2 "+classes.tabs }>
                            <span className={classes.tabElements1}>Following</span><br/>
                            <span className={classes.tabElements2}>1500</span>
                        </div>
                        <div className={"col-sm-2 "+classes.tabs }>
                            <span className={classes.tabElements1}>Followers</span><br/>
                            <span className={classes.tabElements2}>2876</span>
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className={"col-md-3 "+classes.block} >
                            <h3 className={classes.twitter}>Twitter</h3>
                            <span>@twitter</span>
                            <p className={classes.message}>Your official info for news updates erdtfygu</p>
                            <p className={classes.message}>setdrytfuygi</p>
                            <p className={classes.message1}>uyuyrteasfzd</p>
                            <p className={classes.message}>iuytdycgvhjbn</p>
                        </div>
                        <div className={"col-md-9 "+classes.colMd}  >
                            <h6 className={classes.heading}>Tweets</h6>
                            <div className={"content "+classes.contenet}>
                                <div className="row">
                                    <p>
                                        <img src="https://th.bing.com/th/id/R.b757f2bca8039d4a08882d38f4c1b8f0?rik=e5mvOjCdxGVlkQ&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fecM%2fkgb%2fecMkgbB5i.png&ehk=i8LK%2fKRq0yJtJWgUboVbG4vuRTjCZ%2bLANFfYSIWOoVE%3d&risl=&pid=ImgRaw&r=0"
                                 height="20px" width="20px" className={classes.profile}/>
                                 <span className={classes.black}>Twitter</span>
                                 <span className={classes.time}>@twitter . 1h</span>
                                    </p>
                                </div>
                                <div className="row">
                                    <p className={classes.tweetmessage}>oihugy6f75d6uyiuonipjo8y97t68r57e4635awerstxrcygvuyiuoij</p>
                                    <p className={classes.tweetmessage}>oihugy6f75d6uyiuonipjo8y97t68r57e4635awerstxrcygvuyiuoij</p>
                                    <p className={classes.tweetmessage+' '+classes.aqua}><a>esdrtytwz4ex5r6tf7gy</a></p>
                                </div>
                                <div className="row">
                                    <p>
                                        <img src="https://th.bing.com/th/id/R.b757f2bca8039d4a08882d38f4c1b8f0?rik=e5mvOjCdxGVlkQ&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fecM%2fkgb%2fecMkgbB5i.png&ehk=i8LK%2fKRq0yJtJWgUboVbG4vuRTjCZ%2bLANFfYSIWOoVE%3d&risl=&pid=ImgRaw&r=0"
                                 height="20px" width="20px" className={classes.profile}/>
                                 <span className={classes.black}>Twitter</span>
                                    </p>
                                    <p>oui8675d6se5xtcfygvuhbijnokmp[,kj-0h9g8f7dr6serycfqeawserdrftgyuihbnjkmo</p>
                                    <p>oui8675d6se5xtcfygvuhbijnokmp[,kj-0h9g8f7dr6serycfaeszxrdc</p>
                                    <p>oui8675d6se5xtcfygvuhbijnokmp[,kj-0h9g8f7dr6serycfewsrdtfyguhiugyftdr</p>
                                    <p>oui8675d6se5xtcfygvuhbijnokmp[,kj-0h9g8f7dr6serycfewsrdtfyguhiugyftdr</p>
                                    <p>oui8675d6se5xtcfygvuhbijnokmp[,kj-0h9g8f7dr6serycfewsrdtfyguhiugyftdr</p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className='row'>
                            {
                   tweetsData.length>0 ?tweetsData.map((tweet)=>{
                        return <Tweet message={tweet.message} id={tweet.id} images={tweet.imagePath} likedUsers={tweet.likedUsers} replyTweets={tweet.replyTweets} uploadDate={tweet.uploadDate} user={tweet.user}/>
                    }): <div>No Tweets</div>
                    }
                    </div>
                </div>
            </div>
        </div>
        <div className="col-sm-0 col-md-0"></div>
        
    </div>
</div>
  )
}

export default memo(UserProfile)