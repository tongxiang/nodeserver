###simple server

A node server which stores and retrieves key-value pairs. 

####setup
With [Node](https://nodejs.org/) installed, run `node server.js` within the directory.

####storing values
Using your favorite request generator (i.e., [Postman](https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?hl=en)), send a `GET` request to the `/get` path with a key-value pair within the query params. 

####retrieving values
Send a `GET` request to the `/set` path with a requested key. 