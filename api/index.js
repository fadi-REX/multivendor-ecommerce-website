const express = require('express');
const cors = require("cors");
const { default: mongoose } = require('mongoose');

const car = require('./models/car.js')
const User = require('./models/user.js')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');   //  for the cookies
const bcrypt = require('bcryptjs')  // password encyption
require ('dotenv').config() //so we can use the inside in the env file
const app = express();
const imageDownloader = require ('image-downloader')
const multer = require('multer')
const fs = require('fs')

const secret = bcrypt.genSaltSync(6);
const jwtSecret = 'randomStringABCER';

app.use(cookieParser());
app.use(express.json())  // to let express use json format
app.use('/uploads', express.static(__dirname+'/uploads/'))
// cors setup
app.use(cors({
  credentials: true,
  origin:"http://localhost:5173",
}));

// database connection 
mongoose.connect(process.env.mongo_url);



app.get('/test',(req,res) =>{
  res.send('test ok')
});

app.listen(4000, () =>{
    console.log("nice")
});


// register a user using the models user.js
app.post('/register',async(req,res)=>{
const {name,email,password,idcard,number} = req.body;
 try {
  const userdocument = await User.create({
      name,
      email,
      password : bcrypt.hashSync(password,secret),
      idcard,
      number,
     });
     res.json(userdocument);
 } catch (error) {
   res.status(422).json(error);
 }
 
});


// login functionality using express app
app.post('/login',async(req,res) => {
  const {email,password} = req.body;
  const userdoc = await User.findOne({email});
  if (userdoc) {
    const passok = bcrypt.compareSync(password, userdoc.password)
    if (passok){
      jwt.sign({email:userdoc.email, id:userdoc._id, name:userdoc.name, idcard: userdoc.idcard, number:userdoc.number}, jwtSecret,{},(err,token) =>{
        if(err) throw err;
        res.cookie('token',token).json(userdoc)
      })
     
    }
    else {
       
      res.status(422).json('pass not ok')
    }
  }
  else {
     res.status(422).json('not found') 
    }
})



//user profile 
app.get('/profile',(req,res)=> {
  const {token} = req.cookies;
  if(token) {
 jwt.verify(token,jwtSecret,{},(err,userData) =>{
   
   res.json(userData);
 });
  }
  else {
    res.json(null);
  }

  
})



// logout user

app.post('/logout',(req,res)=>{
  res.cookie('token','').json(true)
})





// upload image by link to the server 
app.post('/uploadBylink',async(req,res)=>{
  const {link} = req.body
  const newName =  Date.now() + '.jpg'
  await imageDownloader.image({
    url  : link,
    dest : __dirname + '/uploads/' + newName
  });

  res.json( __dirname + '/uploads/' + newName)

})

// upload image from pc
const photosMiddleWare = multer ({dest:'uploads'});
app.post('/upload',photosMiddleWare.array('photos',100),(req,res) => {
  const uploadedfiles = [];
  for(let i = 0 ; i < req.files.length;i++ )
    {
      const {path,originalname} = req.files[i]
      const parts = originalname.split('.')
      const ext = parts[parts.length-1]
      const newPath = path + '.' + ext;
      fs.renameSync(path,newPath)
      uploadedfiles.push(newPath.replace('uploads\\',''))
    }
   res.json(uploadedfiles) 
})



// add a car
app.post('/addcar',(req,res) =>{
 const {token} = req.cookies;
 const  {title,location, addedPhotos,description,types,contactInfo,price} = req.body;
 jwt.verify(token,jwtSecret,{},async(err,userData) =>{
   const carDoc = await car.create({
    owner : userData.id,
    title: title,
    location : location,
    photos: addedPhotos,
    description: description,
    contactInfo : contactInfo,
    carType : types,
    price : price,

  })
  res.json(carDoc)
 });
  
})

// updating the car info
app.put('/addcar', async (req,res) => {
 const {token} = req.cookies;
 const  {id,title,location, addedPhotos,description,types,contactInfo,price} = req.body;
 
 jwt.verify(token,jwtSecret,{},async(err,userData) =>{
    const carDoc = await car.findById(id)
    if(userData.id === carDoc.owner.toString()) {
      carDoc.set({
        title: title,
        location : location,
        photos: addedPhotos,
        description: description,
        contactInfo : contactInfo,
        carType : types,
        price : price,
      }
      )
      await carDoc.save()
      res.json('ok')
    }
 })
});













app.get('/mycars',async(req,res) => {
   const {token} = req.cookies;
   jwt.verify(token,jwtSecret,{},async(err,userData) =>{
     const {id} = userData;
     res.json(await car.find({owner:id}))  // find the cars where the owns is with this id
   } )
  
})




app.get('/uniquecar/:id', async (req,res) => {
   const {id} = req.params;
   res.json(await car.findById(id));
})






