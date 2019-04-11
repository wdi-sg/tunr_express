CREATE TABLE IF NOT EXISTS shops (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS shop_products (
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    shop_id INTEGER
);