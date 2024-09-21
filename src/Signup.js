import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore } from './firebase';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
const Signup = () => {
  const [un, setUn] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const ref = collection(firestore, 'message');
  const goback = () =>
    {
      navigate('/');
    }
  const getvalue = (event) => {
    setUn(event.target.value);
  };
  const checkUsernameExists = async (username) => {
    const q = query(ref, where('message', '==', username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; 
  };
  const create = async () => {
    if (un.trim() === '') {
      setError('Username cannot be empty!');
      return;
    }
    try {
      const usernameExists = await checkUsernameExists(un);
      if (usernameExists) {
        setError('Username already exists. Please choose another one.');
        return;
      }
      let data = {
        message: un,
      };
      await addDoc(ref, data); 
      console.log('Document successfully written!');
      navigate('/'); 
    } catch (error) {
      console.error('Error adding document: ', error);
      setError('An error occurred while creating your account.');
    }
  };
  return (
    <div>
      <input
        type='text'
        placeholder='Enter UserName'
        value={un}
        onChange={getvalue}
      />
      <button onClick={create}>Create Account</button>
      <button onClick={goback}>Had a acc</button>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
    </div>
  );
};

export default Signup;

