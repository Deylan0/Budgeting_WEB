CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (username, email, password)
VALUES ("admin", "admin@gmail.com", "$2y$10$QSD0fF1Lxl0vuecDnY4rp.Kyk8L.FJnn9AANkb2ZMhNBfgDSrK00.");