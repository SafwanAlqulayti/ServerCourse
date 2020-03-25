const express = require('express');
const cors= require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT ||7000

const coursesRoute = require('./routes/courses')
const userRoute = require('./routes/users')
const imageRoute = require('./routes/image')
const  path = require("path");

app.use(cors())
app.use(express.json());

const uri = process.env.ATLAS_URI;
  mongoose.connect(uri , {useNewUrlParser: true , useCreateIndex: true});
  const connection = mongoose.connection
  connection.once("open",()=>{
    console.log("Mongo db connection is working ")
  })

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use(express.urlencoded({ extended: true }));
 
// const db = require("./config/db")
 
// mongoose.connect(db ,{useNewUrlParser:true});
// mongoose.connection.once('open',function(){
//    console.log(`connected to mongo${db}`)
   
// })

//app.use() midle were to chech the user loging status

app.use('/courses' , coursesRoute)
app.use('/users' , userRoute)
 
app.use('/image' , imageRoute)


app.use(cors({origin: process.env.CLIENT_ORIGIN || "http://localhost:3000"}));
app.listen(port, () => {
    console.log('listening ' + port);
});
