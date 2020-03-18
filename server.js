const express = require('express');
const app = express();
const mongoose = require('mongoose');
const coursesRoute = require('./routes/courses')
const userRoute = require('./routes/users')
const imageRoute = require('./routes/image')
const  path = require("path");
const cors= require('cors');
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//fix cors problem
// mongoose.connect('mongodb://localhost:27017/courseExam', { useNewUrlParser: true });
// mongoose.connection.once('open', () => {
//   console.log('connected to mongo');
// });
// mongoose.connect('mongodb://<safwanheroku>:<Ss0560054277>@ds159371.mlab.com:59371/heroku_49v13xht', { useNewUrlParser: true },function(err){
   
//       if(err) {
//           console.log('Some problem with the connection ' +err);
//       } else {
//           console.log('The Mongoose connection is ready');
//       }
//   }
//   );

const db = require("./config/db")
 
mongoose.connect(db ,{useNewUrlParser:true});
mongoose.connection.once('open',function(){
  console.log("connected to mongo")
})
//app.use() midle were to chech the user loging status

app.use('/courses' , coursesRoute)
app.use('/users' , userRoute)
// app.use('/uploads', express.static('uploads'))
// app.use('/course/post' ,()=>{
//     console.log("post is work")
// })
app.use('/image' , imageRoute)



// ///route 
// app.get('/course/',(req,res)=>{
//     res.send("recived ")
// })

// app.post('/course/post',(req,res)=>{
//     res.send("recived ")
// })


//port
const port = process.env.PORT ||7000

app.use(cors({origin: process.env.CLIENT_ORIGIN || "http://localhost:3000"}));

app.listen(port, () => {
    console.log('listening ' + port);
});
