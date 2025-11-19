const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long']
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [5, 'Age must be at least 5'],
        max: [100, 'Age cannot exceed 100']
    },
    grade: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'F'],
        required: [true, 'Grade is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    }
});

module.exports = mongoose.model('Student', studentSchema);