haproxy-upstart-wrapper
-----------------------

A wrapper for haproxy that works with Upstart so that reload signals are processed properly.

Just in time for Debian to switch to systemd.

install
-------

```bash
$ npm install -g haproxy-upstart-wrapper
```

motivaion
---------

The init script that comes with the haproxy package in Debian/Ubuntu is not an
Upstart script. I have found the existing init script to be unreliable on 
reboots. In trying to convert the existing init script to an upstart job I
discovered the unique way that haproxy seamlessly reloads config files.

Upstart can only send a signal to a process to tell it to reload its config
files, while haproxy starts a whole new process after telling the currently
running process to stop listening on specified ports. As a result of this
incompatability, here is this wrapper script which starts haproxy, listens
for the reload signal and then executes the process restarting procedure.

usage
-----

Install the upstart job with:

```bash
$ haproxy-upstart-wrapper --install
```

Uninstall the upstart job with:

```bash
$ haproxy-upstart-wrapper --uninstall
```

Then you can use the normal upstart commands to manage haproxy:

```bash
$ service haproxy start
$ service haproxy reload
$ service haproxy stop
```

license
-------

MIT
