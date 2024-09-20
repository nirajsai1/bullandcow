import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const [un,setUn]=useState('');
    const navigate=useNavigate();
    const getname = (event) =>
    {
        setUn(event.target.value);
    }
    const button = () =>
    {
        navigate('./app');
    }
    const newUser = () =>
    {
        navigate('./Signup');
    }
  return (
    <div>
      <input type='text' placeholder='Enter UserName' onChange={getname}></input>
      <button onClick={button}>Start</button>
      <button onClick={newUser}>New User</button>
    </div>
  )
}

export default Signin
