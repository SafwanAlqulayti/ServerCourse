const express = require('express');
const cors= require('cors');
const mongoose = require('mongoose');


const app = express();
const port = process.env.PORT ||7000

const coursesRoute = require('./routes/courses')
const userRoute = require('./routes/users')
const imageRoute = require('./routes/image')
const  path = require("path");
app.use(express.json());

app.use(cors())
app.use('/courses' , coursesRoute)
app.use('/users' , userRoute)
 
app.use('/image' , imageRoute)
require('dotenv').config();
const uri = process.env.ATLAS_URI;
 if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  // uri = process.env.ATLAS_URI;

}

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.use(express.urlencoded({ extended: true }));


 
  // mongoose.connect(uri , {useNewUrlParser: true , useCreateIndex: true});
  // const connection = mongoose.connection
  // connection.once("open",()=>{
  //   console.log("Mongo db connection is working ")
  // })


 
const db = require("./config/db")
 
mongoose.connect(db ,{useNewUrlParser:true});
mongoose.connection.once('open',function(){
   console.log(`connected to mongo${db}`)
   
})

//app.use() midle were to chech the user loging status



app.use(cors({origin: process.env.CLIENT_ORIGIN || "http://localhost:3000"}));
app.listen(port, () => {
    console.log('listening ' + port);
});
