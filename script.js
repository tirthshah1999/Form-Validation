const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");

// Error
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector("small");
    small.innerText = message;
}

// Success
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check Required feilds
function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input, `${getInputName(input)} is required`);
        }else{
            showSuccess(input);
        }
    })
}

// Check Input length
function checkLength(input, min, max){
    if(input.value.length < min){
       showError(input, `${getInputName(input)} must be atleast ${min} characters`); 
    }else if(input.value.length > max){
        showError(input, `${getInputName(input)} must be less than ${max} characters`);
    }else{
        showSuccess(input);
    }
}

// Check Email is Valid
function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(re.test(input.value.trim())){
       showSuccess(input); 
    }else{
        showError(input, "Email is not Valid");
    }
}

// Check Password match
function checkPasswordMatch(input1, input2){
    console.log(input1.value);
    console.log(input2.value);
    if(input1.value !== input2.value){
        showError(input2, `${getInputName(input2)} not match`);
    }
} 

// Get Field Name
function getInputName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", function(e){
    e.preventDefault();
    checkRequired([username, email, password, confirmPassword]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, confirmPassword);
})