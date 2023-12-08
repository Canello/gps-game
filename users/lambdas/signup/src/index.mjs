import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { validate } from "./helpers/validate.mjs";
import {
    DynamoDBClient,
    PutItemCommand,
    ScanCommand,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "sa-east-1" });

export const handler = async (event) => {
    try {
        const { name, email, password } = event;

        // Validate inputs
        const errors = validate(name, email, password);
        if (errors.length > 0) {
            return {
                statusCode: 400,
                body: {
                    errors,
                },
            };
        }

        // Check if email is already in use
        const scanInput = {
            TableName: "loc-users",
            ScanFilter: {
                Email: {
                    AttributeValueList: [{ S: email }],
                    ComparisonOperator: "EQ",
                },
            },
        };
        const scanCommand = new ScanCommand(scanInput);
        const scanResult = await client.send(scanCommand);
        if (scanResult.Count > 0)
            return {
                statusCode: 400,
                body: {
                    errors: ["Email already in use."],
                },
            };

        // Hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // Create user
        const input = {
            TableName: "loc-users",
            Item: {
                UserId: { S: uuidv4() },
                Name: { S: name },
                Email: { S: email },
                Password: { S: hash },
            },
        };
        const command = new PutItemCommand(input);
        const result = await client.send(command);

        return {
            statusCode: 200,
            body: result,
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
