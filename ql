                                               Table "public.Songs"
    Column    |           Type           | Collation | Nullable | Default | Storage  | Stats target | Description 
--------------+--------------------------+-----------+----------+---------+----------+--------------+-------------
 id           | integer                  |           | not null |         | plain    |              | 
 title        | character varying(255)   |           |          |         | extended |              | 
 album        | character varying(255)   |           |          |         | extended |              | 
 preview_link | character varying(255)   |           |          |         | extended |              | 
 artwork      | character varying(255)   |           |          |         | extended |              | 
 createdAt    | timestamp with time zone |           | not null |         | plain    |              | 
 updatedAt    | timestamp with time zone |           | not null |         | plain    |              | 
 artist_id    | integer                  |           |          |         | plain    |              | 
Indexes:
    "Songs_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "Songs_artist_id_fkey" FOREIGN KEY (artist_id) REFERENCES "Artists"(id)

