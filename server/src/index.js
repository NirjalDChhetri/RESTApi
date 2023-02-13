import express from "express";
import connection from "./models/index.js"
import bookRoute from "./routes/bookRoute.js"
import "dotenv/config";
import cors from "cors";
const app= express();

app.get("/", (req, res)=>{
    res.send("Backend is Working");
});
app.use("/book", bookRoute); 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(express.static("public"));

app.listen(process.env.PORT, async()=>{
    console.log("Server has Started");
   
    try{
        await connection.authenticate();
        connection.sync({force:true});
     console.log("Connected to Database");
    }
    catch(err){
        console.log("Error database Connection");
    }
});