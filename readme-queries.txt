-- Uncommnet: Cntrl + Shift + /


-- select * from courses;
--  select * from users;
-- select * from orders;


-- Join entire Users and Orders tables:
-- select * from users
-- join orders on users.user_id = orders.user_id_fk;


-- View columns of interest:
-- select -- Select columns
-- 	orders.total as total,
-- 	users.username as username
-- from users -- from left table
-- join orders on users.user_id = orders.user_id_fk; -- join tables


-- View subset of entries based on some criteria
-- select -- Select columns
-- 	orders.total as total,
-- 	users.username as username
-- from users -- from left table
-- join orders on users.user_id = orders.user_id_fk -- join tables
-- where total > 100;


-- Left join (Exhast the left table)
-- View all users (including ones that don't have any orders)
-- select -- Select columns
-- 	orders.total as total,
-- 	users.username as username
-- from users -- from left table
-- left join orders on users.user_id = orders.user_id_fk; -- join tables


-- If there were orders that did not belong to any user then we could 
-- swap the order of the left table and right table to exhaust the orders table.
-- select -- Select columns
-- 	orders.total as total,
-- 	users.username as username
-- from orders -- from left table
-- left join users on users.user_id = orders.user_id_fk; -- join tables


-- We can alias table names to make queries more succinct:
select -- Select columns
	o.total as total,
	u.username as username
from users as u -- from left table
left join orders as o on u.user_id = o.user_id_fk; -- join tables


=================================================

Rules for Tables:
No:
  1. Acronyms or abreaviations in table name
  2. Ambiguous table name ('data', 'table')

Yes: 
  1. Everybody understands what it represents.
  2. Use plural for the table name.
  3. Represents a subject or an appointment.
  4. Artificial primary key (PK)

=================================================

Rules for Columns:
No:
  1. Duplicate columns (email 1, email 2)
  2. Multi-part columns ('joe smith')
  3. Multi-values columns ('cs7, web-36, lab-5')
  4. Calculated columns
  5. Non-PK columns that depend on eachother

Yes:
  1. Unique name that appears once in DB
  2. Represents a specific characterisitc of subject
  3. Holds a single value
  4. The Primary Key represents the subject
  5. The non-primary-key describes the Primary Key