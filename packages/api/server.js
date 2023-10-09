const express = require("express");
const cors = require("cors");

const http = require("http");
const socketIo = require("socket.io");
const dbConfig = require("./src/config/db.config");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./src/models");

db.mongoose
  .connect(`mongodb+srv://${dbConfig.USER}:${dbConfig.PASSWORD}@${dbConfig.DB}.k4xq219.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// Socket.io logic
io.on("connection", (socket) => {
  console.log("::::::::::::::::::::::::::::::::A user connected");

  // Handle when a user sends a chat message
  socket.on("chat message", (message) => {
    // Save the message to MongoDB or perform any desired actions
    // For example, you can create a new message document in your MongoDB collection
    // and associate it with the user who sent the message
    const newMessage = new Message({
      text: message.text,
      sender: message.sender, // You may need to pass sender information when emitting messages
    });

    newMessage.save().then(() => {
      // Broadcast the message to all connected clients
      io.emit("chat message", newMessage);
    });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to tekys-demo application." });
});

// routes
require("./src/routes/auth.routes")(app);
require("./src/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

