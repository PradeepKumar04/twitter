import React from 'react';
import { useState, useEffect } from "react";
import  axios  from 'axios'

const getData = async (url) =>  {
      let result=  await axios.get(url,{headers: { Authorization: localStorage.getItem('token') }});
     return result;
}

export default getData