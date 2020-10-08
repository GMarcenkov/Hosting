// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import config from '../config';

const router = require("express").Router();
let User = require("../models/user/user.model");
let jwt = require("jsonwebtoken");
// let config = require('../config');
router.route("/").post((req, res) => {
  User.find()
    .then(users => {
      let user = users.filter(user => user.username === req.body.username);
      let auth = user[0].password === req.body.password ? true : false;
      const token = jwt.sign(
        {
          id: user[0]._id,
          username: user[0].username,
          isAdmin: user[0].isAdmin
        },
        "somesecretkeyforjsonwebtoken"
      );

      let foundUser = user[0];

      auth
        ? res.json({ token, user: foundUser })
        : res.status(400).json("Wrong email or password");
    })
    .catch(err => {
      console.log(err.message);

      res.status(400).json("Error: " + err);
    });
});

//
// User.query({
//     where: { username: identifier },
//     orWhere: { password: identifier }
// }).fetch().then(user => {
//     res.json(user)
//     if (user) {
//         if (bcrypt.compareSync(password, user.get('password_digest'))) {
//             const token = jwt.sign({
//                 id: user.get('id'),
//                 username: user.get('username')
//             }, config.jwtSecret);
//             res.json({ token });
//         } else {
//             res.status(401).json({ errors: { form: 'Invalid Credentials' } });
//         }
//     } else {
//         res.status(401).json({ errors: { form: 'Invalid Credentials' } });
//     }

module.exports = router;
