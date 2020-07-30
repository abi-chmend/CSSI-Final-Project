// Abigail Batinga

// Create player object
var players = {};

// Reference express module
var express = require('express');

// Create new instance of express
var app = express();

// Supply app to HTTP server
var server = require('http').Server(app);
server.listen(3000, function () {
	console.log(`Listening on ${server.address().port}`);
});

// Tell server to serve index.html as root page
app.get('/', 
  function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
  }

);

// Allow server to render static files in public directory
app.use(express.static('public'));

// Reference socket.io module and listen to server
var io = require('socket.io')(server);


// Listen for connections and disonnections from client
io.sockets.on('connection', 
  function (socket) {



    // Lets us know user has connected
    console.log('a user connected ' + socket.id);
    
    // Store data for each player, using socket id as key
    players[socket.id] = {
      name: "",
      move: ""
    }

    // Receive client name
    socket.on('gotName',

      function(nameObj) {
        
        // Set player's name to received name
        players[socket.id].name = nameObj.name;


        // Test that name is being received
        console.log("Recieved: " + players[socket.id].name);
      }

    );

    // Receive client label from classifier
    socket.on('gotLabel',
    
      function(labelObj) {
        players[socket.id].move = labelObj.label;


        // Test that label is being received
        console.log("Received: " + players[socket.id].move);
      }
    
    );



  socket.on('disconnect', 
    function () {
      console.log('user disconnected');
    } // End disconnect function
  );

  } // End connection function
);




