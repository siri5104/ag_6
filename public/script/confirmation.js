// Get event details from localStorage
const eventName = localStorage.getItem('eventName');
const eventLocation = localStorage.getItem('eventLocation');
const eventDate = localStorage.getItem('eventDate');

// Check if values are available in localStorage
if (eventName && eventLocation && eventDate) {
    // Display event details on the confirmation page
    document.getElementById('eventName').innerText = eventName;
    document.getElementById('eventLocation').innerText = eventLocation;
    document.getElementById('eventDate').innerText = eventDate;
} else {
    console.log("Error: Event details not found in localStorage.");
}