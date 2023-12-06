export const validate = (name, email, password) => {
    const errors = [];

    validateName(name, errors);
    validateEmail(email, errors);
    validatePassword(password, errors);

    return errors;
};

const validateName = (name, errors) => {
    if (name.length < 1 || name.length > 150) errors.push("Invalid name.");
};

const validateEmail = (email, errors) => {
    if (email.length < 3 || !email.includes("@")) errors.push("Invalid email.");
};

const validatePassword = (password, errors) => {
    if (password.length < 8 || password.length > 50)
        errors.push("Invalid password.");
};
