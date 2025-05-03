import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/signin.css";
import axios from "axios";
const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();
        setMessage("");

        const response = await fetch("http://localhost:5000/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem("token", data.token);
            navigate("/app");
        } else {
            setMessage(data.error);
        }
    };

    return (
        <div className="signin-container">
            <h2>Signin</h2>
            <form onSubmit={handleSignin} className="signin-form">
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    className="signin-input"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="signin-input"
                />
                <button type="submit" className="signin-button">Signin</button>
            </form>
            {message && <p className="signin-message">{message}</p>}
            <p className="signup-link">Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
    );
};

export default Signin;
