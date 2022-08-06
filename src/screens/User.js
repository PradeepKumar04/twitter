import React from 'react';
import classes from './User.module.css';

const User = (props) => {
    console.log(props);
  return (
    <li className="list-group-item ">
        <div className='row'>
              <div className='col-12'>
                  <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" className={classes.profilePic} alt="" />
                  <div className={classes.name}>
                      <b>{props.username} <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg" className={classes.verifiedTick} /></b>
                      <p>@{props.firstName}</p>
                  </div>
                  <div>
                    <button className={'btn '+classes.button}>Follow</button>
                  </div>
              </div>
            </div>
    </li>
  )
}

export default User