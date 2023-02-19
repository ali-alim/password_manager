const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const passwordRoute = require("./routes/passwords");
const cors = require("cors");

dotenv.config();

app.use(cors());
app.use(express.json());

mongoose 
 .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
 .then(() => console.log("MongoDB connected!"))
 .catch(err => console.log(err));

app.use("/api/users", userRoute);
app.use("/api/passwords", passwordRoute);

app.listen(process.env.PORT, () => {
  console.log("Backend server is running!");
});
