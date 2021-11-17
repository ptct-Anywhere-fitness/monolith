-- select * from order_2_product;


-- Join entire Products and Order_2_Product tables:
-- select * from Courses
-- join Order_2_Product on Courses.id = Order_2_Product.course_id;

-- View only order 1:
-- select * from Courses
-- join Order_2_Product on Courses.id = Order_2_Product.course_id
-- where Order_2_Product.order_id = 1;

-- View only columns of interest:
select 
	Order_2_Product.order_id,
	Courses.title as product_name,
	Courses.price as product_price
from Courses
join Order_2_Product on Courses.id = Order_2_Product.course_id
where Order_2_Product.order_id = 1;