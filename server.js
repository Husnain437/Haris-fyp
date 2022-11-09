const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./database/db');
const authRoutes = require('./routes/auth');
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
app.use(cors());
app.use(morgan('dev'));

app.use(fileupload({
    useTempFiles: true
}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use('/api/auth', authRoutes);
app.get("/getUserImage/:path", (req, res) => {
    let file = req.params.path;
    const fileLocation = "./images/userImages/" + file;
    return res.sendFile(fileLocation, { root: __dirname })
  })

  app.get("/getPostImage/:path", (req, res) => {
    let file = req.params.path;
    const fileLocation = "./images/postImages/" + file;
    return res.sendFile(fileLocation, { root: __dirname })
  })



connectDB();

// app.get('/',(req, res) =>{
//     res.send('Inside Server');

// });

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`));