# afeefa-frontend
The main web app of Afeefa.de

## Setup

1. Ensure you are running a frontend api: https://github.com/AfeefaDe/afeefa-frontend-api
2. Checkout this repository
3. Customize you frontend API url at: DDFA/js/APPAFEEFA.js
~~~~
...
that.setConfig(
	{
		apiUrl: 'http://api.afeefa.fx/',
		...
	}
...
~~~~
4. setup a local virtual host or something phply, which points at the root folder (index.html)

	or simply command `php -S localhost:8000` from source folder
