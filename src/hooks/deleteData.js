import React from 'react';
import { useState, useEffect } from "react";
import  axios  from 'axios'

const deleteData = async (url) =>  {
      let result=  await axios.delete(url,{headers: { Authorization: localStorage.getItem('token') }});
     return result;
}

export default deleteData