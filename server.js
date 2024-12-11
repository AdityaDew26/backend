import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import UserRoutes from "./Routes/userRoutes.js"
import projectRoutes from "./Routes/projectRoute.js"
import { fileURLToPath } from "url";

dotenv.config()

const app = express()

const express = require("express");
const path = require("path");

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow requests from allowed origins
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'],    
    credentials: true,                                  
}));


app.options('*', cors());

app.use(express.json())



// Routes

app.use("/api/users", UserRoutes)
app.use("/api/projects", projectRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
})

// mongo db Connection

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Database is fetched and connected")
})
.catch((error)=> {
    console.log("error connecting mongodb",error)
})


// Contact Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// API Route to handle contact form submissions
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ success: true, message: "Message saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving the message" });
  }
});


// App start port

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`server is running in your port on ${PORT}`)
})