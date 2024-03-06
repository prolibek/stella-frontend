import { validateEmail } from "@/features/auth/lib/validateEmail";

export const validateStepOne = (
    email: string, 
    password: string, 
    repeatPassword: string
    ) => {
    let errors = { email: '', password: '', repeatPassword: '' };
    
    if (!email.trim()) {
        errors.email = 'Email field is empty';
    } else if (!validateEmail(email)) {
        errors.email = 'Enter valid email address.';
    }

    if (!password.trim()) {
        errors.password = 'Password field is empty.';
    } else if (!/(?=.*\d)(?=.*[a-zA-Z]).{8,}/.test(password)) {
        errors.password = 'Password must be at least 8 characters long and contain numbers and letters.';
    }

    if (password !== repeatPassword) {
        errors.repeatPassword = 'Passwords should match.';
    }

    return errors;
}

export const validateStepTwo = (
    firstName: string, 
    lastName: string, 
    pos: string, 
    date: string | null
    ) => {
    let errors = { 
        firstName: '', lastName: '', middleName: '',
        pos: '', 
        date: '' 
    };

    if(!firstName.trim()) {
        errors.firstName = 'First name field is empty.';
    }

    if(!lastName.trim()) {
        errors.lastName = 'Last name field is empty.';
    }
    
    if(!pos) {
        errors.pos = 'Choose your position.';
    }

    if(date) {
        let today = new Date();
        let tmpDate = new Date(date); 
        let diff = today.getFullYear() - tmpDate.getFullYear();
        if (tmpDate.getMonth() > today.getMonth() || 
            (tmpDate.getMonth() === today.getMonth() && tmpDate.getDate() > today.getDate())) {
            diff--;
        }
        if(diff <= 16 || diff >= 100)
            errors.date = 'Enter valid birth date.' 
    }

    return errors;
}