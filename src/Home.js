import React from 'react'
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom'
import App from './js/App.js';
import Signin from './js/Signin.js';
import Signup from './js/Signup.js';
const Home = () => {
  return (
    <Router>
        <nav>
    <Link to="/"></Link>
    <Link to="/signup"></Link>
    <Link to="/app"></Link>
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
