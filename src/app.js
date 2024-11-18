import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan";


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))



app.use(express.json({limit: "50kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(morgan("dev"));


import branchRouter from "./routes/branch.routes.js";
import teacherRouter from "./routes/teacher.routes.js";
import courseRouter from "./routes/course.routes.js";
import testRouter from "./routes/test.routes.js";

app.use("/api/branch",branchRouter);
app.use("/api/teacher",teacherRouter);
app.use("/api/course",courseRouter);
app.use("/api/test",testRouter);





app.all('*',(req, res) => {
    res.send('Sorry !! Request Failed ,Try after sometime.');
});


export { app }