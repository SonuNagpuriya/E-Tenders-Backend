import "../models/connection.js";
import jwt  from "jsonwebtoken";
import rs from "randomstring";
import url from "url";
import senMail from "./Email.controller.js";

//to link model
import UserSchemaModel from "../models/user.model.js";

export const save=async(req,res)=>{
    var userList=await UserSchemaModel.find();
    var l=userList.length;
    var _id=l==0?1:userList[l-1]._id+1;
    var userDetails={...req.body,"_id":_id,"status":0,"role":"user","info":Date()};
    try{
        await UserSchemaModel.create(userDetails);
        senMail(userDetails.email,userDetails.password);
        res.status(201).send({"status":true});
    }catch(error){
        res.status(500).json({"status":false});        
    }
};

export const login=async(req,res)=>{
  var condition_obj={...req.body,"status":1};
  var userList=await UserSchemaModel.find(condition_obj);
  if(userList.length!=0)
  {
    const payload=userList[0].email; 
    const key=rs.generate(50);
    const token = jwt.sign(payload,key); 
    res.status(200).json({"token":token,"userDetails":userList[0]});
  }
  else
    res.status(500).json({"token":"error"});  
};


export const fetch=async(req,res)=>{
  var condition_obj=req.query.condition_obj;
  var userList=await UserSchemaModel.find(condition_obj);
  if(userList.length!=0)
    res.status(200).json(userList);
  else
    res.status(404).json({"status":"Resource not found"});    
 };

 export var deleteUser=async(req,res)=>{
  let userDetails = await UserSchemaModel.findOne(req.body);
  if(userDetails){
      let user=await UserSchemaModel.deleteOne(req.body);   
      if(user)
        res.status(200).json({"status":"OK"});
      else
        res.status(500).json({"status": "Server Error"});
  }
  else
    res.status(404).json({"status":"Requested resource not available"});
  };



  export var update=async(req,res)=>{
    let userDetails = await UserSchemaModel.findOne(req.body.condition_obj);
    if(userDetails){
        let user=await UserSchemaModel.updateOne(req.body.condition_obj,{$set: req.body.content_obj});   
        if(user)
          res.status(200).json({"msg":"OK"});
        else
          res.status(500).json({"status": "Server Error"});
    }
    else
      res.status(404).json({"status":"Requested resource not available"});       
 };