# afeefa-frontend
The main web app of Afeefa.de

## Setup

1. Ensure you are running a frontend api: https://github.com/AfeefaDe/afeefa-frontend-api
2. Checkout this repository
3. Customize you frontend API url at: `config.php`

	Copy `config.php.template` and activate your options.

4. setup a local virtual host or something phply, which points at the root folder (index.html)

	or simply command `php -S localhost:8000` from source folder

## Development

To build minfied assets (`afeefa.min.css` and `build.min.js`) run:
```
$ npm run build
```

In developing mode you should use:
```
$ npm run dev
```
wich watches your stylesheets and scripts and compiles the unminified version including source maps.