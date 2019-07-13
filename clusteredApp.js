const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
	let numberCpus = os.cpus().length;
	console.log('Clustering to ' + numberCpus + " cpus")
	for (let i = 0; i < numberCpus; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code) => {
		if (code != 0 && !worker.exitedAfterDisconnect) {
			console.log('Worker crashed, starting a new one.');
			cluster.fork();
		}
	})
} else {
	require('./server.js');
}