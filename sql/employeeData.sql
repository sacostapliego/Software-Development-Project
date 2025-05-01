USE employeeData;

SET FOREIGN_KEY_CHECKS=0;

INSERT INTO job_titles (job_title_id,job_title)
VALUES 
(100,'software manager'),
(101,'software architect'),
(102,'software engineer'),
(103,'software developer'),
(200,'marketing manager'),
(201,'marketing associate'),
(202,'marketing assistant'),
(900,'Chief Exec. Officer'),
(901,'Chief Finn. Officer'),
(902,'Chief Info. Officer');

INSERT INTO employees (empid, Fname, Lname, email, HireDate, Salary, SSN)
VALUES 
(1,'Snoopy', 'Beagle', 	'Snoopy@example.com', 	'2022-08-01', 45000.00, '111-11-1111'),
(2,'Charlie', 'Brown', 	'Charlie@example.com', 	'2022-07-01', 48000.00, '111-22-1111'),
(3,'Lucy', 'Doctor', 		'Lucy@example.com', 	'2022-07-03', 55000.00, '111-33-1111'),
(4,'Pepermint', 'Patti', 	'Peppermint@example.com', '2022-08-02', 98000.00, '111-44-1111'),
(5,'Linus', 'Blanket', 	'Linus@example.com', 	'2022-09-01', 43000.00, '111-55-1111'),
(6,'PigPin', 'Dusty', 	'PigPin@example.com', 	'2022-10-01', 33000.00, '111-66-1111'),
(7,'Scooby', 'Doo', 		'Scooby@example.com', 	'1973-07-03', 78000.00, '111-77-1111'),
(8,'Shaggy', 'Rodgers', 	'Shaggy@example.com', 	'1973-07-11', 77000.00, '111-88-1111'),
(9,'Velma', 'Dinkley', 	'Velma@example.com', 	'1973-07-21', 82000.00, '111-99-1111'),
(10,'Daphne', 'Blake', 	'Daphne@example.com', 	'1973-07-30', 59000.00, '111-00-1111'),
(11,'Bugs', 'Bunny', 		'Bugs@example.com', 	'1934-07-01', 18000.00, '222-11-1111'),
(12,'Daffy', 'Duck', 		'Daffy@example.com', 	'1935-04-01', 16000.00, '333-11-1111'),
(13,'Porky', 'Pig', 		'Porky@example.com', 	'1935-08-12', 16550.00, '444-11-1111'),
(14,'Elmer', 'Fudd', 		'Elmer@example.com', 	'1934-08-01', 15500.00, '555-11-1111'),
(15,'Marvin', 'Martian', 	'Marvin@example.com', 	'1937-05-01', 28000.00, '777-11-1111');


INSERT INTO payroll (payID, pay_date, empid, earnings, fed_tax, fed_med, fed_SS, state_tax, retire_401k, health_care)
SELECT 
	1,
	'2025-01-31', 
	1, 
	salary/52.0, 
	(salary/52.0)*0.32, 
	(salary/52.0)*0.0145,
	(salary/52.0)*0.062,
	(salary/52.0)*0.12,
	(salary/52.0)*0.004,
	(salary/52.0)*0.031
FROM employees WHERE employees.empid=1;

INSERT INTO payroll (payID, pay_date, empid, earnings, fed_tax, fed_med, fed_SS, state_tax, retire_401k, health_care)
SELECT 
	2,
	'2025-02-28', 
	1, 
	salary/52.0, 
	(salary/52.0)*0.32, 
	(salary/52.0)*0.0145, 
	(salary/52.0)*0.062,
	(salary/52.0)*0.12,
	(salary/52.0)*0.004,
	(salary/52.0)*0.031 
FROM employees WHERE employees.empid=1;

