CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS categories(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    monthly DECIMAL(10,2) NOT NULL,
    goal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (username, email, password)
VALUES ("admin", "admin@gmail.com", "$2y$10$4W11z8FdT8PLEvf6aH1v.eEV956zjTfMOPjhqyxcQtJBTDHk8kAsG");

INSERT INTO categories (user_id, name, monthly, goal)
VALUES (1, "testCat", 12, 17);