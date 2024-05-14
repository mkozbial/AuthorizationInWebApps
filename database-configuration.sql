CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(10) CHECK (user_type IN ('admin', 'user', 'editor')) NOT NULL,
    UNIQUE (username)
);

CREATE TABLE photos (
    photo_id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    filepath VARCHAR(255) NOT NULL,
    visibility VARCHAR(10) CHECK (visibility IN ('private', 'public')) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO users (username, password, user_type)
VALUES ('admin', 'admin', 'admin');