INSERT INTO payroll (payID, pay_date, empid, earnings, fed_tax, fed_med, fed_SS, state_tax, retire_401k, health_care)
SELECT 
	13,
	'2024-12-31', 
	1, 
	salary/52.0, 
	(salary/52.0)*0.32, 
	(salary/52.0)*0.0145, 
	(salary/52.0)*0.062,
	(salary/52.0)*0.12,
	(salary/52.0)*0.004,
	(salary/52.0)*0.031 
FROM employees WHERE employees.empid=1;

INSERT INTO payroll (payID, pay_date, empid, earnings, fed_tax, fed_med, fed_SS, state_tax, retire_401k, health_care)
SELECT 
	14,
	'2024-11-30', 
	1, 
	salary/52.0, 
	(salary/52.0)*0.32, 
	(salary/52.0)*0.0145, 
	(salary/52.0)*0.062,
	(salary/52.0)*0.12,
	(salary/52.0)*0.004,
	(salary/52.0)*0.031 
FROM employees WHERE employees.empid=1;
INSERT INTO payroll (payID, pay_date, empid, earnings, fed_tax, fed_med, fed_SS, state_tax, retire_401k, health_care)
SELECT 
	3,
	'2025-01-31', 
	2, 
	salary/52.0, 
	(salary/52.0)*0.32, 
	(salary/52.0)*0.0145,
	(salary/52.0)*0.062,
	(salary/52.0)*0.12,
	(salary/52.0)*0.004,
	(salary/52.0)*0.031
FROM employees WHERE  employees.empid=2;

INSERT INTO payroll (payID, pay_date, empid, earnings, fed_tax, fed_med, fed_SS, state_tax, retire_401k, health_care)
SELECT 
	4,
	'2025-02-28', 
	2, 
	salary/52.0, 
	(salary/52.0)*0.32, 
	(salary/52.0)*0.0145, 
	(salary/52.0)*0.062,
	(salary/52.0)*0.12,
	(salary/52.0)*0.004,
	(salary/52.0)*0.031 
FROM employees WHERE  employees.empid=2;

INSERT INTO payroll (payID, pay_date, empid, earnings, fed_tax, fed_med, fed_SS, state_tax, retire_401k, health_care)
SELECT 
	5,
	'2025-01-31', 
	3, 
	salary/52.0, 
	(salary/52.0)*0.32, 
	(salary/52.0)*0.0145,
	(salary/52.0)*0.062,
	(salary/52.0)*0.12,
	(salary/52.0)*0.004,
	(salary/52.0)*0.031
FROM employees WHERE employees.empid=3;

INSERT INTO payroll (payID, pay_date, empid, earnings, fed_tax, fed_med, fed_SS, state_tax, retire_401k, health_care)
SELECT 
	6,
	'2025-02-28', 
	3, 
	salary/52.0, 
	(salary/52.0)*0.32, 
	(salary/52.0)*0.0145, 
	(salary/52.0)*0.062,
	(salary/52.0)*0.12,
	(salary/52.0)*0.004,
	(salary/52.0)*0.031 
FROM employees WHERE employees.empid=3;

INSERT INTO payroll (payID, pay_date, empid, earnings, fed_tax, fed_med, fed_SS, state_tax, retire_401k, health_care)
SELECT 
	7,
	'2025-01-31', 
	4, 
	salary/52.0, 
	(salary/52.0)*0.32, 
	(salary/52.0)*0.0145, 
	(salary/52.0)*0.062,
	(salary/52.0)*0.12,
	(salary/52.0)*0.004,
	(salary/52.0)*0.031 
FROM employees WHERE employees.empid=4;

INSERT INTO payroll (payID, pay_date, empid, earnings, fed_tax, fed_med, fed_SS, state_tax, retire_401k, health_care)
SELECT 
	8,
	'2025-02-28', 
	4, 
	salary/52.0, 
	(salary/52.0)*0.32, 
	(salary/52.0)*0.0145, 
	(salary/52.0)*0.062,
	(salary/52.0)*0.12,
	(salary/52.0)*0.004,
	(salary/52.0)*0.031 
FROM employees WHERE employees.empid=4;

