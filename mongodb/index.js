const express = require('express')
const mongoose = require('mongoose')

const port = 8000;
const app = express();

app.use(express.urlencoded({extended: false}));

mongoose.connect('mongodb://127.0.0.1:27017/testDB')
.then(()=>console.log('Connected to MongoDB'))
.catch((err)=> console.log(err))

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String
}, {timestamps: true});

const userModel = mongoose.model('User', userSchema)

app.get('/', (req, res) => {
  res.send('Home Page');
})

app.post('/signup', async (req, res) => {
  // console.log(req.body)
  const body = req.body;
  if(
    !body ||
    !body.name ||
    !body.email ||
    !body.role
  ){
    return res.status(400).json({msg : 'All fields are required'})
  }

  const result = await userModel.insertMany({ name: body.name, email: body.email , role: body.role})

  res.status(201).json({msg: 'User created successfully', data: result})
})

app.listen(port,()=>{
  console.log(`listening on port ${port}`);
})