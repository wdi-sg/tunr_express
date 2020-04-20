DB_NAME=tunr_db
PWD=$(shell pwd)

all: tables seed

clean:
	psql -a -d $(DB_NAME) -f tables.sql
	psql -a -d $(DB_NAME) -f artist_data.sql
	psql -a -d $(DB_NAME) -f songs.sql
	psql -a -d $(DB_NAME) -f playlists.sql

db:
	psql -d postgres -tc "select 1 from pg_database where datname = '$(DB_NAME)'" | grep -q 1 || createdb $(DB_NAME)

dropdb:
	dropdb $(DB_NAME)

tables: db
	psql -a -d $(DB_NAME) -f tables.sql

seed: tables
	psql -a -d $(DB_NAME) -f artist_data.sql
	psql -a -d $(DB_NAME) -f songs.sql
	psql -a -d $(DB_NAME) -f playlists.sql

.PHONY: all clean db dropdb tables seed
