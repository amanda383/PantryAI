require('dotenv').config();
import express, {NextFunction, Request,Response} from "express"
export const app = express()
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authroutes";
// import userRoutes from "./routes/userRoutes";
// import recipeRoutes from "./routes/recipeRoutes";
// import imageRoutes from "./routes/imageRoutes";

//body parser
app.use(express.json({limit : "50mb"}));

//cookie parser
app.use(cookieParser())

//cors => cross origin resource sharing
app.use(cors({
  origin: process.env.ORIGIN || "http://localhost:3000",
}))


// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/recipes", recipeRoutes);
// app.use("/api/images", imageRoutes);


//testing API
app.get("/test", (req:Request,res:Response,next:NextFunction) => {
    res.status(200).json({
        success:true,
        message:"api is working"
    })
})

//unknown route
// app.all("*", (req: Request, res: Response, next: NextFunction) => {
//   const err = new Error(`Route ${req.originalUrl} not found`) as any;
//   err.statusCode = 404;
//   next(err);
// });