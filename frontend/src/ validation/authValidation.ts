
export function emailValidation(email:string){
    if(email.length === 0){
        return "Email is required";
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return "Invalid email address";
    }
    return null;
}

export function passwordValidation(password:string){
     if(password.length === 0){
        return "Password is required";
    }
    if (password.length < 6) {
        return "Password must be at least 6 characters long";
    }
    return null;
}

export function confirmPasswordValidation(password:string, confirmPassword:string){
    if(confirmPassword.length === 0){
        return "Confirm Password is required";
    }
    if (password !== confirmPassword) {
        return "Passwords do not match";
    }
    return null;
}