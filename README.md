haproxy-upstart-wrapper
-----------------------

A wrapper for haproxy that works with Upstart so that reload signals are processed properly.

Just in time for Debian to switch to systemd.

install
-------

```bash
$ npm install -g haproxy-upstart-wrapper
```

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
