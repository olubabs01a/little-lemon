import { isNullUndefinedOrEmpty } from "./String";

export const isValidEmail = (emailInput) => {
    // Validate Email
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(emailInput);
};

export const isValidPassword = (passwordInput) => passwordInput.length >= 8;

export const isValidPhone = (phoneInput) => {
    const strippedInput = phoneInput.replace(/\D/g, '');
    return isNullUndefinedOrEmpty(strippedInput) === false && strippedInput.length === 10;
};