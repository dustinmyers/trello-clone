# better-todo

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

## Folder Structure (Day 1)
### As you learned with the last project, folder structure is vital as you are setting up a new project. Now we are going to throw a twist at you and give you a new folder structure that you will use when creating a full-stack app (frontend and backed). We will continue to use a feature based approach, and we will apply the same principles to the files that we will use for our server as well.

### Code
####
* Fork and clone this repository
* Create the following files in this structure in your project folder
* Note that we have an api directory, and a public directory. This will be vitally important in keeping our frontend (public) and backend (api) code seperated

```
server.js
.gitignore
/public
  app.js
  index.html
  /components
    /auth
      authCtrl.js
      authService.js
      authview.html
    /directives
      draggable.js
    /list
      cardDirective.js
      listDirective.js
      listService.js
      mainCtrl.js
      mainView.html
      pageDirective.js
      /views
        cardView.html
        listView.html
        pageView.html
  /css
    styles.css
    styless.less
/api
  /controllers
    listCtrl.js
    userCtrl.js
  /models
    listModel.js
    userModel.js
