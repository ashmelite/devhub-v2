const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// User Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
], 
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { name, email, password } = req.body;
  
  try {
    // See if user exists
    let user = await User.findOne({ email: email });
    
    if(user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }
    
    // Get users gravatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    })
    
    user = new User({         //this just creates an instance, to save user to db, we need to use save()
      name,
      email,
      avatar,
      password
    });
    
    // Encrypt password before saving to db
    const salt = await bcrypt.genSalt(10);
    
    user.password = await bcrypt.hash(password, salt);
    
    await user.save();        //save to db
    
    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id           //or we can use user._id; it's same thing
      }
    };
    
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {             //pass in a callback function
        if (err) throw err;
        res.json({ token });
      }
    );
    
    // res.send('User Registered!!!');
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
  
  
});

module.exports = router;