INSERT INTO payroll (payID, pay_date, empid, earnings, fed_tax, fed_med, fed_SS, state_tax, retire_401k, health_care)
SELECT 
	9,
	'2025-01-31', 
	5, 
	salary/52.0, 
	(salary/52.0)*0.32, 
	(salary/52.0)*0.0145,
	(salary/52.0)*0.062,
	(salary/52.0)*0.12,
	(salary/52.0)*0.004,
	(salary/52.0)*0.031
FROM employees WHERE employees.empid=5;

INSERT INTO payroll (payID, pay_date, empid, earnings, fed_tax, fed_med, fed_SS, state_tax, retire_401k, health_care)
SELECT 
	10,
	'2025-02-28', 
	5, 
	salary/52.0, 
	(salary/52.0)*0.32, 
	(salary/52.0)*0.0145, 
	(salary/52.0)*0.062,
	(salary/52.0)*0.12,
	(salary/52.0)*0.004,
	(salary/52.0)*0.031 
FROM employees WHERE employees.empid=5;

INSERT INTO payroll (payID, pay_date, empid, earnings, fed_tax, fed_med, fed_SS, state_tax, retire_401k, health_care)
SELECT 
	11,
	'2025-01-31', 
	6, 
	salary/52.0, 
	(salary/52.0)*0.32, 
	(salary/52.0)*0.0145,
	(salary/52.0)*0.062,
	(salary/52.0)*0.12,
	(salary/52.0)*0.004,
	(salary/52.0)*0.031
FROM employees WHERE employees.empid=6;

INSERT INTO payroll (payID, pay_date, empid, earnings, fed_tax, fed_med, fed_SS, state_tax, retire_401k, health_care)
SELECT 
	12,
	'2025-02-28', 
	6, 
	salary/52.0, 
	(salary/52.0)*0.32, 
	(salary/52.0)*0.0145, 
	(salary/52.0)*0.062,
	(salary/52.0)*0.12,
	(salary/52.0)*0.004,
	(salary/52.0)*0.031 
FROM employees WHERE employees.empid=6;

INSERT INTO payroll (payID, pay_date, empid, earnings, fed_tax, fed_med, fed_SS, state_tax, retire_401k, health_care)
SELECT 
	15,
	'2024-12-31', 
	7, 
	salary/52.0, 
	(salary/52.0)*0.32, 
	(salary/52.0)*0.0145, 
	(salary/52.0)*0.062,
	(salary/52.0)*0.12,
	(salary/52.0)*0.004,
	(salary/52.0)*0.031 
FROM employees WHERE employees.empid=7;


SELECT 
	16,
	'2025-01-31', 
	7, 
	salary/52.0, 
	(salary/52.0)*0.32, 
	(salary/52.0)*0.0145, 
	(salary/52.0)*0.062,
	(salary/52.0)*0.12,
	(salary/52.0)*0.004,
	(salary/52.0)*0.031 
FROM employees WHERE employees.empid=7;


INSERT INTO employee_division (empid, div_ID)
VALUES(1,999),
      (2,999),
      (3,999),
      (7,1),
      (10,1);

INSERT INTO division (ID, Name, city, addressLine1, addressLine2, state, country, postalCode) 
VALUES(1,'Technology Engineering', 'Atlanta', '200 17th Street NW', '', 'GA', 'USA', '30363'),
		(2,'Marketing', 'Atlanta', '200 17th Street NW', '', 'GA', 'USA', '30363'),
		(3,'Human Resources','New York', '45 West 57th Street', '', 'NY', 'USA', '00034'),
		(999,'HQ','New York', '45 West 57th Street', '', 'NY', 'USA', '00034');
			
INSERT INTO employee_job_titles (empid, job_title_id)
VALUES(1,902),
(2,900),
(3,901),
(4,102),
(5,101),
(6,201),
(7,100),
(8,102),
(9,102),
(10,102),
(11,200),
(12,201),
(13,202),
(14,103),
(15,103);


