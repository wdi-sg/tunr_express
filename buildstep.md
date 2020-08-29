install modules

- express
- express-react-views
- method-override
- pg
- react
- react-dom

- cookie-parser


step up directories

what is :
Model 
- data from controllers and sometimes views are passed here
- data can be passed into, out or manipulated.
- model will check data against the stored data in the db then supply it accordingly
- should not have no links to http, web

View
- representation of user interface.
- view will only be called by the controller when the controller has received data from the model
- react will be used as the view in this project

Controller
- controller handles the incoming http request and updates the appropriate model and identifies which view to render

Project File Structure
project/
	|_ controllers/
	|		|_ controller-callbacks.js
	|_ database/
	|		|_ db.js
	|		|_ tables.sql
	|		|_ seed.sql
	|_ models/
	|		|_ queries.js
	|_ node_modules/
	|_ public/
	|_ routes/
	|		|_ routes.js
	|_ views/
	|		|_ page.jsx
	|_ package-lock.json
	|_ package.json
	|_ app.js

controllers
- contains all logic to invoke queries from the models by providing the callbacks required by pool.query/client.query. The callback includes the appropriate view which will be rendered when the model returns/updates the data.

database
- initialises the database 
- creates pool or client
- passes a pool instance to the model to enabling query
- include sql files to create tables and seed with test data

models
- contains the sql commands to create, read, update or delete data in the database.
- responsible for checking data against the database
- responsible for manipulating data 
- responsible for data retrieved from controller
- responsible for sending data back to the controller when needed

public
- static files that are required by other parts of the program is included here
- examples :
		• css
		• javascript
		• images

routes
- define your app routes(path) with http methods

views
- contains the jsx which will rendered into our html page
- uses the data retrieved by the controller to update the browser
- responsible for user interaction thru buttons, forms and input.

package.json
- you should know this
- always check version or updates

app.js
- used to initialise, invoke and link all the files for the initial configuration
- express will then listen on the port specified
- express will only execute code pertaining to the http request
- the input flow will start from the routes specified


- app.js
	[] init express app
	[] set up middleware
	[] set react-views to be default view engine
	- linking the MVC
		[] import db
		[] import routes
		[] import the controller
		[] link all to complete app methods for routes
	[] listen on port 3000
	- handle server end
		[] shut down db connection pool
- db
	[] config pg
	[] create pool
	[] link pool instances to models
	[] export model object
- models
	[] requires pool instances as a parameter
	[] create crud functions
	[] separate callback used by pool.query
	and make a parameter provided by the controller
	[] export the crud functions
- controllers
	[] create callback function for the routes
	[] get data from user if needed
	[] manipulate data by invoking model
	[] pass a callback to the model
	[] decide on the view to be rendered
	[] export the functions
- views
	[] use react jsx to render pages
- routes
	[] set up url paths