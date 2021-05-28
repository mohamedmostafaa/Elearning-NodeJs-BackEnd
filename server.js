
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connection = mongoose.connection;

const multipart = require('connect-multiparty');
const { Socket } = require('dgram');
const multipartMiddleware = multipart({ uploadDir: './uploads' })

var clients = []

app.use(cors({
	credentials: true


}));
//photo
app.post('/upload', multipartMiddleware, (req, res) => {
	var file = req.files.uploads

	res.send(file[0])
})

app.use(express.static('./'))

app.get('/useronline',(req,res)=>{ res.send(clients)})




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./router/user.router')(app)
require('./router/e_learnig.router')(app)

app.use((req, res) => {//mon propre middleware :pour gerer les req de type get
	//si on va entrer un req n'existe pas on obtien un err ,exp :http://localhost:3000/blablabala
	const err = new Error('404-Not found!!!');
	err.status = 404;
	res.json({ msg: '404-Not found!!!', err: err });
});

app.set('port', (process.env.port || 3000));

mongoose.connect('mongodb://localhost:27017/PFE2020', { useNewUrlParser: true });

//connection de type Connection:gestion des event : open (tester l ouverture de base 1 suel fois) et error(ecoute l err avec on )
connection.on('error', (err) => {
	console.error(`Connection to MongoDB Error: ${err.message}`);
});

connection.once('open', () => {
	console.log('Connected to MongoDB');

	//socket require
	const http = require('http');
	var server = http.Server(app)

	var socketIo = require('socket.io')
	var io = socketIo(server);//socket ma7louwla 3la server



	//socket
	io.on('connection', (socket) => {
		console.log('socket !!!!', socket.id);

		socket.on("refrecllayout", (user_id) => {
			clientSet(user_id, socket.id)

		})

		socket.on('msg', (esta9belmsg) => {
			console.log("esta9belmsg", esta9belmsg);
			//kif yesta9bel yeb3eth--w lesta9beltou eb3thou w barra cote client

			var rec_client = clientGet(esta9belmsg.rec_id)
			if (rec_client) {
				io.to(rec_client.sid).emit('lijeyminSERV', esta9belmsg)
			}



		})

		socket.on('disconnect',(abc)=>{
			console.log("user diconnected !! ...",socket.id);
		    clients=clients.filter(x=>x.sid!=socket.id)
		})
	})
	

	function clientSet(userId, socketId) {
		var e = {
			_id: userId,
			sid: socketId
		}
		var index = clients.findIndex((c) => c._id == userId);
		if (index >= 0) {

			clients[index] = e

		} else {
			clients.push(e)
		}
		console.log("clients", clients);
	}

	function clientGet(userId) {
		return clients.find((c) => c._id == userId);
	}



	server.listen(app.get('port'), () => { console.log(`Express server listening on port ${app.get('port')}`); });
});

