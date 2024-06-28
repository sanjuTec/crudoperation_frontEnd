function saveEmployee() {
    let empName = $('#employeeName').val();
    let empAddress = $('#employeeAddress').val();
    let empPhoneNumber = $('#employeePnumber').val();

    // Validate fields
    if (!empName.trim()) {
        alert('Employee Name cannot be empty.');
        return;
    }
    if (!empAddress.trim()) {
        alert('Employee Address cannot be empty.');
        return;
    }
    if (!empPhoneNumber.trim()) {
        alert('Employee Phone Number cannot be empty.');
        return;
    }
    // Validate phone number format (example: digits only)
    if (!isValidPhoneNumber(empPhoneNumber)) {
             alert('Please enter a valid phone number.');
             return;
    }


    // Proceed with AJAX request to send data to the backend
    $.ajax({
        url: 'http://localhost:8080/api/v1/employee/saveEmployee',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            employeeName: empName,
            employeeAdress: empAddress,
            employeePnumber: empPhoneNumber
        }),
        success: function(response) {
            console.log('Data saved successfully:', response);
            alert('Employee data saved successfully!');

            $('#employeeName').val('');
            $('#employeeAddress').val('');
            $('#employeePnumber').val('');
        },
        error: function(xhr, status, error) {
            console.error('Error saving data:', error);
            alert('Failed to save employee data. Please try again.');
        }
    });


    // Function to validate phone number format (example: digits only)
    function isValidPhoneNumber(phoneNumber) {
        // Regular expression to match digits only
        let regex = /^\d+$/;
        return regex.test(phoneNumber);
    }
}
