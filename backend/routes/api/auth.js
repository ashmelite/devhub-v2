const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Test Route
// @access  Public
router.get('/', auth, async (req, res) => {             //adding auth middleware will make the route protected
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});    

// @route   POST api/auth
// @desc    Autheticate user & get token
// @access  Public

router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
], 
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { email, password } = req.body;
  
  try {
    let user = await User.findOne({ email: email });
    
    if(!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    
    // Compare if entered password matches with one stored in our db
    const isMatch = await bcrypt.compare(password, user.password);      //password is having pass in plain text and user.password has pass in encrypted form
    
    if(!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    
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
    
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
  
  
});


module.exports = router;