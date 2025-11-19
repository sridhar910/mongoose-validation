const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Student = require('./models/Student');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/schoolDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// CREATE Student
app.post('/students', async (req, res, next) => {
    try {
        const student = new Student(req.body);
        const savedStudent = await student.save();
        res.status(201).json(savedStudent);
    } catch (err) {
        next(err);
    }
});

// READ Students
app.get('/students', async (req, res, next) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        next(err);
    }
});

// Invalid Route Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Centralized Error Handler
app.use(errorHandler);

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});