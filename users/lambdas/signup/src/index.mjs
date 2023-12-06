import { validate } from "./helpers/validate.mjs";

export const handler = async (event) => {
    try {
        const { name, email, password } = event;

        const errors = validate(name, email, password);
        if (errors.length > 0) {
            return {
                statusCode: 400,
                body: {
                    errors,
                },
            };
        }

        return {
            statusCode: 200,
            body: { name, email, password },
        };
    } catch (err) {
        console.log("ERROR");
        console.log(err);
        return {
            statusCode: 500,
            body: {
                errors: ["Server error."],
            },
        };
    }
};
