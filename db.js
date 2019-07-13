const mongoose = require('mongoose');
const config = require('config');

const mongoURI = config.get('mongoConnectionString');

const connect = async () => {
	try {
		await mongoose.connect(mongoURI);

		console.log('MongoDB is running succesfully!');
	} catch (err) {
		console.error('Error connection to MongoDB ' + err.message);
		//exit with SIGHUP unix signal 
		process.exit(1);
	}
}

module.exports = connect;