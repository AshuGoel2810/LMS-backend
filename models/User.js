const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

const courseSchema = new mongoose.Schema({
    title: String,
    author: String,
    duration: String,
    students: String,
    level: String,
    lessons: String,
    price: String,
    image: String,
});



module.exports = mongoose.model('User', userSchema, "Course", courseSchema);
