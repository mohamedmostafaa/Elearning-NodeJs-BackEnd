const Visite = require('../models/visite.model');
exports.createVisite=(req,res)=>{
var today=new Date();
var d = today.getDate()+'-'+today.getMonth()+'-'+today.getFullYear()
console.log("d",d);
Visite.findOne({user_id:req.body.user_id,
    course_id:req.body.course_id,
    ip_adress:req.body.ip_adress,
    createdOn:d
}).then((result)=>{
   
    if(result){
        res.end()
    }else{
        console.log("new visite");
        var viste= new Visite(
            {user_id:req.body.user_id,
            course_id:req.body.course_id,
            ip_adress:req.body.ip_adress,
            createdOn:d
        })
        viste.save().then(()=>{
            console.log("saved");
            res.end()})
    }
})




}

exports.getVisiteByCoursId=(req,res)=>{
Visite.find({course_id:req.params.course_id}).then((result)=>{

    res.send(result)
})
    
}


