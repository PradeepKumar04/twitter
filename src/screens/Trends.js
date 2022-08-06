import React, { useEffect, useState } from 'react';
import { GET_USERS } from '../API/Endpoints';
import getData from '../hooks/getData';
import classes from './Trends.module.css';
import User from './User';


const Trends = () => {
  const [users,setUsers]=useState([]);
  const [filteredData,setFilteredData]=useState([]);
  const [searchValue,setSearchValue]=useState('');

  useEffect(()=>{
    getData(GET_USERS).then((user)=>{
      setUsers(user.data.data);
      setFilteredData(user.data.data);
    })
  },[]);

  const onSearch=(e)=>{
    setSearchValue(e.target.value);
    let user=users.filter((data)=>{ 
      return data.userName.toLowerCase().includes(e.target.value.toLowerCase())});
    setFilteredData(user);
  }

  return (
    <div className={''+classes.card}>
          <div className="card">
      <div className="card-body">
        <input value={searchValue} onChange={onSearch} type="text" className={'form-control '+classes.font} placeholder='Search Users' />
        <span class={"material-symbols-outlined "+classes.search}>search</span>
                    
                     { searchValue=="" && <ul class={"list-group "+classes.font}>
                        <li className={"list-group-item "+classes.border}>
                          <small className='text-secondary'>Trending in Cognizant</small>
                          <h3>#FSE1Presentation</h3>
                          <small className='text-secondary'>6999 Tweeets</small>
                        </li>
                        <li className={"list-group-item "+classes.border}>
                          <p className={'text-primary '+classes.showmore}>show more</p>
                        </li>
                      </ul>
}

                      <ul class={"list-group "+classes.font}>
                        <li className={"list-group-item "+classes.border}>
                          <strong>Who to Follow</strong>
                        </li>
                        <ul class={searchValue=="" ?"list-group "+classes.users: "list-group "+classes.usersWithSearch}>
                          {
                          filteredData.length>0 ?  filteredData.map((user,index)=>{
                             return <User key={index} username={user.userName} firstName={user.firstName} />
                            }): <p>No Users Found</p>
                          }
                        </ul>

                        <li className={"list-group-item "+classes.border}>
                          <p className={'text-primary '+classes.showmore}>show more</p>
                        </li>
                      </ul>
      </div>
    </div>
    </div>
  )
}

export default Trends