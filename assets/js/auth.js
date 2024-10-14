document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutButton = document.getElementById('logout-button'); // Reference to the logout button

    // Logout function to clear session and redirect to login page
    function logout() {
        sessionStorage.clear(); // Clear any session or user data
        alert('You have been logged out.');
        window.location.href = '/pages/login.html'; // Redirect to login page
    }

    // Attach logout function to logout button
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }

    // Login Form Submission
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            // Basic validation
            if (email === '' || password === '') {
                alert('Please fill in all fields.');
                return;
            }
            // Simulate a successful login (update with actual auth logic later)
            alert('Login successful!');
            window.location.href = '/pages/expense-tracker.html'; // Redirect to expense tracker page
        });
    }

    // Register Form Submission
    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Validate form fields
            if (name === '' || email === '' || password === '' || confirmPassword === '') {
                alert('Please fill in all fields.');
                return;
            }
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            // Simulate successful registration
            alert('Registration successful! You can now log in.');
            window.location.href = '/pages/login.html'; // Redirect to login page
        });
    }

    // Profile Picture Editing
    const editPicButton = document.getElementById('edit-pic-btn');
    const editPicModal = document.getElementById('edit-pic-modal');
    const closePicModal = document.getElementById('close-pic-modal');
    const profilePicInput = document.getElementById('profile-pic-input');
    const savePicButton = document.getElementById('save-pic-btn');
    const profilePic = document.querySelector('.profile-pic');

    // Show edit picture modal
    if (editPicButton) {
        editPicButton.addEventListener('click', function () {
            editPicModal.style.display = 'block';
        });
    }

    // Close edit picture modal
    if (closePicModal) {
        closePicModal.addEventListener('click', function () {
            editPicModal.style.display = 'none';
        });
    }

    // Save new profile picture
    if (savePicButton) {
        savePicButton.addEventListener('click', function () {
            const file = profilePicInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    profilePic.src = e.target.result; // Update the profile picture
                    alert('Profile picture updated successfully!');
                    editPicModal.style.display = 'none'; // Close the modal
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please select a picture.');
            }
        });
    }

    // User Details Editing
    const editDetailsButton = document.getElementById('edit-details-btn');
    const editDetailsModal = document.getElementById('edit-details-modal');
    const closeDetailsModal = document.getElementById('close-details-modal');
    const saveDetailsButton = document.getElementById('save-details-btn');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const usernameDisplay = document.getElementById('username-display');
    const emailDisplay = document.getElementById('email-display');

    // Show edit details modal
    if (editDetailsButton) {
        editDetailsButton.addEventListener('click', function () {
            usernameInput.value = usernameDisplay.textContent; // Set current username in input
            emailInput.value = emailDisplay.textContent; // Set current email in input
            editDetailsModal.style.display = 'block';
        });
    }

    // Close edit details modal
    if (closeDetailsModal) {
        closeDetailsModal.addEventListener('click', function () {
            editDetailsModal.style.display = 'none';
        });
    }

    // Save new user details
    if (saveDetailsButton) {
        saveDetailsButton.addEventListener('click', function () {
            const newUsername = usernameInput.value;
            const newEmail = emailInput.value;
            // Perform any necessary validation here...
            if (newUsername && newEmail) {
                usernameDisplay.textContent = newUsername; // Update displayed username
                emailDisplay.textContent = newEmail; // Update displayed email
                alert(`User details updated:\nUsername: ${newUsername}\nEmail: ${newEmail}`);
                editDetailsModal.style.display = 'none'; // Close the modal
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
});
