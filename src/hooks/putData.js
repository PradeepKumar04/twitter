import React from 'react';
import { useState, useEffect } from "react";
import  axios  from 'axios'

const putData = async (url,data) =>  {
      let result=  await axios.put(url,data,{headers: { Authorization: localStorage.getItem('token') }});
     return result;
}

export default putData