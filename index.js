var express = require ("express");
var app = express();


app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views","./views");

var server = require("http").Server(app);
server.listen(3000);
var io = require("socket.io")(server);

io.on("connection", function(socket){
    console.log("A user connected: "+socket.id);
    socket.on("disconnect",function(){
        console.log("A user disconnected: "+socket.id);
    });
    socket.on("chat message",function(msg){
        console.log(socket.id +" send message: "+msg);
        //socket.broadcast.emit("chat message", msg);
        io.emit("chat message", msg);
    });
});

app.get("/", function(req, res){
    res.render("trang chu");
});