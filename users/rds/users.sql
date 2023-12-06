CREATE TABLE users (
    id BINARY(16) DEFAULT (UUID_TO_BIN(UUID())),
    name VARCHAR(50),
    email VARCHAR(255),
    password VARCHAR(50)
);