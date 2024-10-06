// Select the form and table elements from the DOM
const addEventForm = document.getElementById("addEventForm");
const eventsTableBody = document.querySelector("#eventsTable tbody");

// Load existing events from local storage
function loadEvents() {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    storedEvents.forEach(event => {
        addEventToTable(event.name, event.location, event.date);
    });
}

// Add event to table and local storage
function addEventToTable(eventName, eventLocation, eventDate) {
    const newRow = eventsTableBody.insertRow();
    // Insert cells for each piece of data
    const nameCell = newRow.insertCell(0);
    const locationCell = newRow.insertCell(1);
    const dateCell = newRow.insertCell(2);
    const actionCell = newRow.insertCell(3); // Cell for the remove button

    // Populate the cells with data
    nameCell.textContent = eventName;
    locationCell.textContent = eventLocation;
    dateCell.textContent = new Date(eventDate).toLocaleDateString(); // Format the date

    // Create the remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-button"; // Optional class for styling
    removeButton.addEventListener("click", function() {
        removeEvent(newRow.rowIndex - 1, eventName); // Pass the row index and event name
    });

    // Append the remove button to the action cell
    actionCell.appendChild(removeButton);
}

// Remove event from the table and local storage
function removeEvent(rowIndex, eventName) {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    // Filter out the event to remove
    const updatedEvents = storedEvents.filter(event => event.name !== eventName);
    // Update local storage
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    // Remove the row from the table
    eventsTableBody.deleteRow(rowIndex);
}

// Event listener for form submission
addEventForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    // Get values from the form inputs
    const eventName = document.getElementById("eventName").value;
    const eventLocation = document.getElementById("eventLocation").value;
    const eventDate = document.getElementById("eventDate").value;
    // Add event to table and local storage
    const newEvent = {
        name: eventName,
        location: eventLocation,
        date: eventDate
    };
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    storedEvents.push(newEvent); // Append the new event
    localStorage.setItem('events', JSON.stringify(storedEvents)); // Store updated list
    addEventToTable(eventName, eventLocation, eventDate); // Add to the table
    // Clear form inputs after submission
    addEventForm.reset();
});

// Load existing events on page load
loadEvents();