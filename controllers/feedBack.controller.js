const nodemailer = require("nodemailer");
const Notif = require('../models/notif.model');
const user = require('../models/user');

exports.sendFeedBack = (req, res) => {
    //user.findOne({role:'admin'}).then((admin)=>{
    //     const newNotif= new Notif({ 
    //         user_id:admin._id,
    //         course_id:result._id,
    //         textNotif:'suivie un nouveau cour postulé par : '
    //     })
    //     newNotif.save()

    // })
    sendMail(req,res)

}

function sendMail(req,res){

    var smtpTransport = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,// 587 kif tebda heberge ..465 local may9ele9ech ds tt cas 5ater nodemailer ye5dem 3azouz ken jet php nn 
             //google:less secure app :active , l'email via user hetha
                auth: { user: 'bk.takwa123@gmail.com', pass: 'Shadytexenim31122016' },
                tls: { 
                    cipher:'SSLv3',
                    rejectUnauthorized: false }, // do not fail on invalid certs 
            });
        
            var mailOptions = {
                to: 'bk.takwa123@gmail.com',
                from: req.body.email,
                subject: req.body.subject,
                text: req.body.context
            };
        
        
                smtpTransport.sendMail(mailOptions)
                    .then(() =>  res.end())
                    .catch((err) => 
                    res.status(500).json({ success: false,
                         message: err }))
        
           
}

