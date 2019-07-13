const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/', [
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Emails should be valid').isEmail(),
		check('password', 'Password should be at least 5 characters in length').isLength({min: 5})
	], 
	async (req, res) => {
		const validationRes = validationResult(req);

		if (!validationRes.isEmpty()) {
			return res.status(400).json({errors: validationRes.array()});
		}

		const {name, email, password} = req.body;

		try {
			let user = await User.findOne({email: email});

			if (user) {
				return res.status(400).json({errors: [{msg: 'User already exists'}]});
			}

			user = new User({
				name, email, password
			});

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				config.get('secret'),
				{expiresIn: 2000},
				(err, token) => {
					if(err) {
						throw err;
					}

					res.json({token});
				});
		} catch (err) {
			console.log(err);
			console.error('Something went wrong with the user');
		}
});

module.exports = router;