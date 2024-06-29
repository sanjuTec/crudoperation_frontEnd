// Function to validate if a string is not empty
function isNotEmpty(value) {
    return value.trim() !== '';
}

// Function to validate phone number format (example: digits only)
function isValidPhoneNumber(phoneNumber) {
    // Regular expression to match digits only
    let regex = /^\d+$/;
    return regex.test(phoneNumber);
}

// Function to validate employee data
function validateEmployeeData(empName, empAddress, empPhoneNumber) {
    if (!isNotEmpty(empName)) {
        alert('Employee Name cannot be empty.');
        return false;
    }
    if (!isNotEmpty(empAddress)) {
        alert('Employee Address cannot be empty.');
        return false;
    }
    if (!isNotEmpty(empPhoneNumber)) {
        alert('Employee Phone Number cannot be empty.');
        return false;
    }
    if (!isValidPhoneNumber(empPhoneNumber)) {
        alert('Please enter a valid phone number.');
        return false;
    }
    return true;
}
