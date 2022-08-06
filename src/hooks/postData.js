import React from 'react'
import  axios  from 'axios'

const postData = async(url,data) => {
    let result=  await axios.post(url,data,{headers: { Authorization: localStorage.getItem('token') }});
    return result;
}

export default postData