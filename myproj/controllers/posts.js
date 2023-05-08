
const express = require('express')
const mongoose = require('mongoose')
const db = require('../models');
const PostMess = db.postSchema;

const router = express.Router();
const routingApis = {
    getposts: (req,res)=>{
        getposts(req.body,res)
    },
    getPost: (req,res) =>{
        getPost(req,res)
    },
    createPost: (req, res)=>{
        createPost(req.body,req,res)
    },
    updatedPost: (req,res)=>{
        updatedPost(req.body,res)
    },
    deletePost: (req,res)=>{
        deletePost(req.body ,res)
    },
    likePost: (req, res)=>{
        likePost(req.body,res)
    },
    upload:(req, res)=>{
        uploading(req.body, res)
    }
}



async function uploading(req,res){
    try{
        const { image } = req.files;
        if (!image) return res.sendStatus(400);

     image.mv(__dirname + '/mydoc/' + image.name);

        res.sendStatus(200);
    }catch(err){
        res.status(404).json({ message: err.message });
    }
    // body...
}
async function getposts(parameters,res){
    try {
        const postMessages = await PostMess.findAll({where:{id: parameters.user_id}});
                
        res.status(200).json({"Data":postMessages});
    }catch(error) {
        res.status(404).json({ message: error.message });
    }
}

async function getPost(req,res){
    const { id }  = req.params;
    console.log("parameters",req.params)
    try {
        const post = await PostMess.findOne({where:{id:id}});
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log("errors",error)
    }
}

async function createPost(input,req, res){
    try {
    console.log(input)
    input.selectedFile =req.file.originalname
   
    let newPostMessage = await PostMess.create(input)
      
        await newPostMessage.save();
        res.status(201).json(newPostMessage );
    } catch (error) {
        console.log("inside catch",error)
        res.status(409).json({ message: error.message });
    }
}


async function updatedPost(parameters,res){
    try{

    const  id  = parameters.id;
    console.log("id", id)
    console.log("parameters",parameters)
    
    if (!await PostMess.findByPk(id))return res.status(404).send(`No post with id: ${id}`)

    const updatedPost = { 
        creator : parameters.createPost, 
        title : parameters.title, 
        message : parameters.message, 
        tags : parameters.tags, 
        id: parameters.id 
    };
    
    await PostMess.update(updatedPost,{where:{id:id}})
    res.statusCode = 200
    res.json({"message": "Post updated successfully."});
}
catch(err){

    res.json(err);
}
}


async function deletePost(parameters, res){

    try{
    console.log("inside deleteposts", parameters)
    if (!await PostMess.findByPk(parameters.id))return res.status(404).send(`No post with id: ${parameters.id}`)

    
    await PostMess.destroy({where:{ id: parameters.id }});
    res.json({ message: "Post deleted successfully." });

    e
    }catch(err){
        console.log("error", err)
        res.json({"ERROR::": "No Record Found"})
    }
}

async function likePost(parameters, res){
    try{
    let result = await PostMess.findOne({where:{ id: parameters.id}});
    if (!result){
        res.status(404).send(`No post with id: ${parameters.id}`);
    }
    else{
   let updateval ={
    "likeCount" : result.likeCount + 1
   }
    const updatedPost =await PostMess.update(updateval,{where :{ id : parameters.id  }});
    res.json(updatedPost);
    }
}catch(err){
    res.statusCode = 400
    res.json({"ERROR":err})
}
}

module.exports = routingApis;
