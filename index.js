const express = require("express");
const app = express();
const userModel = require("./userdata");
const path = require("path");

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.get('/',(req,res)=>{
    res.render("form");
})

app.get('/read',async (req,res)=>{
  let allUsers = await userModel.find();
    res.render("index",{listOfUsers:allUsers});
})

app.post('/create',async (req,res)=>{
    let {name,email,image} = req.body;
   let createdUser= await userModel.create({
        name: /*req.body.*/name,
        email:email,
        image:image
    })
    res.redirect("/read");
})

app.get('/delete/:id',async (req,res)=>{
   let users = await userModel.findOneAndDelete({_id:req.params.id});
    res.redirect("/read");
})

app.get("/edit/:userid",async (req,res)=>{
   let user= await userModel.findOne({_id:req.params.userid});
       res.render("edit",{user});
})

app.post('/update/:userid',async (req,res)=>{
    let {image,email,name} = req.body;
    let updatedUser = await userModel.findOneAndUpdate({_id:req.params.userid},{image,name,email},{new:true});
    res.redirect('/read'); 
})

app.listen(3001);

