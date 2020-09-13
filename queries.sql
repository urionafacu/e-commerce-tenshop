-- query que trae los productos que matchean con cierta busqueda

SELECT products.name, products.description, products.price, products.stock
FROM products JOIN categoriesxproducts ON (products.id = categoriesxproducts.product_id)
					JOIN categories ON (categoriesxproducts.category = categories.name)
					WHERE products.name LIKE '%heladeras%' OR categories.name LIKE '%heladeras%';
					-- heladeras es a modo ejemplo, en vez de heladeras seria la busqueda
					-- que como usuario quiero hacer

--CREAR COLUMNA EN LA TABLA productsxorders QUE TENGA CANTIDADES: 
ALTER TABLE productsxorders ADD COLUMN amount integer;		
-- y esta columna total_price			
-- y esta columna total_price
