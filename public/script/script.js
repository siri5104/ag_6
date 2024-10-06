// Adding an event listener to handle form submission
document.getElementById('addEventForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page refresh on form submission

    // Get form values
    const eventName = document.getElementById('eventName').value;
    const eventLocation = document.getElementById('eventLocation').value;
    const eventDate = document.getElementById('eventDate').value;

    // Log the values to make sure they are being captured
    console.log("Event Name: ", eventName);
    console.log("Event Location: ", eventLocation);
    console.log("Event Date: ", eventDate);

    // Store event details in localStorage
    localStorage.setItem('eventName', eventName);
    localStorage.setItem('eventLocation', eventLocation);
    localStorage.setItem('eventDate', eventDate);

    // Check if the values are stored properly
    if (localStorage.getItem('eventName') && localStorage.getItem('eventLocation') && localStorage.getItem('eventDate')) {
        // Redirect to confirmation page
        window.location.href = 'confirmation.html';
    } else {
        console.log("Error: Event details not saved correctly.");
    }
});