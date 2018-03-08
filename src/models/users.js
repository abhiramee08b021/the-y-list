/**
 * @param {Database} db - Pg-promise database object
 * @param  {Object} data - all the data for the user
 * @returns {Promise} - Promise that resolves to new row in db.
 */
async function insert(db, data) {
    const stmt = `INSERT INTO users (user_id, email, name, age, gender, prefer_gender, school, about, profile_img_url) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (user_id) DO UPDATE
        SET name = EXCLUDED.name,
            age = EXCLUDED.age,
            gender = EXCLUDED.gender,
            prefer_gender = EXCLUDED.prefer_gender,
            about = EXCLUDED.about,
            profile_img_url = EXCLUDED.profile_img_url,
            updated_at = current_date`;
    const result =  await db.result(stmt, [
        data.user_id,
        data.email,
        data.name, 
        data.age,
        data.gender,
        data.prefer_gender,
        data.school,
        data.about,
        data.profile_img_url]);
    return result;
}

/**
 * @param {Database} db - Pg-promise database object
 * @returns {Promise} - Promise that resolves to and int
 */
async function count(db) {
    const stmt = 'select COUNT(*) FROM users';
    const result = await db.one(stmt);
    return parseInt(result.count, 10);
}

/**
 * @param {Database} db - Pg-promise database object
 * @param  {String} gender - Gender of user
 * @returns {Promise} - Promise that resolves to all selected rows in db.
 */
async function getProfiles(db, gender) {
    const stmt = `
        SELECT * FROM users WHERE gender=$1
    `;
    return await db.any(stmt, [gender]);
}

/**
 * @param {Database} db - Pg-promise database object
 * @param  {String} user_id - ID of user
 * @returns {Promise} - Promise that resolves to all selected rows in db.
 */
async function getProfileByUserId(db, user_id) {
    const stmt = `
        SELECT * FROM users WHERE user_id=$1
    `;
    return await db.oneOrNone(stmt, [user_id]);
}

/**
 * @param {Database} db - Pg-promise database object
 * @param  {String} user_id - ID of user
 * @returns {Promise} - Promise that resolves to all selected rows in db.
 */
async function getUserLikes(db, user_id) {
    const stmt = `
        SELECT * FROM likes WHERE from_user_id=$1
    `;
    return await db.oneOrNone(stmt, [user_id]);
}

/**
 * @param {Database} db - Pg-promise database object
 * @param  {String} user_id - ID of user
 * @returns {Promise} - Promise that resolves to all selected rows in db.
 */
async function getUserMatches(db, user_id) {
    const stmt = `
        SELECT B.from_user_id AS matched_user
        FROM likes A
        INNER JOIN likes B
            ON A.from_user_id = B.to_user_id
            AND A.to_user_id = B.from_user_id
            AND A.id <> B.id
        WHERE A.value = 1
            AND B.value = 1
            AND A.from_user_id = $1
    `;
    return await db.any(stmt, [user_id]);
}

/**
 * @param {Database} db - Pg-promise database object
 * @param  {String} user_id - ID of user
 * @returns {Promise} - Promise that resolves to all selected rows in db.
 */
async function postLikes(db, from_user_id, to_user_id) {
    const stmt = `
        INSERT INTO likes (from_user_id, to_user_id, value)
        VALUES ($1, $2, 1)
    `;
    const result = db.result(stmt, [from_user_id, to_user_id]);
    return result;
}

module.exports = {
    insert,
    count,
    getProfiles,
    getProfileByUserId,
    getUserLikes,
    getUserMatches,
    postLikes,
}