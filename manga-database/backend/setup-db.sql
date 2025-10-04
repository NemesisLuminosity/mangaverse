-- Create database
CREATE DATABASE manga_database;

-- Create user
CREATE USER manga_user WITH PASSWORD 'manga_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE manga_database TO manga_user;

-- Connect to the new database
\c manga_database

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO manga_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO manga_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO manga_user;
