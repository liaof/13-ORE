## Definitions

- *async/await* the async keyword is used as a prefix to the function that contains the asynchronous function. await can be used to
                prefix the asynchonous function itself which assigns the value from the responce to the newUserData.password

- *User.belongsToMany(Post, {*      Allows us to see how many votes a user creates when we query Post, and see all the posts they've voted on when we query User, because Votes can 
    *through: Vote,*                have multiple asssociations that we can view all at once
    *as: 'voted_posts',*
    *foreignKey: 'user_id'*         Note the syntax: We've instructed User and Post models to be connected through a Vote model. We state the foreign keys to belong in Vote, matching the
  *});*                             respective field in the Vote model. We also display the Vote model being queried as 'voted_posts' like we display Post models as                         
                                    'post'  
  *Post.belongsToMany(User, {*
    *through: Vote,*                However, this merely establishes how Post and User are ultimately linked via Vote, and we will need to explicitly connect Post to Vote, and User to Vote
    *as: 'voted_posts',*
    *foreignKey: 'post_id'*
  *});*

- *Code found from ln 16 at user-routes.js*       With 'include' we can also display associated objects linked with our object of choice. this is because include is the same as JOIN


### testing

{
    "username" : "gege",
    "email" : "g@g.com",
    "password" : "asdsd"
}

{
    "email" : "g@g.com",
    "password" : asdsd"
}

{
    "title" : "22m",
    "post_url" : "111.com",
    "user_id" : 1
}

{
    "comment_text":"swag!",
    "user_id" : 1,
    "post_id" : 1
}

### Info and Where to find it

- Hooks for hashing the passwords chapter 13.2.5
- data coming through Seuqlize needs to be serialized to be used
