const express = require('express');
const app = express();
const dbConnect = require('./db');
const errorHandler = require('errorhandler');

//either local dev port or server-specifed env variable
const PORT = process.env.PORT || 4000;

//connect to a database
dbConnect();

//init middlewares
app.use(express.json());
//error handling
app.use(errorHandler());

//define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));

app.get('/', (req, res) => res.send('API works using process ' + process.env.INSTANCE_ID));




app.listen(PORT, () => {
	console.log('App running at port ' + PORT);
});