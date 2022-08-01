import EmojiPicker from "emoji-picker-react";
import React, { memo, useRef,useState } from "react";
import classes from "./AddTweet.module.css";

const AddTweet = (props) => {
  const textareaRef = useRef();
    const [tweetText,setTweetValue]=useState('');
    const [isImageClick,setImageClick]=useState([]);
  
    const onEmojiChange=(emoji)=>{
    setTweetValue(tweetText+emoji);
    console.log(emoji);
  }

  const onImageRemove=(index)=>{
    isImageClick.splice(index,1);
    setImageClick([...isImageClick]);
  }

  const onImageClick=(event)=>{
    let imagePaths=[];
    console.log(event.target.files[0]);
    for (let index = 0; index < event.target.files.length; index++) {
      const element = event.target.files[index];
      imagePaths.push(URL.createObjectURL(element));
    }
    // for (var key in event.target.files) {
    //   console.log(event.target.files[0]);
    //   console.log(event.target.files[key]);
    //   if(isNaN( event.target.files[key])){
    //     imagePaths.push(URL.createObjectURL(event.target.files[key]));
    //   }
    // }
     setImageClick([...isImageClick,...imagePaths]);
     event.target.files=null;
  }

  return (
    <div class={"card text-center " + classes.addTweet}>
      <div class={"card-header " + classes.header}>Home</div>
      <div class="card-body">
        <textarea
          rows={3}
          cols={20}
          placeholder="What's happening?"
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
              <input id="file-input" type="file" multiple  accept="image/*" name="image"  onChange={onImageClick} />
            </div>
          </div>
          <div className="col">
            <span class={"material-symbols-outlined " + classes.icons}>
              add_reaction
            </span>
            {/* <EmojiPicker onEmojiChange={onEmojiChange}/> */}
          </div>
          <div className="col">
            <button className={"btn " + classes.button}>Tweet</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo( AddTweet);
