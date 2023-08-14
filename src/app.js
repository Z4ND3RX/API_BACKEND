import express from "express";
import postsRoutes from "./routes/posts.routes.js";
import usersRoutes from "./routes/users.routes.js";
import { PORT } from "./config.js"; "./config.js";

const app = express()

app.use(express.json())

app.use("/api", postsRoutes);
app.use("/api", usersRoutes);

app.listen(PORT)
console.log('Server  on port', PORT)