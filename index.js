var express         = require("express");
var app             = express();
const server        = require("http").createServer(app) ;
const cors          = require("cors") ;
const bodyParser    = require("body-parser") ;
const port          = 3000 ;
const io            = require('socket.io')(server,{pingTimeout: 30000}) ;

app.use(bodyParser.json()) ;
app.use(bodyParser.urlencoded({ extended : true})) ;
app.use(cors()) ;

import pluginController from './controllers/PluginController' ;


console.log("In app....") ;

app.get('/requests', pluginController.getAllPluginsRequests) ;
app.get('/views', pluginController.getAllPluginsViews) ;
app.post('/request/:requestId', pluginController.doRequest) ;


io.sockets.on('connection',(client) =>{
    pluginController.addClientSocket(client) ;
}) ;

server.listen(port) ;
