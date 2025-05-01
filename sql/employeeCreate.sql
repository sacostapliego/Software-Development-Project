/* 
    THESE ARE FOR dBeaver usage
    VS Code usage may give you unpredictable results. 	
*/

USE employeeData;

/***********************************************************************/

CREATE TABLE employees (
  empid INT NOT NULL,
  Fname VARCHAR(65) NOT NULL,
  Lname VARCHAR(65) NOT NULL,
  email VARCHAR(65) NOT NULL,
  HireDate DATE,
  Salary DECIMAL(10,2) NOT NULL,
  SSN VARCHAR(12),
  PRIMARY KEY (empid)
);

/***********************************************************************/

CREATE TABLE payroll (
  payID INT,
  pay_date DATE,
  earnings DECIMAL(8,2),
  fed_tax DECIMAL(7,2),
  fed_med DECIMAL(7,2),
  fed_SS DECIMAL(7,2),
  state_tax DECIMAL(7,2),
  retire_401k DECIMAL(7,2),
  health_care DECIMAL(7,2),
  empid INT,
  foreign key (empid) references employees (empid)
);

/***********************************************************************/ 
CREATE TABLE job_titles (
  job_title_id INT,
  job_title VARCHAR(125) NOT null,
  primary key (job_title_id)
);

CREATE TABLE employee_job_titles (
  empid INT NOT NULL,
  job_title_id INT NOT null,
  foreign key (empid) references employees (empid),
  foreign key (job_title_id) references job_titles (job_title_id)
);

/***********************************************************************/ 

/***********************************************************************/ 

CREATE TABLE division (
  ID int NOT NULL,
  Name varchar(100) DEFAULT NULL,
  city varchar(50) NOT NULL,
  addressLine1 varchar(50) NOT NULL,
  addressLine2 varchar(50) DEFAULT NULL,
  state varchar(50) DEFAULT NULL,
  country varchar(50) NOT NULL,
  postalCode varchar(15) NOT null,
  primary key (ID)
);

CREATE TABLE employee_division (
  empid int NOT NULL,
  div_ID int NOT NULL,
  foreign key (empid) references employees (empid),
  foreign key (div_ID) references division(ID)
);

/***********************************************************************/

/***********************************************************************/ 
create table city (
	ID int not null,
	name varchar(255),
	primary key (ID)
);
create table state (
	ID int not null,
	name varchar(255),
	primary key (ID)
);


create table address (
	empid int not null,
	street varchar(100) default null,
	city INT,
	state INT,
	zip DECIMAL(5, 0),
	gender varchar(100) default null,
	race varchar(100) default null,
	dob date default null,
	phone INT,
	foreign key (empid) references employees (empid),
	foreign key (city) references city (id),
	foreign key (state) references state (id)
);
