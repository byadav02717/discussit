# discussit

How to start developing:
	Ensure that you have node.js and npm installed.
	Host a MySQL server (using xampp, or wampp) and run the discuss.sql file from the server directory on your SQL server.
	Check config file named database.js in the path discussit/server/config. Make sure the credential matches with your local host.
	Run ‘npm install’ command in both client and server folders to resolve dependencies.
	Run ‘npm start’ from the client directory to start the front end.
	Run ‘node ./index.js` from the server directory to start the back end.
	This should compile and start the web server on your local machine and open a new tab on your web browser.
