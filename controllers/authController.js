const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("emailOrUsernam", req.body)

    try {
        const user = await User.findOne({
            $or: [{ email: email}, { password: password }]
        });
        console.log("user", user)
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
        console.log("password", password)
        console.log("user.password", user.password)
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("isMatch", isMatch)
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.registerUser = async (req, res) => {
        const { username, email, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, email, password: hashedPassword, role: 'student'});
            await newUser.save();
            res.json({ msg: 'User registered successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Error registering user' });
        }
    }

 exports.courseUser = async (req, res) => {
        try {
          const course = new course(req.body);
          await course.save();
          res.status(201).json(course);
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
      };
      
      // GET - Get all courses
exports.coursesGet = async (req, res) => {
        try {
          const courses = await courses.find();
          res.json(courses);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      };

