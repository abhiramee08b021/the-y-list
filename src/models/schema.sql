DROP TYPE IF EXISTS GENDER CASCADE;
CREATE TYPE GENDER AS ENUM ('male', 'female', 'other');

DROP TYPE IF EXISTS SCHOOL CASCADE;
CREATE TYPE SCHOOL AS ENUM ('school of management', 
                            'graduate school of arts and sciences',
                            'school of architecture',
                            'school of art',
                            'divinity school',
                            'school of drama',
                            'school of engineering and applied science',
                            'school of forestry and environmental studies',
                            'law schools',
                            'school of medicine',
                            'school of music',
                            'school of nursing',
                            'school of public health',
                            'yale college',
                            'other');

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(100) UNIQUE NOT NULL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL
        CHECK ( email ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$' ),
    name VARCHAR(200) NOT NULL,
    age INT NOT NULL CHECK (age >= 18 AND age < 40),
    gender GENDER NOT NULL,
    prefer_gender GENDER NOT NULL,
    school SCHOOL NOT NULL,
    about TEXT,
    profile_img_url TEXT,
    created_at DATE DEFAULT current_date,
    updated_at DATE DEFAULT current_date
);

-- Define a function that turns a users row
-- email column to lowercase.
CREATE OR REPLACE function clean_user_fields() returns trigger as $$
BEGIN
    NEW.email := lower(NEW.email);
    return NEW;
END;
$$ language plpgsql;

-- This is a "trigger" and it is tiggered prior
-- to and insert or update on the users. It ensures
-- that the email field is stored as lowercase by
-- calling the clean_user_fields() function.
DROP TRIGGER IF EXISTS tg_users_default ON "users";
CREATE TRIGGER tg_users_default
    BEFORE INSERT OR UPDATE
    ON "users"
    FOR EACH ROW
EXECUTE PROCEDURE clean_user_fields();

DROP TABLE IF EXISTS likes CASCADE;
CREATE TABLE IF NOT EXISTS likes (
    id SERIAL PRIMARY KEY,
    from_user_id VARCHAR(100)
        REFERENCES users
        NOT NULL,
    to_user_id VARCHAR(100)
        REFERENCES users
        NOT NULL,
    value BOOLEAN,
    created_at DATE,
    updated_at DATE
);