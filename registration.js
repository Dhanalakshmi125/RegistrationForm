document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const clearButton = document.getElementById('clearButton');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        validateForm();
    });

    clearButton.addEventListener('click', function() {
        form.reset();
        clearErrors();
    });

    function validateForm() {
        clearErrors();
        let isValid = true;

        // Validate First Name
        const firstName = document.getElementById('firstName');
        const firstNameError = document.getElementById('firstNameError');
        if (!/^[A-Za-z]+$/.test(firstName.value)) {
            firstNameError.textContent = 'First Name can only contain alphabetic characters.';
            isValid = false;
        }

        // Validate Last Name
        const lastName = document.getElementById('lastName');
        const lastNameError = document.getElementById('lastNameError');
        if (!/^[A-Za-z]+$/.test(lastName.value)) {
            lastNameError.textContent = 'Last Name can only contain alphabetic characters.';
            isValid = false;
        }

        // Validate Email
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            emailError.textContent = 'Email must be in a valid format.';
            isValid = false;
        }

        // Validate Contact Number
        const contactNumber = document.getElementById('contactNumber');
        const contactNumberError = document.getElementById('contactNumberError');
        if (!/^\d{10}$/.test(contactNumber.value)) {
            contactNumberError.textContent = 'Contact Number must contain exactly 10 digits.';
            isValid = false;
        }

        // Validate Date of Birth
        const dob = document.getElementById('dob');
        const dobError = document.getElementById('dobError');
        if (!dob.value) {
            dobError.textContent = 'Date of Birth is required.';
            isValid = false;
        }

        // // Validate Password
        // const password = document.getElementById('password');
        // const passwordError = document.getElementById('passwordError');
        // const passwordValue = password.value;
        // if (passwordValue.length < 8 || 
        //     !/[A-Z]/.test(passwordValue) || 
        //     !/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue) || 
        //     /[!%^~]/.test(passwordValue) || 
        //     new RegExp(`(${firstName.value}|${lastName.value})`, 'i').test(passwordValue)) {
        //     passwordError.textContent = 'Password must be at least 8 characters long, contain one uppercase letter, one special character (excluding !, %, ^, ~), and must not contain First Name or Last Name.';
        //     isValid = false;
        // }


         // Validate Password
         const password = document.getElementById('password');
         const passwordError = document.getElementById('passwordError');
         const passwordValue = password.value;
         if (!validatePassword(passwordValue, firstName.value, lastName.value)) {
             passwordError.textContent = 'Password must be at least 8 characters long, contain exactly one uppercase letter, at least one special character (excluding !, %, ^, ~), and must not contain First Name or Last Name.';
             isValid = false;
         }


         function validatePassword(password, firstName, lastName) {
            const minLength = 8;
            const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
            const excludedChars = /[!%^~]/;
    
            // Check length
            if (password.length < minLength) return false;
    
            // Check uppercase letter
            const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
            if (uppercaseCount !== 1) return false;
    
            // Check for special character
            if (!specialChars.test(password) || excludedChars.test(password)) return false;
    
            // Check if it contains first name or last name
            const namePattern = new RegExp(`(${firstName}|${lastName})`, 'i');
            if (namePattern.test(password)) return false;
    
            return true;
        }

        // Validate Confirm Password
        const confirmPassword = document.getElementById('confirmPassword');
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        if (passwordValue !== confirmPassword.value) {
            confirmPasswordError.textContent = 'Passwords do not match.';
            isValid = false;
        }

        // Validate Terms & Conditions
        const terms = document.getElementById('terms');
        const termsError = document.getElementById('termsError');
        if (!terms.checked) {
            termsError.textContent = 'You must accept the Terms & Conditions.';
            isValid = false;
        }

        if (isValid) {
            alert('Form submitted successfully!');
            form.reset();
            window.location.href = 'exam.html';
        }
    }

    function clearErrors() {
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => error.textContent = '');
    }

    // Toggle Terms & Conditions
    const termsText = document.getElementById('termsText');
    const termsFull = document.getElementById('termsFull');
    termsText.addEventListener('click', function() {
        termsFull.style.display = termsFull.style.display === 'none' ? 'block' : 'none';
    });
});
