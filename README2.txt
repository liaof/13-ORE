# Model-View-Controller

## To Do
- Structure your application following the Model-View-Controller (MVC) paradigm.

- Modularize your code into separate folders for your Models, View, and Controllers to enforce separation of concerns.

- Render dynamic HTML for your views using the Handlebars.js template engine.

- Implement user authentication.

-C onfigure Heroku so that you can deploy your application using a MySQL database.

## tools used
- Handlebars.js  is a logicless templating language that keeps the View and the code separate and compiles templates into JavaScript functions. It’s an extension to the Mustache templating language. Although there is a standard Handlebars npm package, you’ll use the Express Handlebars package as the View engine for your Express.js applications.

-  The express-session package  is an Express.js middleware that uses sessions, a mechanism that helps applications to determine whether multiple requests came from the same client. Developers may assign every user a unique session so that their application can store the user state, and thus authenticate users.

- The connect-session-sequelize package  provides applications with a scalable store for sessions. The express-session package’s default server-side session storage, MemoryStore, is purposely not designed for a production environment, will leak memory under most conditions, doesn’t scale past a single process, and is only meant for debugging and developing. The connect-session-sequelize package resolves these issues and is compatible with the Sequelize ORM.

## Syntax and Definiations

*{{{body}}}* located in the <main> in the .handlebars files
             -this is Handlebars.js syntax for data that will be plugged in later like ${} syntax when using backhashes `` for html

             Regarding the views folder, main. goes in views/layouts, everything else goes directly into views/


*Models-Views-Controllers(MVC)*  Models: the core data of your app
                                 Views: the UI components, such as your HTML layouts
                                 Controllers: the link between your models and views

                                MVC is a popular software design pattern than organises your app into the 3 above concers. Handlebars.js uses this paradigm

*res.render()*  The 2nd arguement is an object which containts all of the data we              want to pas to our template

*{{}}*  Used to contain both content(like variables or objects 
        and attribute values in the Handlebars.js HTML                


*{{#each}}~html here~{{/each}}*  Handlebar.js HTML looper: HTML within will be
                                 looped for each element of an array to create an unique HTML element for each one

## CHAPTER 1

- Followed the MVC paradigm to organize your code into Models, Views, and Controllers.

- Used Handlebar.js expressions and {{#each}} helpers to templatize a homepage layout.