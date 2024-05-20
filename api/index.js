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
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3')
const fs = require('fs');
const multer = require('multer');

const secret = bcrypt.genSaltSync(6);
const jwtSecret = 'randomStringABCER';
const bucket = 'carrivo-images'


app.use(cookieParser());
app.use(express.json())  // to let express use json format
app.use('/uploads', express.static(__dirname+'/uploads/'))
// cors setup
app.use(cors({
  credentials: true,
  origin:"http://localhost:5173",
}));

// database connection 





// upload function using AWS S3

async function uploadToS3(path, originlFileName,mimetype) {
  const client = new S3Client({
    region: 'eu-north-1',
    credentials: {
       accessKeyId : process.env.S3_ACCESS_KEY ,
       secretAccessKey : process.env.S3_SECRET_ACCESS_KEY
    },

  })
  const parts = originlFileName.split('.')
  const ext = parts[parts.length - 1]
  const newFileName = Date.now() + '.' + ext
    await client.send(new PutObjectCommand({
    Bucket: bucket,
    Body: fs.readFileSync(path),
    Key: newFileName,
    ContentType: mimetype,
    ACL: 'public-read',
  }));

  
  return (`https://${bucket}.s3.amazonaws.com/${newFileName}`);

}












app.get('/',(req,res) =>{
  mongoose.connect(process.env.mongo_url);
  res.send('test ok')
});

app.listen(4000, () =>{
    console.log("nice")
});


// register a user using the models user.js
app.post('/api/register',async(req,res)=>{
mongoose.connect(process.env.mongo_url);
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
app.post('/api/login',async(req,res) => {
  mongoose.connect(process.env.mongo_url);
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
app.get('/api/profile',(req,res)=> {
  mongoose.connect(process.env.mongo_url);
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

app.post('/api/logout',(req,res)=>{
  res.cookie('token','').json(true)
})






// upload image from pc
const photoMiddleware = multer({dest:'/tmp'});
app.post('/api/upload', photoMiddleware.array('photos',100) ,async (req,res) => {
  const uploadedfiles = [];
  for(let i = 0 ; i < req.files.length;i++ )
    {
      const {path,originalname,mimetype} = req.files[i]
      const url = await uploadToS3(path,originalname,mimetype)
      uploadedfiles.push(url)
    }
   res.json(uploadedfiles) 
})



// add a car
app.post('/api/addcar',(req,res) =>{
 mongoose.connect(process.env.mongo_url);
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
app.put('/api/addcar', async (req,res) => {
 mongoose.connect(process.env.mongo_url);
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













app.get('/api/mycars',async(req,res) => {
   mongoose.connect(process.env.mongo_url);
   const {token} = req.cookies;
   jwt.verify(token,jwtSecret,{},async(err,userData) =>{
     const {id} = userData;
     res.json(await car.find({owner:id}))  // find the cars where the owns is with this id
   } )
  
})




app.get('/api/uniquecar/:id', async (req,res) => {
   mongoose.connect(process.env.mongo_url);
   const {id} = req.params;
   res.json(await car.findById(id));
})



app.get('/api/allcars', async (req,res)=> {
  mongoose.connect(process.env.mongo_url);
  res.json(await car.find())
})




app.post('/api/deletecar/:id', async (req,res) => {
  mongoose.connect(process.env.mongo_url);
   const {id} = req.params;
   res.json(await car.findByIdAndDelete(id));
})




