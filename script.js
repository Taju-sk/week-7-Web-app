document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const courseId = document.getElementById("courseId").value;
    const taskName = document.getElementById("taskName").value;
    const dueDate = document.getElementById("dueDate").value;
    const additionalDetails = document.getElementById("additionalDetails").value;

    const taskData = {
        courseId: courseId,
        taskName: taskName,
        dueDate: dueDate,
        additionalDetails: additionalDetails
    };

    // Make sure you're sending the request to the correct URL where your Express server is running
    // For example, if your server is running on localhost:3000, change the URL accordingly
    fetch('http://localhost:3000/addTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    })
    .then(response => response.json())
    .then(data => {
        // Handle response from server
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
