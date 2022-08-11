import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import React, { memo, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postTweetAction } from "../actions/postTweetAction";
import { POST_TWEET } from "../API/Endpoints";
import postData from "../hooks/postData";
import putData from "../hooks/putData";
import classes from "./AddTweet.module.css";

const AddTweet = (props) => {
  const [tweetText, setTweetValue] = useState(props.message);
  const [isImageClick, setImageClick] = useState(props.images);
  const [id, setId] = useState(props.id);
  const [postImages,setPostImages]=useState([]);


  useEffect(() => {
    console.log(props);
    setTweetValue(props.message);
    setImageClick(props.images);
    setId(props.id);
  }, [props.message]);

  const onEmojiChange = (emoji) => {
    setTweetValue(tweetText + emoji);
    console.log(emoji);
  }

  const dispatch = useDispatch();



  const onImageRemove = (index) => {
    isImageClick.splice(index, 1);
    setImageClick([...isImageClick]);
  }

  const onImageClick = (event) => {
    let imagePaths = [];
    let originalImages = [];
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
    setImageClick([...isImageClick, ...imagePaths]);
    event.target.files = null;
  }


  const onPostTweet = async(e) => {
    e.preventDefault();
    let urls=[];
   const uploadUrls=  await Promise.all(isImageClick.map(async (file) => {
    // Initial FormData
    await fetch(file).then(r => r.blob()).then(async(filedata) => {
      const formData = new FormData();
      formData.append("file", filedata);
      formData.append("upload_preset", "ykxo9ke1");
      formData.append("api_key", "258248519656872");
      formData.append("timestamp", (Date.now() / 1000) | 0);
     await axios.post("https://api.cloudinary.com/v1_1/dcpyzzvui/image/upload", formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }).then(response => {
        const data = response.data;
        const fileURL = data.secure_url // You should store this URL for future references in your app
        urls.push(fileURL);
      })
    });
  }));
  console.log(urls);
    let data = {
      Message: tweetText,
      UserId: "",
      ImagePath: urls,
      LikedUsers: [],
      ReplyTweets: []
    }

    
   await postData(POST_TWEET,data).then((data)=>{
        if(data.data.success){
          props.onPost();
          setId(null);
          setTweetValue('');
          setImageClick([]);
        }
      })
  //   //console.log(response);
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
          onChange={(e) => { setTweetValue(e.target.value) }}
          className={"form-control " + classes.textarea}
        />
      </div>
      <div className={classes.imagePreview}>
        {

          isImageClick.map((ele, index) => {
            return <p className={classes.img} key={index}><img id={"output" + index} src={ele} width="150" /><span className={"material-symbols-outlined " + classes.cancel} onClick={() => { onImageRemove(index) }}>cancel</span></p>
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
              <input id="file-input" type="file" multiple name="image" onChange={onImageClick} />
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

export default memo(AddTweet);
