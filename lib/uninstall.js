var unlink = require('fs').unlink;

console.log('Uninstalling /etc/init/haproxy.conf');

unlink('/etc/init/haproxy.conf', function (err) {
	if (err) {
		return console.log('Error removing file, maybe you do not have write permissions to /etc/?', err);
	}

	return console.log('All done.');
});
