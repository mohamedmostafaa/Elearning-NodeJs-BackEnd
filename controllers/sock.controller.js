const Sock = require('../models/sock.model');



exports.createSock= (req, res) => {
    const sock = new Sock(req.body)
    sock.save().then((result) => {
        res.send(result)
    })


}


exports.getAllSocks = (req, res) => {
//marra ana send w inta rec w marra o5ra l3akes bech te3mel find or lil 2 cas
//user1 user2  m3a router

       Sock.find()
       .or([{'send_id':req.params.user1,'rec_id':req.params.user2} ,
        {'send_id':req.params.user2,'rec_id':req.params.user1}])
        .populate('rec_id')
        . populate('send_id')
          .then((result) => { res.json(result) })
}

exports.getUsersSock = (req, res) =>{
    Sock.find().or([
        {
        'send_id':req.params.user1},
        {'rec_id':req.params.user1}
        ])
        .populate('rec_id')
        . populate('send_id')
    .then((result) => { res.json(result) })

}

exports.markAsSeenSock=(req,res)=>{

        Sock.updateMany({
            'rec_id':req.params.user1 ,
        'send_id':req.params.user2} 
        
         ,{isSeen:true}).then((result)=>{res.json(result)})
        
       


}





