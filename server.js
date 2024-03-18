const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/Student_task")

// Check MongoDB connection
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});


// Serve static files (like HTML, CSS, and JavaScript)
app.use(express.static(path.join(__dirname, 'Web-app')));

// Course and Task Schema
const courseSchema = new mongoose.Schema({
    courseId: String,
    courseName: String
});

const taskSchema = new mongoose.Schema({
    courseId: String,
    taskName: String,
    dueDate: Date,
    additionalDetails: String
});

const Course = mongoose.model('Course', courseSchema);
const Task = mongoose.model('Task', taskSchema);


// Route to add task
app.post('/addTask', (req, res) => {
    const { courseId, taskName, dueDate, additionalDetails } = req.body;

    const newTask = new Task({
        courseId: courseId,
        taskName: taskName,
        dueDate: dueDate,
        additionalDetails: additionalDetails
    });

    newTask.save()
        .then(task => {
            res.status(200).send('Task added successfully');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error adding task');
        });
});



// Route to retrieve tasks for a course
// Route to retrieve tasks for a course
app.get('/courses/:courseId/tasks', (req, res) => {
    const courseId = req.params.courseId;

    Task.find({ courseId: courseId })
        .then(tasks => {
            if (tasks.length === 0) {
                res.status(404).send('No tasks found for this course');
            } else {
                res.status(200).json(tasks);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error retrieving tasks');
        });
});


// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/styles.css', (req, res) => {
    res.set('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname,  'styles.css'));
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
