import mongoose from 'mongoose';
import { Router } from 'express';
import Login from '../model/login';
import User from '../model/user';
import Chat from '../model/chat';
import Notification from '../model/notification';
import bodyParser from 'body-parser';
export default({ config, db }) => {
  let api = Router();
//adding a category
//v1/chat/add
  api.post('/add', (req, res) => {
    //check password or match password
      User.findOne({email:req.body.email},(err,user)=>{
        if(user==undefined){
         res.status(400).json({ message: 'User not found!' });
     }else{
 Login.findOne({email:req.body.email},(err,login)=>{
 
     if(!err){
 
         if(login==undefined){ //user not found
 
             res.status(400).json({ message: 'User not Logged In!' });
         }else{
 
             if(login.token==req.body.token ){  //token matching and only admin can add
                let newChat=new Chat();
               newChat.from=user._id;
               newChat.towards=req.body.towards;
             
               newChat.chatId = parseInt(user._id, 16) > parseInt(req.body.towards, 16) ? user._id + req.body.towards : req.body.towards + user._id;
               newChat.message=req.body.message;
               newChat.save((err)=>{

                if(!err){
                    Notification.findOne({
                        
                        $and: [
                            { userId:req.body.towards },
                            { $or: [{ saw:1 }, { saw:0 }] }
                        ]},(err,notification)=>{

                        if(!err){

                            if(notification==null){
                                let newNotification=new Notification();
                                newNotification.userId=req.body.towards;
                                newNotification.message="You have a message!"
                                newNotification.description="Message recieved from "+user.fname;
                                newNotification.type=1;
                                newNotification.refId=user._id;
                                newNotification.link="/chat";
                                newNotification.save();

                            }else{
                                console.log(notification);
                                notification.saw=0;
                                notification.time=Date.now();
                                notification.save();
                            }
                        }

                    });
                   
                    res.status(200).send({message:"chat added!"});
                }else{
                    res.status(500).send(err);
                }
               });
                    
                    
 
 
             }else{
                 res.status(400).json({ message: 'invalid token!' });
 
             }
       
         }
        
     }else{
 
             res.status(400).send(err);
         }
   
 });
     }
             });
   });
//v1/chat/get
api.post('/get/:userId', (req, res) => {
    //check password or match password
      User.findOne({email:req.body.email},(err,user)=>{
        if(user==undefined){
         res.status(400).json({ message: 'User not found!' });
     }else{
 Login.findOne({email:req.body.email},(err,login)=>{
 
     if(!err){
 
         if(login==undefined){ //user not found
 
             res.status(400).json({ message: 'User not Logged In!' });
         }else{
 
             if(login.token==req.body.token ){  //token matching and only admin can add
                
                let chatId = parseInt(user._id, 16) > parseInt(req.params.userId, 16) ? user._id + req.params.userId : req.params.userId + user._id;
                    
                   Chat.find({chatId:chatId},(err,chat)=>{
                    if(!err){
                        if(chat===undefined){

                            res.status(400).json({message:"no chat found!"});
                        }else{

                            res.status(200).json(chat);
                        }

                    }else{

                        res.status(500).send(err);
                    }

                   }); 
 
 
             }else{
                 res.status(400).json({ message: 'invalid token!' });
 
             }
       
         }
        
     }else{
 
             res.status(400).send(err);
         }
   
 });
     }
             });
   });
  return api;
}
