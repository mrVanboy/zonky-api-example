# Zonky Api Example
Example project that using [Zonky API](https://zonky.docs.apiary.io/#).
> **YOU MUST DISABLE CROSS-ORIGIN SECURITY IN BROWSER**
> Ex. Chrome must be lauched with parameters: `google-chrome --disable-web-security --user-data-dir`

## Development server
You can use classic way of the development with local instance of node or
here is prepared *Makefile* with dockerized environment.

```bash
make docker-develop

# Next commands must be runned inside docker container
cd /app
npm start -- --host=0.0.0.0
```

After that just open `localhost:400` in your browser.

## Build
Resulted image is builded with *docker-compose* and *Makefile* contain
prepared tasks.

Run `make up`, wait until container will be prepared and open
[localhost:8080](http://localhost:8080).

