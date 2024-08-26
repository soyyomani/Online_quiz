const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDb = require("./config/db");

dotenv.config();

const app = express();

 
app.use(express.json()); 

 
const corsOptions = {
    origin: ["http://localhost:3000", "https://online-quiz-app-1tzo.onrender.com"],  
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,  
};
app.use(cors(corsOptions));

 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/profile', require('./routes/profile'));

 
if (process.env.NODE_ENV === 'production') {
  
    app.use(express.static(path.join(__dirname, 'client/build')));

 
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

 
const PORT = process.env.PORT || 5000;
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
