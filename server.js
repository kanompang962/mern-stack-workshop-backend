const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
// routes
const blogRoute = require('./routes/blog');
const authRoute = require('./routes/auth');

require('dotenv').config();

const app = express();

// connect to database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
}).then(() => console.log('connect to database successfully'))
    .catch((err) => console.log(err));

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// routes
app.use('/api', blogRoute);
app.use('/api', authRoute);


const port = process.env.PORT || 8080;
app.listen(port, () => console.log('server listening on port ' + port));