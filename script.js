// Function to get URL parameter (extract the guest name)
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
        results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Function to fetch guest list from guests.json
function loadGuestList() {
    return fetch('guests.json')  // Assuming your JSON is in the same directory
        .then(response => response.json())
        .then(data => {
            return data.guests;  // Returns the list of guests
        })
        .catch(err => {
            console.error('Error loading guest list:', err);
            return [];  // In case of error, return an empty list
        });
}

window.onload = function() {
    var firstName = getUrlParameter('firstname');  // Extract first name from URL
    var lastName = getUrlParameter('lastname');    // Extract last name from URL

    if (!firstName || !lastName) {
        // If the URL does not have first name or last name parameters, hide the content
        document.body.innerHTML = "Guest information missing. Please check your URL or contact the event organizers.";
        return;
    }

    // Load guest list and then check the name
    loadGuestList().then(function(validGuests) {
        // Look for a match with both first and last name
        var guest = validGuests.find(function(guest) {
            return guest.firstname.toLowerCase() === firstName.toLowerCase() && guest.lastname.toLowerCase() === lastName.toLowerCase();
        });

        if (guest) {
            // Valid guest name found, display the greeting
            document.getElementById('greeting').innerHTML = `Dear, ${guest.firstname} ${guest.lastname}`;
        } else {
            // If no matching guest is found, hide the content
            document.body.innerHTML = "Sorry, we could not find your name on the guest list. Please contact the event organizers.";
        }
    });
}
