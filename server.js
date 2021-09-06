const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
//const bodyParser = require('body-parser');

const app = express();

// Connect database
connectDB();

// Init middleware
//app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json({ extended: false }))

// Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));

// Serve static assets in production
if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));