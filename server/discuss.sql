create schema discussit;
use discussit;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    Email VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(60) NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE groups1(
	GId INT NOT NULL AUTO_INCREMENT,
	GName VARCHAR(50) NOT NULL,
	Gdesc VARCHAR(200) NOT NULL,
	id INT NOT NULL,
    PRIMARY KEY (`GId`),
	FOREIGN KEY(id) REFERENCES users(id)
		ON DELETE CASCADE ON UPDATE CASCADE

);

CREATE TABLE groupmembers(
	GId INT NOT NULL,
	id INT NOT NULL,
	PRIMARY KEY(GId, id),
	FOREIGN KEY(GId) REFERENCES groups1(GId)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(id) REFERENCES users(id)
		ON DELETE CASCADE ON UPDATE CASCADE
	

);

CREATE TABLE questions(
	QId INT NOT NULL PRIMARY KEY,
	id INT NOT NULL,
	GId INT NOT NULL,
	Question VARCHAR(1000) NOT NULL,
	FOREIGN KEY(id) REFERENCES users(id)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(GId) REFERENCES groups1(GId)
		ON DELETE CASCADE ON UPDATE CASCADE
	
);

CREATE TABLE answers(
	AnswerId INT NOT NULL PRIMARY KEY,
	QId INT NOT NULL,
	id INT NOT NULL,
	Answer VARCHAR(10000) NOT NULL,
	FOREIGN KEY(QId) REFERENCES questions(QId)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(id) REFERENCES users(id)
		ON DELETE CASCADE ON UPDATE CASCADE
);