#!/usr/bin/node

var spawn = require('child_process').spawn;
var argv = require('optimist').argv;

if (argv.install) {
	return require('./lib/install.js');
}
else if (argv.uninstall) {
	return require('./lib/uninstall.js');
}

var CONFIG = process.env.CONFIG || '/etc/haproxy/haproxy.cfg';
var HAPROXY = process.env.HAPROXY || '/usr/sbin/haproxy';
var EXTRAOPTS = process.env.EXTRAOPTS || '';
var reloading = false;
var new_haproxy;

process.title = 'haproxy-upstart-wrapper';

var args = ['-f', CONFIG, '-db'];

if (EXTRAOPTS) {
	args.push(EXTRAOPTS);
}

var haproxy = spawn(HAPROXY, args, { stdio : 'inherit' });

//handle when the haproxy child process exits, we don't restart
//here because we depend on upstart to restart this
haproxy.on('exit', haproxyExit);

//handle upstart's reload configuration signal
process.on('SIGHUP', function () {
	console.log('on(SIGHUP)');

	var args = ['-f', CONFIG, '-db']
	
	if (EXTRAOPTS) {
		args.push(EXTRAOPTS);
	}

	//-sf PID_LIST must be at the end of the command	
	args.push('-sf', haproxy.pid);

	reloading = true;

	new_haproxy = spawn(HAPROXY, args, { stdio : 'inherit' });

	//temporarily watch for exit events from the new haproxy process
	//if it exits before the original haproxy process exits then we 
	//don't want to stay in reloading mode.
	new_haproxy.on('exit', function (code) {
		reloading = false;	
	});
});

function haproxyExit (code) {
	if (reloading) {
		//don't exit if we are processing a reload
		//if we are reloading and the original haproxy process
		//exited then the reload was successful, so we should
		//attach this event handler to the new haproxy process
		reloading = false;

		haproxy = new_haproxy;

		haproxy.removeAllListeners('exit');
		haproxy.on('exit', haproxyExit);

		return;
	}

	//basically proxy the exit code of the actual haproxy process
	//to the exit code of this process
	process.exit(code);
}
