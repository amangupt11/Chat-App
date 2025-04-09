import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config({});

const PORT = process.env.PORT || 3000;
const _dirname = path.resolve();  

//Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'https://chat-app-aman.onrender.com',
    credentials:true
}
app.use(cors(corsOptions));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//Serve frontend
app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
})

server.listen(PORT,()=>{
    console.log(`server is running ${PORT}`);
    connectDB();
})