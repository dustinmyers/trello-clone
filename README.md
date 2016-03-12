# trello-clone

```
npm install
```

cd to /public

```
bower install
```


Have a running mongo instance on the default port (27017)

```
 > mongod
```

then

```
 > nodemon server.js
```

and open in browser: localhost:8000


## Intro / node modules (Day 1)

### Project introduction

####
In this project, you will be building a full-stack app that will be a clone of trello.com. In order to get started, you will need to clone [THIS](https://github.com/DevMountain/trello-clone) repo. You will automatically be on the `master` branch. This branch is the project solution. You may refer to this code if you need to. For each day, you will need to checkout to a new branch. In the new branches we have removed the code that you will be working on that day, but we have left in the rest of the code for the rest of the project. This will give you the ability to test the app after you finish each day's work. After you finish everything for that day, you will be able to fire up your project and see it in your browser. If it pulls up okay, and everything is working, then you know you finished the day's work correctly. If it doesn't work, then you will some more work to do.

Now, at the start of each new day (section), you will need to checkout to the branch that will be associated to that day. So, to start today's work, open your terminal, and navigate (cd) to the root of this project. If you run `ls`, you should see `server.js`. From there, run this command in your terminal: `git checkout day-one`. Now you are ready start today's work. Each day you will run that same command, but with the new branch for that day (ie. `day-two`, `day-three`, etc.).

Finally, instructions for building this project are in the [Project Guide](http://projectguide.devmounta.in/#/trello-clone). In the project files themselves there will be a few comments and instructions to give you a little bit of a guide, but you will want to follow the instructions in the project guide.

If you have any feedback on the project, or instructions, you can make a change in the project, or on the README.md, then submit a pull request to the DevMountain repository, and we will review those changes. (It will happen a lot faster if you message the link to your pull request to your teacher).

Have fun!

### Project Setup

####
You will probably notice that the file structure is different than the last project. This setup organizes files by file type. So, in your angular app, you will see that all of the controllers are in one directory, and then the services are in a seperate directory. In the `views` directory, you will see another directory called `partials`. This directory is used for html templates that are used by the directives in this project.

Project organization is determined by the project itself, and then the developers working on the project. You will see different styles of organization used in the programing world, and will probably quickly come to have your own preference for organization.

### Node Modules

####
To get our node server up and running, install the `express` module with npm, then import `express` into your server.js file.

####
* Open your terminal and navigate (cd) to the root of your project
* Install `express` using npm
* Import `express` into your server.js file with a require

####
##### Using npm to install node modules
Open your terminal, and make sure you have navigated to the root of your project (if you run the `ls` command, you should see `server.js`, `api`, and `public`. When you are there, you can now run the `npm` command to install node modules for your project.

To start out, we want to install `express`. To do that, run `npm install --save express`. This tells npm to install the express library to your project, and save a reference of the express library in your `package.json` file.

##### Import a node module with require
Now that the node module is installed, we need to import it into your server.js file. This will allow us to access and use the library from this file. You can compare this to injecting a service into a controller in Angular. By doing that, the service, and its built-in functions become "available" to the controller. In the same way, if you import a node module into a .js file, it becomes "available" to that file.

Import express into the server.js file like this (it will always go at the top of your file) :

`var express = require('express');`

## Create and run your node server

### Wire up your server

####
Set two variables under your imports called `app` and `port`, and give them the appropriate values needed to be able to start you server. Then, finish setting up your server using the `listen` function on `app`.

####
##### Define app and port
With `var app` we need to use express to create an express app in our node server. With `var port` we will declare a port which our server will run on.

##### Start the listen function
Use the `app.listen` method to finish starting up your server. Remember, this method takes two parameters - a number for which port to use, and a callback function. Inside the callback function you can use a `console.log` to show when your server starts up.

####
Your server.js file at this point should look like this:

```
var express = require('express');

var app = express();
var port = 8000;

app.listen(port, function() {
    console.log("Server started on port " + port);
};
```

(I like to have a little fun at this point, and log something like `console.log("I am watching you... " + port);`

### Start up your server

####
In your terminal, install `nodemon` if you haven't yet already - `npm install -g nodemon`. Remember, the flag `-g` means that nodemon will be available globally on your computer, and you will be abl to use it for any of your node projects. When that is installed, navigate (cd) into your project root folder where server.js is, and run nodemon to spin up your new node server - `nodemon server.js`.

## Create and Test your First Endpoints (Day 2)
### Set up endpoint
####
##### Fundamentals of our node server
Now the magic begins! Our server.js file is a lot like any other javascript file we have written so far in the class. The biggest difference is that it does not live in the browser like our Angular files do. This file will live on a server (ie Amazon Web Services (AWS), or Digital Ocean servers, or a local server inside your computer). Knowing that, we have to understand that whichever server your server.js is living on will receive communication from a browser, or even another server. This will come in the form of an HTTP request.
##### HTTP communication
Remember building $http requests in Angular? With every single request you have made from Angular, you have defined the type of request you are making, and the URL it is supposed to go to. But what happens when we make that request from the browser? The request goes to a server, locates the correct endpoint that correlates with the defined URL, and then invokes a function, and waits for that function to execute and return something. It is really that simple!

##### A basic 'successful' api call - or HTTP request - will happen something like this:
* Request in Angular is defined with the request type, the URL, and also any data we need to send with the request.
* Request is sent from the browser to the server with that specific information and data.
* The request is matched with the corresponding endpoint on the server, and the function associated with that endpoint is invoked.
* The server returns whatever was returned by the function that was called.

The connecting piece in all of this is the URL that is defined in our Angular files, and the endpoints that are defined in our server.js file.

Create an endpoint in your server.js file that will correspond with a 'GET' request made to `http://localhost:8000/api/test`. That endpoint will return a string that will confirm that the test was successful.

####
In the public, or browser file that makes this request (that would be in an Angular service file), the request will look something like this:
```
this.testRequest = function() {
  $http.get(http://localhost:8000/api/test).then(function(res) {
    console.log(res);
    return res;
  }
};
```
We are expecting that console.log to be a string that will confirm the success of our HTTP request. In order to make that happen on the server side - within the server.js file - we need to match up the appropriate pieces, and return some success string:

http://localhost:8000/api/test ---> matches up with our endpoint ---> '/api/test'
_HINT_:
```
app.get('endpoint', cb(req, res) {
    res.send(string);
});
```

Don't forget that there is not a return inside the function. Instead, we are going to use the `res` object (think of it as the 'response' object - the object that the server is going to 'respond' to the request with), which has a method on it called `res.send()` to send back, or 'respond' back with the success string.

####
So, your code will look something like this:

```
app.get('/api/test', function(req, res) {
    res.send("The request was successful!");
});
```

### Test your new endpoint with Postman
####
If you haven't already, download Postman. This is a tool that will help us test api calls, whether to our own server, or some cool third-party api like the Marvel Api!

When that is installed, open it up, and you will see a gray bar at the top that has a dropdown for request types, then a space to enter your URL, and a SEND button. We are going to use this tool to test our new server.

STOP!!! Before you can test your server, you need to start up your server! No communication can be made to a server if it's not running... Right?!? So, in your terminal, navigate to the root of your project and run this command:
`nodemon server.js`.

You should see the message that you console logged in your app.listen function. Now your server is fired up, and ready to receive some requests!

In Postman, make a request to the new endpoint on your server. You will have to choose the right request type and fill in the URL. When you hit SEND, you should get your success string back as the response. Try it now!

### Build an Angular App and test your server
####
##### Angular basic structure
In the file structure, there is a directory called public. This will hold all the files for our Angular app. Inside that directory, build out your angular app. Go ahead and build out the angular structure for all of the files, but for now, we are just going to be working in the authView, authCtrl, and the listService. You will need to build the routes for ui-router as well. We will only need an `auth` state, and a `list` state.

##### Wire up an $http request
In the listService, write a $http request that will hit the test endpoint in your server. Build out the service, controller, and view so that you can display the returned string in your browser. There is still one step that we need to complete before this can be successful, so you won't be able to test things yet.

##### Serving the public files
In your server.js file, have your express app serve the public files (aka "static" files) that are in the public directory. Then, fire up your server, and test your angular app.

####
If you had tried to test your new endpoint from your angular app before you have served the static files from your server, you've probably realized it isn't ready quite yet. If you ran `nodemon server.js` in your terminal to try and test it, you were moving in the right direction, but first, we need to serve the static files that are in the public directory to the browser. Luckily, your express app as a method to do just that.

_HINT:_ In the app.use method, run the express.static() method, defining the path of the public directory that needs to be served.

####
In order to serve the static files that you have in your project, you will need the following code:

```
app.use(express.static(__dirname + '/public'));
```

Now that you have that set up, spin up your server with `nodemon server.js` and test it in your browser.

## Middleware and Frontend (Day 3)

### Set up the middleware
####
Middleware in a server is a function - or a set of functions - that will run with every single request that comes to your server. This is done before a request even makes it to the server's endpoints. Middleware can handle headers, parse JSON, or check for authentication, among other things. You can consider middleware a "gatekeeper" for your server.

##### Setting up cors
Install and import the `cors` node module into your server. This will take care of all of the headers your server will need in order to make your "cross origin" AJAX requests from your user's browser to your server. Now use your express app to run `cors` as a middleware in your server.

##### Setting up bodyParser
Install and import the `bodyParser` node module into your server. This will take care of parsing all of the JSON in the AJAX requests your api will receive. Now use your express app to run `bodyParser` as a middleware in your server.

##### Setting up morgan
Install and import the `morgan` node module into your server. This will log incoming traffic to your server for you. Now use your express app to run `morgan` as a middleware in your server.

####
##### cors
* Install the `cors` library with npm in your terminal - remember that this needs to be done at the root of your project.
* Import `cors` to your server.js file using `require`.
* Set up `cors` as to run middleware using the `.use()` function that is available on your express app.

##### bodyParser
* Install the `bodyParser` library with npm in your terminal.
* Import `bodyParser` to your server.js file using `require`.
* Set up `bodyParser` as to run middleware using the `.use()` function that is available on your express app.

##### morgan
* Install the `morgan` library with npm in your terminal.
* Import `morgan` to your server.js file using `require`.
* Set up `morgan` as to run middleware using the `.use()` function that is available on your express app.

####
##### cors
```
var cors = require('cors');

app.use(cors());
```

##### bodyParser
When you set up `bodyParser` as middleware, you will need to use `.json()` to parse JSON data, and `.urlencoded({extended: false}))` to tell this middleware to only parse urlencoded bodies, and to use the `querystring` library (see https://www.npmjs.com/package/body-parser-json).
```
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
```

##### morgan
The `morgan` function takes a string as it's first parameter to determine the logger's format (a list of available options can be found at https://www.npmjs.com/package/morgan). We are going to use `'dev'` as the format for our morgan logger.
```
var morgan = require('morgan');

app.use(morgan('dev'));
```

##### server.js file
```
/************* IMPORTS *************/
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var app = express();
var port = 8000;

/********** MIDDLEWARE **********/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(morgan('dev'));

/************* API *************/
app.get('/api/test', function(req, res) {
    res.send("The request was successful!");
});

app.listen(port, function() {
	console.log('Server listening on port ' + port);
});
```

### Building out the login page

####
If you don't know what trello is, now is a really good time to go to trello.com, sign up for a fee account, and play around with it. We are building a simplified version of trello, so it will help to be a little familiar with how it works.

For our app though, we just want a login page, and a home page where we will have the trello style boards and lists. So, first let's build a login page. You can style this however you want. The only requirements are for you to have a place for the user to type in their username, and then a button that will log them in. Don't worry about having a password field. We will only require a username. In the login process, run a function in your controller that passes the username to your service, then make a request from the service to your server. In your server, console.log the request that came in and return a string with a success message. Finally, route the user to the lists page.

Finally, try to make this page look really nice. Remember, design really counts when it comes to the job hunt!

####
In order for your user to log in with their username, you will need an `input` element in your html that is bound to the $scope object with the ngModel directive. You can wrap the `input` tag in an html `form` tag to give you the ability to use ng-submit, which will let you user hit enter to login. You will still need to include the button, as some people will click the button to log in as well. Inside your authCtrl, you will need a login function on the $scope object that hits some endpoint on your server, sending the users username. In your server, console.log the reqquest body, and make sure it is going through. Then return some string that says that the login was a success.

####
Your code may look something like this:

##### authView.js
```
<form ng-submit="login()">
    <input type="text" placeholder="Enter username" ng-model="username" autofocus>
    <button>Login</button>
</form>
```

Remember to style this form. The default `<button>` tag is horrific, and definitely needs some help!

##### authCtrl.js
```
$scope.login = function(username) {
    console.log("username: ", username);
    authService.login(username).then(function(res) {
        console.log(res);
        $state.go('list');
    };
};
```

##### authService.js
```
this.login = funciton(username) {
   return $http.post(url, {username: username});
};
```

##### server.js
```
app.post('endpoint', function(req, res) {
    console.log('**** request body', req.body);
    res.send("You have succesfully logged in! Best secure login ever!");
});
```

## MongoDB Intro (Day 4)

### Intro to Databases

####
Now that we have worked on building a Node server, we need to learn how to persist data. We are going to use a database to do that. There are a lot of things that we would want to save in a database. If we look at this project, there are a  few things that we will persist to our database. Username, lists, and cards on each list. We also want to be able to make sure that there is some way to tue cards to their core t list, and lists to the correct user. MongoDB will help us make sure all of those stay correlated correctly, and that our data is stored and ready to be called to the browser.

### CRUD operations

####
Remember the "verbs" that we have learned about with HTTP communication? GET, POST, PUT, and DELETE? Databases use a very similar system of communication to know what to do when they receive requests from a browser. The commands are different though, and you can remember them with the acronym CRUD - Create, Read, Update, and Delete. Hopefully you see the correlation between the different verbs. It's something like this:

CREATE  -->   POST <br/>
READ    -->   GET <br/>
UPDATE  -->   PUT <br/>
DELETE  -->   DELETE <br/>

So... if you are making a 'GET' request from the browser, your server will receive that request, then it will use 'READ' commands to read, (or "get") data on the database in order to complete that request. Or, if your server receives a 'POST' request, it will run 'CREATE' commands to the database to create, or write, new data onto the database. And so on.

### Build requests to your database

####
Now we get to put all of our new knowledge into practice! We are going to build out one of each type of request. So, you should be able to run create, read, update, or delete commands within your database. To start off, we need to install and import mongojs in the server.js file. Then define a database instance. You can name the instance "trello-clone", then create a collection called "lists".

In your server.js, you will need to create endpoints that will receive all four types of HTTP requests from the browser. Then, within the callback functions of your endpoints,
