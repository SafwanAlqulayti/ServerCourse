const express = require('express');
const app = express();
const mongoose = require('mongoose');
const coursesRoute = require('./routes/courses')
const userRoute = require('./routes/users')
const imageRoute = require('./routes/image')

const cors= require('cors');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//fix cors problem
app.use(cors());
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
const port = 7000
app.listen(port, () => {
    console.log('listening ' + port);
});
