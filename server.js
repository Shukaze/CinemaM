const cors = require('cors');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const CookieParser = require('cookie-parser')
const movieRoute = require('./routes/movies');
const genreRoute = require('./routes/genres');
const userRoute = require('./routes/users');

const { auth } = require("./middleware/auth");
const { Chat } = require("./models/Chat");
const app = express();

const User = require('./models/User');
const server = require("http").createServer(app);
const io = require("socket.io")(server)

//To prevent CORS errors
app.use(cors());
app.use(CookieParser());
app.use(express.json());


//Connecting mongoDB
const config = require('./config/keys');
const connect = mongoose.connect(config,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

  app.use('/uploads', express.static('uploads'));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));



//App routes to handle requests
app.use('/api/movies', movieRoute);
app.use('/api/genres', genreRoute); //cache
app.use('/api/users', userRoute);
app.use('/api/chat', require('./routes/chat'));


const multer = require("multer");
const fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  // fileFilter: (req, file, cb) => {
  //   const ext = path.extname(file.originalname)
  //   if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
  //     return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
  //   }
  //   cb(null, true)
  // }
})
 
var upload = multer({ storage: storage }).single("file")

app.post("/api/chat/uploadfiles", auth ,(req, res) => {
  upload(req, res, err => {
    if(err) {
      return res.json({ success: false, err })
    }
    return res.json({ success: true, url: res.req.file.path });
  })
});


io.on("connection", socket => {

  socket.on("Input Chat Message", msg => {

    connect.then(db => {
      try {
          let chat = new Chat({ message: msg.chatMessage, sender:msg.userId, type: msg.type })

          chat.save((err, doc) => {
            console.log(doc)
            if(err) return res.json({ success: false, err })

            Chat.find({ "_id": doc._id })
            .populate("sender")
            .exec((err, doc)=> {

                return io.emit("Output Chat Message", doc);
            })
          })
      } catch (error) {
        console.error(error);
      }
    })
   })

})

//Serve our static asset if in production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  
  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}
else {
  app.use(express.static(path.join(__dirname, '/frontend/public')));
  app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./frontend/public/index.html"));
  });
}


var exit = function exit() {
    setTimeout(function () {
      process.exit(1);
    }, 0);
  };
app.use((error, req, res, next) => {
    res.status(error.status || 500).json(error.message); 
    // exit();
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));
module.exports = app; 