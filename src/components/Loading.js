import React from 'react'
import classes from './Loading.module.css';

const Loading = () => {
  return (
    <div className={classes.loading}>
    <div className="d-flex justify-content-center">
  <div className={'spinner-border '+classes.spinner} role="status">
  </div>
    </div>        
    </div>
  )
}

export default Loading