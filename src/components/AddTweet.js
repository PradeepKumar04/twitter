import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import React, { memo, useRef,useState } from "react";
import {useSelector,useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postTweetAction } from "../actions/postTweetAction";
import classes from "./AddTweet.module.css";

const AddTweet = (props) => {
  const textareaRef = useRef();
    const [tweetText,setTweetValue]=useState('');
    const [isImageClick,setImageClick]=useState([]);
    const [image,setImage]=useState([]);
    const [uploadedImages,setUploadedImages]=useState([]);
  
    const onEmojiChange=(emoji)=>{
    setTweetValue(tweetText+emoji);
    console.log(emoji);
  }

  const dispatch=useDispatch();
 


  const onImageRemove=(index)=>{
    isImageClick.splice(index,1);
    image.slice(index,1);
    setImage([...image]);
    setImageClick([...isImageClick]);
  }

  const onImageClick=(event)=>{
    let imagePaths=[];
    let originalImages=[];
    console.log(event.target.files[0]);
    
    for (let index = 0; index < event.target.files.length; index++) {
      const element = event.target.files[index];
      imagePaths.push(URL.createObjectURL(element));
      originalImages.push(element);
    }
    // for (var key in event.target.files) {
    //   console.log(event.target.files[0]);
    //   console.log(event.target.files[key]);
    //   if(isNaN( event.target.files[key])){
    //     imagePaths.push(URL.createObjectURL(event.target.files[key]));
    //   }
    // }
    setImage([...image,...originalImages]);
     setImageClick([...isImageClick,...imagePaths]);
     event.target.files=null;
  }

  const onImageUpload=async ()=>{
    let images=[];
    const uploaders = image.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ykxo9ke1"); 
      formData.append("api_key", "258248519656872"); 
      formData.append("timestamp", (Date.now() / 1000) | 0);
      
      
       axios.post("https://api.cloudinary.com/v1_1/dcpyzzvui/image/upload", formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }).then(response => {
        const data = response.data;
        const fileURL = data.secure_url // You should store this URL for future references in your app
        setUploadedImages([...uploadedImages,fileURL]);
        images=[...uploadedImages,fileURL];
      })
    });
    return images;
  }

  const onPostTweet=async(e)=>{
    e.preventDefault();
  let images= await onImageUpload();
  console.log(images);
    let data={
      Message:tweetText,
      UserId:"",
      ImagePath:uploadedImages,
      LikedUsers:[],
      ReplyTweets:[]
  }
  console.log(uploadedImages);
 let response=await dispatch(postTweetAction(data));
 props.onPost();
  //console.log(response);
  setTweetValue('');
  setUploadedImages([]);
  setImage([]);
  setImageClick([]);
//     var formData=new FormData();
//     for ( const file of isImageClick ) {
//       formData.append('file', file);
//     }
//     formData.append('upload_preset', 'twitter_posts');
//     const data = await fetch('https://api.cloudinary.com/v1_1/dcpyzzvui/image/upload', {
//   method: 'POST',
//   body: formData
// }).then(r => r.json());
// console.log(data);
  }

  return (
    <div class={"card text-center " + classes.addTweet}>
      <div class={"card-header " + classes.header}>Home</div>
      <div class="card-body">
        <textarea
          rows={3}
          cols={20}
          placeholder="What's happening?"
          value={tweetText}
          onChange={(e)=>{setTweetValue(e.target.value)}}
          ref={textareaRef}
          className={"form-control " + classes.textarea}
        />
      </div>
      <div className={classes.imagePreview}>
        {
          isImageClick.map((ele,index)=>{
             return <p className={classes.img} key={index}><img id={"output"+index}  src={ele} width="150" /><span className={"material-symbols-outlined "+classes.cancel} onClick={()=>{onImageRemove(index)}}>cancel</span></p>
          })
        }
      </div>
      <div class={"card-footer text-muted p-4 " + classes.footer}>
        <div className="row">
          <div className="col">
            <div class={classes.imageUpload}>
              <label for="file-input">
                <span class={"material-symbols-outlined " + classes.icons}>
                  add_a_photo
                </span>
              </label>
              <input id="file-input" type="file" multiple   name="image"  onChange={onImageClick} />
            </div>
          </div>
          <div className="col">
            <span class={"material-symbols-outlined " + classes.icons}>
              add_reaction
            </span>
            {/* <EmojiPicker onEmojiChange={onEmojiChange}/> */}
          </div>
          <div className="col">
            <button className={"btn " + classes.button} onClick={onPostTweet}>Tweet</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo( AddTweet);
