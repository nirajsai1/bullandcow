const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
});
const User = mongoose.model("User", userSchema);
const isValidUsername = (username) => username.length >= 6;
const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};
app.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!isValidUsername(username)) {
            return res.status(400).json({ error: "Username must be at least 6 characters" });
        }
        if (!isValidPassword(password)) {
            return res.status(400).json({ error: "Password must contain uppercase, lowercase, number, and special character" });
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }
        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.post("/signin", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
