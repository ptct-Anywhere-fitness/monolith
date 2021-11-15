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
