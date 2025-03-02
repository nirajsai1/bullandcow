import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/signup.css";
const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage("");

        if (username.length < 6) {
            setMessage("Username must be at least 6 characters");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setMessage("Password must have uppercase, lowercase, number, and special character.");
            return;
        }

        const response = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        setMessage(data.message || data.error);
    };

    return (
        <div className="signup-container">
    <h2>Signup</h2>
    <form className="signup-form" onSubmit={handleSignup}>
        <input className="signup-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input className="signup-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="signup-button" type="submit">Signup</button>
    </form>
    <p className="signup-message">{message}</p>
    <p className="signin-link">Already have an account? <Link to="/">Sign in</Link></p>
</div>

    );
};

export default Signup;
