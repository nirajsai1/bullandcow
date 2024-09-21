import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore } from './firebase';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
const Signin = () => {
  const [un, setUn] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const ref = collection(firestore, 'message');
  const getname = (event) => {
    setUn(event.target.value);
    setErr(''); 
  };
  const validation = async (un) => {
    const q = query(ref, where('message', '==', un));
    const qss = await getDocs(q);
    return !qss.empty; 
  };
  const button = async () => {
    if (un.trim() === '') {
      setErr('Please enter a username');
      return;
    }
    const userExists = await validation(un);
    if (!userExists) {
      setErr('No user found with that username'); 
      return;
    }
    navigate('/app');
  };
  const newUser = () => {
    navigate('/Signup');
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter UserName"
        onChange={getname}
        value={un}
      />
      <button onClick={button}>Start</button>
      <button onClick={newUser}>New User</button>
      <br />
      {err && <p style={{ color: 'red' }}>{err}</p>} 
    </div>
  );
};
export default Signin;