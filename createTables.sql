##TO RESET THE DATABASE, COPY THIS INTO THE HEROKU PSQL CLIENT

DROP TABLE users;
DROP TABLE posts;

CREATE TABLE users
(
username varchar(24) unique,
email varchar(50),
password varchar(24),
PRIMARY KEY (username)
);

CREATE TABLE posts
(
postid SERIAL PRIMARY KEY,
date date,
time time,
text varchar(140),
hashtags varchar(140),
username varchar(24),
FOREIGN KEY (username) REFERENCES users(username)
);
