const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtEpire } = require('../config/keys');
const { token } = require('morgan');
const path = require('path');
const e = require('express');
const Post = require('../models/Post');
const Case =require('../models/Case');
const Ram = require('../models/Ram');
const Gpu = require('../models/Gpu');
const Psu = require('../models/Psu');
const Mobo = require('../models/Mobo');
const Ssd = require('../models/Ssd');
const Cpu = require('../models/Cpu');



exports.signupController = async (req, res) => {
  // console.log(req.body);

  const { username, email, password, role, address, country } = req.body;
  console.log("Body : ", req.body)

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        errorMessage: 'Email already exists',
      });
    }

    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.address = address;
    newUser.role = role;
    newUser.country = country;

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();

    res.json({
      successMessage: "Registration success. Please signin.",
    });

    //  console.log(newUser.password);

  } catch (err) {
    console.log('signupController error:', err);
    res.status(500).json({
      errorMessage: 'Server error',
    });
  }
};


exports.signinController = async (req, res) => {


  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errorMessage: 'Invalid credentials',
      });

    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errorMessage: 'Invalid credentials',
      });
    }

    const payload = {
      user: {
        _id: user._id,
      }
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 24000 }, (err, token) => {
      if (err) console.log('jwt error: ', err);
      const { _id, username, email, role } = user;
      console.log('tok', token);
      res.json({            //frontend token and user
        token,
        user: { _id, username, email, role }
      });
    });

  } catch (err) {
    console.log('siginController error:', err);
    res.status(500).json({
      errorMessage: 'server error',
    });
  }

};

exports.getUserInfo = async (req, res) => {
  const email = req.params.email;
  try {
    const loginUser = await User.findOne({ email: email });
    if (!loginUser) {
      console.log("Email does not exist");
      return res.status(422).json({ error: "Invalid Creadential" });
    }
    else {
      return res.status(201).json({ "userData": loginUser });
    }
  }
  catch (err) {
    console.log('Error : ', err);
  }
};

exports.EditUserInfo = async (req, res) => {
  

  const { username, address, country, phoneNumber, email } = req.body;
 
  try {
    const loginUser = await User.findOne({ email: email });
    if (!loginUser) {
      console.log("Email does not exist");
      return res.status(422).json({ error: "User not found" });
    }
    else {
      loginUser.username = username;
      loginUser.address = address;
      loginUser.country = country;
      loginUser.phoneNumber = phoneNumber;
    
      loginUser.save();
      //let newpath = path.join(process.cwd(), './images/userImages', image_url)
      //req.files.image.mv(newpath);

      return res.status(201).json({ message: "User profile edited successfully" });
    }
  }
  catch (err) {
    console.log('Error : ', err);
  }
  res.send("Hello")


}

exports.addUserImage=async(request,response)=>{
  console.log(request.body)
  
  const file = request.files.image_url;
  const {email}=request.body;
  const loginUser = await User.findOne({ email: email });

  if (!loginUser) {
    console.log("Email does not exist");
    return response.status(422).json({ error: "User not found" });
  }
  else {
    var image_url = email+"_"+file.name;
    loginUser.image = image_url;
    loginUser.save();
    let newpath = path.join(process.cwd(), './images/userImages', image_url)
    request.files.image_url.mv(newpath);
    return response.status(200).json({message:"Image uploaded successfully"})

  }

}


exports.addPost=async(req,res)=>{
  console.log("Image : ",req.files.image_url);
  console.log("Body : ",req.body);
  const{email,description,title}=req.body;


  try {
    const user = await User.findOne({ email:email });
    if (!user) {
      return res.status(400).json({
        errorMessage: 'Buyer not exist',
      });
    }
    var image = req.files.image_url;
    var img_url  = email+"_"+image.name;
    const newPost = new Post();
    newPost.buyeremail = email;
    newPost.description = description;
    newPost.title = title;
    newPost.image = img_url;
    await newPost.save();
    let newpath = path.join(process.cwd(), './images/postImages', img_url)
    req.files.image_url.mv(newpath);
    return res.status(200).json({message:"Post uploaded successfully"})

  }catch(err)
  {
    console.log("Message: ",err);
  }
  
}

exports.getAllPost=async(req,res)=>{
  try {
    const posts = await Post.find({ });
    if (!posts) {
      return res.status(400).json({
        errorMessage: 'No posts found',
      });
    }
    else
    {
      var postsResults = []


            for (var data in posts) {
                //console.log(jobs[name])
                const seller = await User.find({ email: posts[data].buyeremail });
                if (!seller) {

                    console.log("Seller not found " + ' ' + posts[data].buyeremail, "\n");
                }
                else {


                    var postData = { "sellerData": seller, "Postdata": posts[data] }
                    //console.log(jobs[name].recruiterEmail)
                    postsResults.push(postData)
                }
            }
      return res.status(201).json({message:postsResults});
    }
    
  }catch(err)
  {
    console.log('Error : ',err);
  }

}
exports.getAllCase=async(req,res)=>{
  try{
    const cases = await Case.find({ });
    
      return res.status(200).json({
        data: cases,
      
    })
    
  }
  catch(err){
    console.log(err);
  }
}
exports.getAllRam=async(req,res)=>{
  try{
    const rams = await Ram.find({ });
    
      return res.status(200).json({
        data: rams,
      
    })
    
  }
  catch(err){
    console.log(err);
  }
}
exports.getAllGpu=async(req,res)=>{
  try{
    const gpus = await Gpu.find({ });
    
      return res.status(200).json({
        data: gpus,
      
    })
    
  }
  catch(err){
    console.log(err);
  }
}
exports.getAllPsu=async(req,res)=>{
  try{
    const psus = await Psu.find({ });
    
      return res.status(200).json({
        data: psus,
      
    })
    
  }
  catch(err){
    console.log(err);
  }
}
exports.getAllSsd=async(req,res)=>{
  try{
    const ssds = await Ssd.find({ });
    
      return res.status(200).json({
        data: ssds,
      
    })
    
  }
  catch(err){
    console.log(err);
  }
}
exports.getAllMobo=async(req,res)=>{
  try{
    const mobos = await Mobo.find({ });
    
      return res.status(200).json({
        data: mobos,
      
    })
    
  }
  catch(err){
    console.log(err);
  }
}
exports.getAllCpu=async(req,res)=>{
  try{
    const cpus = await Cpu.find({ });
    
      return res.status(200).json({
        data: cpus,
      
    })
    
  }
  catch(err){
    console.log(err);
  }
}

