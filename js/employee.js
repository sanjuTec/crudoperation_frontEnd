getAllEmployees()
function saveEmployee() {
    let empName = $('#employeeName').val();
    let empAddress = $('#employeeAddress').val();
    let empPhoneNumber = $('#employeePnumber').val();

    // Validate fields
     if (!validateEmployeeData(empName, empAddress, empPhoneNumber)) {
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
            getAllEmployees()

            $('#employeeName').val('');
            $('#employeeAddress').val('');
            $('#employeePnumber').val('');
        },
        error: function(xhr, status, error) {
            console.error('Error saving data:', error);
            alert('Failed to save employee data. Please try again.');
        }
    });
}

function updateEmployee(){
    let empID = $('#employeeId').val();
    let empName = $('#employeeName').val();
    let empAddress = $('#employeeAddress').val();
    let empPhoneNumber = $('#employeePnumber').val();

    // Validate fields
     if (!validateEmployeeData(empName, empAddress, empPhoneNumber)) {
            return;
        }

    // Proceed with AJAX request to update data to the backend
    $.ajax({
        url: 'http://localhost:8080/api/v1/employee/updateEmployee',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
            employeeId: empID,
            employeeName: empName,
            employeeAdress: empAddress,
            employeePnumber: empPhoneNumber
        }),
        success: function(response) {
            console.log('Data updated successfully:', response);
            alert('Employee data updated successfully!');
            getAllEmployees()

            $('#employeeId').val('');
            $('#employeeName').val('');
            $('#employeeAddress').val('');
            $('#employeePnumber').val('');
        },
        error: function(xhr, status, error) {
            console.error('Error updating data:', error);
            alert('Failed to update employee data. Please try again.');
        }
    });
}


// Function to fetch all employees and populate the table
function getAllEmployees() {
    $.ajax({
        url: "http://localhost:8080/api/v1/employee/getAllEmployees",
        type: "GET",
        success: function(data) {
            if (data.code === "00") {
                $('#empTable').empty();
                for (let emp of data.content) {
                    let empID = emp.employeeId;
                    let name = emp.employeeName;
                    let address = emp.employeeAdress;
                    let number = emp.employeePnumber;

                    let row = `<tr data-id="${empID}" data-name="${name}" data-address="${address}" data-number="${number}">
                                    <td>${empID}</td>
                                    <td>${name}</td>
                                    <td>${address}</td>
                                    <td>${number}</td>
                                    <td>
                                        <button class="btn btn-danger btn-delete" data-id="${empID}">Delete</button>
                                    </td>
                                </tr>`;
                    $('#empTable').append(row);
                }

                // Add click event listener to rows
                $('#empTable tr').click(function() {
                    // Populate form fields with row data
                    let empID = $(this).data('id');
                    let name = $(this).data('name');
                    let address = $(this).data('address');
                    let number = $(this).data('number');

                    $('#employeeId').val(empID);
                    $('#employeeName').val(name);
                    $('#employeeAddress').val(address);
                    $('#employeePnumber').val(number);
                });

                // Add click event listener to delete buttons
                $('.btn-delete').click(function() {
                    let empID = $(this).data('id');
                    deleteEmployee(empID);
                });
            } else {
                alert('Failed to load employee data. Invalid response code.');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error loading data:', error);
            alert('Failed to load employee data. Please try again.');
        }
    });
}

// Function to delete an employee by ID
function deleteEmployee(empID) {
    // Confirm deletion
    if (confirm('Are you sure you want to delete this employee?')) {
        $.ajax({
            url: 'http://localhost:8080/api/v1/employee/deleteEmployee/'+empID,
            type: 'DELETE',
            success: function(result) {
                alert('Employee deleted successfully!');
                getAllEmployees(); // Refresh the table
            },
            error: function(xhr, status, error) {
                console.error('Error deleting data:', error);
                alert('Failed to delete employee data. Please try again.');
            }
        });
    }
}


