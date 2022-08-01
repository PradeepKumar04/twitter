import React from 'react';
import { useState, useEffect } from "react";
import  axios  from 'axios'

const useFetch = async (url) =>  {
      let result=  await axios.get(url);
      result.json();
     return result;
}

export default useFetch