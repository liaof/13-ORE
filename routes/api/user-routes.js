const router = require('express').Router();
const { User } = require('../../models');

// get all users
router.get('/', (req, res) => {
  // Access our User model and run .findAll() method)
  // the following .findAll() is the JS equivalent of the SQL query SELECT  * FROM users;
  User.findAll({
    // protects password from being seen in the api
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
  // .findOne({where:..}..) is eqivalent to SELECT * FROM users WHERE id = 1
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      // verify user exists
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
// creates new user object
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    // .create(...) = INSERT INTO users
    //                  (username, email, password)
    //                VALUES
    //                  ("Lernantino", "lernantino@gmail.com", "password1234");
   User.create({
     username: req.body.username,
     email: req.body.email,
     password: req.body.password
   })
     .then(dbUserData => res.json(dbUserData))
     .catch(err => {
       console.log(err);
       res.status(500).json(err);
     });
});

// we can't use req.params.id and the other .get route to check login info because it relies on the user account's id, which is not known to the user
// POST is prefered over GET here because Get carries the req param in the URL string, and Post carries it in req.body, thus more secure
router.post('/login', (req, res) => {// This route will be found at http://localhost:3001/api/users/login

  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
  // query the User.table using the findOne() method for the email entered by the use and assigned it to req.body.email
  // findOne( looks for a object with the speceified fields and values)
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {// if an user with the requested email is not found
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }
    // else, match the password with the hashed password in the database
    // res.json({ user: dbUserData });

    // Verify user
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    res.json({ user: dbUserData, message: 'You are now logged in!' });

  });

})

// PUT /api/users/1
// changes user's password
router.put('/:id', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  
  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  // pass in req.body to provide the new data we want to use in the update, and req.params.id to indicate where we want said data to be used
  // .update(...) = UPDATE users
  //                SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234"
  //                WHERE id = 1;
  User.update(req.body, {
    individualHooks: true,// for .beforeUpdate see https://sequelize.org/v5/manual/hooks.html
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
