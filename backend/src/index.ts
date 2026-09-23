import express, { type Request, type Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import dns from "dns";

// Use Google DNS for Node.js DNS resolution
dns.setServers([
    "8.8.8.8",
    "8.8.4.4",
]);

const app = express();

app.use(express.json());
app.use(cors());

app.get("/test", async (req: Request, res: Response) => {
    res.json({ message: "Hello" });
});


app.use("/api/my/user" , myUserRoute);

const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in .env");
}

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Connected to database");

        app.listen(PORT, () => {
            console.log(`Server is running on localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:");
        console.error(error);
        process.exit(1);
    });