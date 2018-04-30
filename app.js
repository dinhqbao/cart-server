// ./express-server/app.js
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
// import bb from 'express-busboy';
import http from 'http';
import socket from 'socket.io';

// import routes
import apiRoutes from './routes/api.route';

//import controller file
import * as orderController from './controllers/order.controller';

// define our app using express
const app = express();

const server = http.Server(app);
const io = socket(server);

// express-busboy to parse multipart/form-data
// bb.extend(app);

// socket.io connection
io.on('connection', (socket) => {
    console.log("Connected to Socket!!" + socket.id);
    socket.on('sendMessage', (data) =>{
        console.log(data.msg);
    })
    // Receiving Orders from client to create
    socket.on('addOrder', (Order) => {
        orderController.addOrder(io, Order);
    });
    // Receiving Orders from client to update
    socket.on('updateOrder', (Order) => {
        orderController.updateOrder(io, Order);
    });
    // Receiving Order to Delete
    socket.on('deleteOrder', (Order) => {
        orderController.deleteOrder(io, Order);
    });
    // socket.on('orderPaid', (orderId) => {
    //     socket.emit(orderId);
    // })
})

// allow-cors
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
    // configure app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// set the port
const port = process.env.PORT || 3001;
// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/sake', {
    useMongoClient: true,
});
app.use('/api', apiRoutes);
app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/index.html'));
    })
    // catch 404
app.use((req, res, next) => {
    res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});
// start the server
server.listen(port, () => {
    console.log(`App Server Listening at ${port}`);
});