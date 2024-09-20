import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [un,setUn]=useState('');
    const navigate=useNavigate();
    const getvalue = (event) =>
    {
        setUn(event.target.value);
    }
    const create = () =>
    {
        navigate('/');
    }
  return (
    <div>
      <input type='text' placeholder='Enter UserName' onChange={getvalue}></input>
      <button onClick={create}>Create Account</button>
    </div>
  )
}

export default Signup
