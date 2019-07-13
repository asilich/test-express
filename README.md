# Express project

Project uses such tools and technologies: express, mongo, pm2, jwt

## Setup

```bash
	npm install
```

And edit config files which can be found here:
```bash
	cd ./config/
```

## Run

Also there are 2 main entry points, depending on environment where application will be running

Single process:
```bash
	#single core app
	server.js
```
Multiple processes:
```bash
	#multi core cluster app
	clusteredApp.js
```
