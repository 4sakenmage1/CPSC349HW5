var Websocket = require("ws");
var WebsocketServer = Websocket.Server;
var port = 3001;
var ws = new WebsocketServer({
  port: port
});
var messages = [];
//console.log("Websocket Server Started");


ws.on("connection", function(socket) {
  //console.log("client connection established");

  messages.forEach(function(msg) {
    socket.send(msg);
  });


  socket.on("message", function(data) {
    //console.log("message receive " + data);
    messages.push(data);

    ws.clients.forEach(function(clientSocket) {
      clientSocket.send(data)
    }); //socket.send(data);

  });
});
