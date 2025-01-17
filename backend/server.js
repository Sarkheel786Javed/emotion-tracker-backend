const  express = require ("express");
const cors = require ("cors");
const dotenv = require("dotenv");
dotenv.config();
const {connectDB} = require  ("./dbconfig/db");
const emotionRoutes  = require("./routes/emotionRoutes");

connectDB();
const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
// for product files 
app.use(express.static('public')); 


app.use("/api/emotions", emotionRoutes );
app.use(express.static("public"));


app.get("/test", async (req, res) => {
  res.json({ message: "Hello!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server Started on localhost:7000");
});
