import React from 'react'
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom'
import App from './App.js';
import Signin from './Signin.js';
import Signup from './Signup.js';
const Home = () => {
  return (
    <Router>
        <nav>
        <Link to='/'></Link>
        </nav>
        <nav>
        <Link to='/signup'></Link>
        </nav>
        <nav>
        <Link to='/app'></Link>
        </nav>
        <Routes>
            <Route path='/' element={<Signin/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/app' element={<App/>}></Route>
        </Routes>
    </Router>
  )
}

export default Home
