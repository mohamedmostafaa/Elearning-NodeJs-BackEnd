const User =require('../models/user');
const Participate =require('../models/participate.model')
const Question = require('../models/question.model')
const Reponse = require('../models/reponse.model')
const bcrypt =require('bcryptjs');

    const jwt = require('jsonwebtoken'); 
    const secret="takwa"
    
exports.signup=(req,res)=>{

        const user= new User (req.body); 
        User.findOne({email:user.email},(err,result)=>{

        if(err){
         res.status(403).send({error:err})
        }
         
        if(result)
        {
            console.log('alreasy exists...'); 
            res.json({err:'already exists'}) ; 
        }else
        
        {
            user.password= bcrypt.hashSync(req.body.password,10); 
            user.save().then( result=>{
            res.json(result); 
        }) ;
        }
       
         
    }); 


}



exports.login=(req,res)=>{

    const user= req.body; 
    User.findOne({email:user.email},(err,result)=>{

    if(err){
     res.status(403).send({error:err})
    }
     
    if(!result)
    {
        res.status(403).json({errEmail:'email is not exists'}) ; 
    }else
    
    {
        user.password= bcrypt.compare(req.body.password,result.password,
            (err,isvalid)=>{
                if(!isvalid){
                    res.status(403).json({errPwd:'invalid password'}) ; 
                }
                else{
                    if(!result.isOk){
                res.status(403).json({errConfirm:'compte non conf...'}) ; 
                   }else{
                    const token =jwt.sign({
                        email:result.email,
                        role:result.role,
                        firstname:result.firstname,
                        lastname:result.lastname,
                        photo:result.photo,
                        _id:result._id}
                               ,secret)
                               res.json(token) ; 
                   }
            
                }
            }
            
            ); 
    
    }
   
     
}); 


}



exports.loginAdmin=(req,res)=>{
    const user= req.body; 
    User.findOne({email:user.email , role :'admin'},(err,result)=>{

    if(err){
     res.status(403).send({error:err})
    }
     
    if(!result)
    {
        res.status(403).json({errEmail:'email is not exists'}) ; 
    }else
    
    {
        user.password= bcrypt.compare(req.body.password,result.password,
            (err,isvalid)=>{
                if(!isvalid){
                    res.status(403).json({errPwd:'invalid password'}) ; 
                }
                else{
               
                    const token =jwt.sign({
                        email:result.email,
                        role:result.role,
                        firstname:result.firstname,
                        lastname:result.lastname,
                        photo:result.photo,
                        _id:result._id}
                               ,secret)
                               res.json(token) ; 
                   
            
                }
            }
            
            ); 
    
    }
   
     
}); 

}

exports.createUser = (req, res) => {
    const users = new User(req.body)
    users.save().then((result) => {
        res.end()
    })


}


exports.updateUserIsOk = (req, res) => { 

    User.updateOne({_id:req.params._id},{isOk:true})
    .then((result) => {res.end()})
}



exports.updateUser = (req, res) => { 

    User.updateOne({_id:req.body._id},req.body)
    .then((result) => {res.end()})
}

exports.getAllUser = (req, res) => { 
    User.find({role:{$nin : 'admin'}})
    .sort({'createdOn':-1}).exec()
   .then((result) => {res.json(result)})
}

exports.getUserById = (req, res) => { 
    User.findOne({_id:req.params._id})
    
    
    .then((result) => {res.json(result)})
}
exports.deleteOneUser = (req, res) => {
    const id =req.params._id
    User.deleteOne({_id:id})
    .then((result) => { 
    Question.deleteMany({user_id:id}).
    then((e)=>
    console.log("ok"))
    Reponse.deleteMany({user_id:id})
    .then((d) => 
    console.log("deleted"))
    res.end()})
     
    }

 exports.searchUser = (req, res) => { 
    User.find({role:'enseignant'})
    .populate('speciality_id')
    
    .then((result) => {
        var teacher =result.
        filter(x=>x.firstname.toLowerCase().
        indexOf(req.params.firstname_search.toLowerCase())>-1)
        
        res.json(teacher)})
}

exports.getAllEnseignant = (req, res) => { 
    User.find({role:'enseignant'})
    .sort({'createdOn':-1}).exec()
    .then((result) => {res.json(result)})
}
exports.get3Enseignant = (req, res) => { 
    User.find({role:'enseignant'}).limit(3)
    .sort({'createdOn':-1}).exec()
    .then((result) => {res.json(result)})
}

exports.deleteSelectionUser = (req, res) => {

    User.deleteMany({_id:{$in:req.body}})
   .then((result) => {res.end()})

}