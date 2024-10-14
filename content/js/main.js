/* Forms checks */

var mailValid = false;
var passwordValid = false;
var rePasswordValid = true;
var nameValid = false;

function checkMailAddr(mailaddr) {
    const mailElement = document.querySelector('input[type="email"]');
    const emailWarning = document.getElementById('email-warning');
    const submitButton = document.querySelector('input[type="submit"]');
    const emailWarningContents = "<blockquote><p><b>Email requirements:</b></p> <ol> <li>User part must not be empty.</li> <li>Valid domain.</li> <li>One <b>@</b> symble.</li> </ol></blockquote>";

    // Check for Elements on DOM
    if (mailElement && emailWarning && submitButton) {
        let atIndex = mailaddr.indexOf('@');
        let atCount = mailaddr.split('@').length - 1;
    
        if (atCount === 1) {
            // Get sections
            let domainPart = mailaddr.slice(atIndex + 1);
            let userPart = mailaddr.slice(0, atIndex);
    
            // Get requiered mail parts
            let dotCount = domainPart.split('.').length - 1;
    
            // Inform users
            /*
                Test for:
                
                1. One "@"
                2. User lenght is more than 0
                3. At least one "."
                4. Domain is valid
    
            */
            if (atCount === 1 && userPart.length > 0 && dotCount > 0 && !domainPart.startsWith('.') && !domainPart.endsWith('.')) {
                mailElement.style.border = '5px solid green';
                emailWarning.innerHTML = '';
                mailValid = true;

                // Allow submit
                if (mailValid && passwordValid && rePasswordValid) {
                    submitButton.disabled = false;
                } else if (!document.getElementById('password') && mailValid && nameValid) {
                    submitButton.disabled = false;
                }
            }
            else {
                mailElement.style.border = '5px solid red';
                emailWarning.innerHTML = emailWarningContents;
                mailValid = false;
                submitButton.disabled = true;
            }
        } else {
            mailElement.style.border = '5px solid red';
            emailWarning.innerHTML = emailWarningContents;
            mailValid = false;
            submitButton.disabled = true;
        }
    } else {
        console.warn("Could not find mailElement, submitButton or emailWarning.");
    }
}

function checkPassword(password) {
    // Test matching rePassword if user came back to the password filed.
    const rePassword = document.getElementById('repassword');
    if (rePassword) {
        checkRePassword(rePassword.value);
    }

    // Test password
    const passwordElement = document.getElementById('password');
    const passwordWarning = document.getElementById('password-warning');
    const passwordWarningContents = "<blockquote> <p><b>Password requirements:</b></p><ol><li>At least 8 characters long.</li> <li>One uppercase letter.</li> <li>One lowercase letter.</li> <li>One number.</li> <li>One special charecter.</li> </ol></blockquote>";
    const submitButton = document.querySelector('input[type="submit"]');

    // Check for Elements on DOM
    if (passwordElement && passwordWarning && submitButton) {
        // Get lenght
        let passwordLenght = password.length;

        // Set default value
        let passwordUppercaseCount = 0;
        let passwordLowercaseCount = 0;
        let passwordDigitCount = 0;
        let passWordSpecialCount = 0;

        /* 
            Test for:
            
            1. At least 8 characters long.
            2. Include at least one uppercase letter.
            3. Include at least one lowercase letter.
            4. Include at least one digit.
            5. Include at least one special charecter.

        */
        if (passwordLenght >= 8) {

            // Go through each char in the password
            for (let i = 0; i < passwordLenght; i++) {
                let char = password[i];

                if (char >= "A" && char <= "Z") { // Check for uppercase

                    passwordUppercaseCount++;

                } else if (char >= "a" && char <= "z") { // Check for lowercase

                    passwordLowercaseCount++;

                } else if (!isNaN(Number(char))) { // Check for digit

                    passwordDigitCount++;

                } else { // Since this should not be a digit nor an alphabetical charecter I can assume its a special charecter.

                    passWordSpecialCount++;

                }
            }

            if (passWordSpecialCount > 0 && passwordUppercaseCount > 0 && passwordLowercaseCount > 0 && passwordDigitCount > 0) {
                passwordElement.style.border = '5px solid green';
                passwordWarning.innerHTML = '';
                passwordValid = true;

                // Allow submit
                if (mailValid && passwordValid && rePasswordValid) {
                    submitButton.disabled = false;
                }
            } else {
                passwordElement.style.border = '5px solid red';
                passwordWarning.innerHTML = passwordWarningContents;
                passwordValid = false;
                submitButton.disabled = true;
            }

        } else {
            passwordElement.style.border = '5px solid red';
            passwordWarning.innerHTML = passwordWarningContents;
            passwordValid = false;
            submitButton.disabled = true;
        }
    } else {
        console.warn("Could not find passwordElement, submitButton or passwordWarning.");
    }
}

function checkRePassword(repassword) {
    const rePasswordElement = document.getElementById('repassword');
    const password = document.getElementById('password');
    const rePasswordWarning = document.getElementById('repassword-warning');
    const rePasswordWarningContents = "<blockquote><p><b>Passwords does not match.</b></p></blockquote>";
    const submitButton = document.querySelector('input[type="submit"]');

    // Check for Elements on DOM
    if (rePasswordElement && password && rePasswordWarning && submitButton) {

        if (repassword === password.value) {
            rePasswordElement.style.border = '5px solid green';
            rePasswordWarning.innerHTML = '';
            rePasswordValid = true;

            // Allow submit
            if (mailValid && passwordValid && rePasswordValid) {
                submitButton.disabled = false;
            }

        } else {
            rePasswordElement.style.border = '5px solid red';
            rePasswordWarning.innerHTML = rePasswordWarningContents;
            rePasswordValid = false;
            submitButton.disabled = true;
        }

    } else {
        console.warn("Could not find rePasswordElement, password, submitButton or rePasswordWarning.");
    }
}

function checkName(name) {
    const nameElement = document.getElementById('fname');
    const nameWarning = document.getElementById('name-warning');
    const nameWarningContents = "<blockquote> <p><b>Names can only include alphabetical characters and spaces.</b></p> </blockquote>";
    const submitButton = document.querySelector('input[type="submit"]');
    let isAlpha = true;

    // Check for Elements on DOM
    if (nameElement && nameWarning && nameWarningContents) {
        /* 
            Test for:
            
            1. includes only alphabetic chars

        */

        // Go through each char in the name
        for (let i = 0; i < name.length; i++) {
            let char = name[i];

            if (!(char >= "a" && char <= "z") && !(char >= "A" && char <= "Z") && char !== ' ') {
                isAlpha = false;
                break;
            }
        }

        if (isAlpha) {
            nameElement.style.border = '5px solid green';
            nameWarning.innerHTML = '';
            nameValid = true;

            // Allow submit
            if (mailValid && nameValid) {
                submitButton.disabled = false;
            }
        } else {
            nameElement.style.border = '5px solid red';
            nameWarning.innerHTML = nameWarningContents;
            nameValid = false;
            submitButton.disabled = true;
        }

    } else {
        console.warn("Could not find nameElement, submitButton or nameWarning.");
    }
}