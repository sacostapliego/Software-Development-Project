/* If Database is already created */

/* Adds password column*/
ALTER TABLE employees
ADD COLUMN password VARCHAR(255);

/* Gives admin to Linus@example.com */
INSERT INTO employee_division (empid, div_ID)
VALUES (5, 3);