import React, { useState } from 'react';
import './EmojiPicker.css';

const EmojiPicker = (props) => {
    console.log("hello");
    const [chosenEmoji, setChosenEmoji] = useState(null);
  const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject);
      console.log(chosenEmoji);
  };

  return (
      <div className='emojis'>
          <p>hello</p>
          {/* <Picker onEmojiClick={onEmojiClick} /> */}
      </div>
  )
}

export default EmojiPicker