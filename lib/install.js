var cp = require('dank-copyfile');

console.log('Installing haproxy.conf to /etc/init/haproxy.conf');

cp(__dirname + '/../haproxy.conf', '/etc/init/haproxy.conf', function (err) {
	if (err) {
		return console.log('An error occurred, maybe you don not have permissions to write to /etc/?', err);
	}

	return console.log('All done.');
});
