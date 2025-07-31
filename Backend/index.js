const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const router = require('./Routers/auth');
const db = require('./config/database');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const Router = require('./Routers/udpate');
const { cloudinaryConnect } = require('./config/cloudinary');
const createRouter = require('./Routers/create');
const interactionRouter = require('./Routers/interaction');
const getRouter = require('./Routers/getData');


app.use(cookieParser());
app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use('/api/v1', router);
app.use('/api/v1/update', Router);
app.use('/api/v1/create', createRouter);
app.use('/api/v1/interactions', interactionRouter);
app.use('/api/v1/getData', getRouter);
cloudinaryConnect();
db.connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});