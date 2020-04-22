const db = require('./db');

const checkAuth = async (req, res, next) => {
  let session = req.cookies['session'];
  if (session === undefined) {
    req.authed = false;
  } else {

    let sessionQuery =
        "SELECT sessions.user_id, users.username " +
        "FROM sessions " +
        "INNER JOIN users " +
        "ON (sessions.user_id = users.id)" +
        "WHERE sessions.id = $1";
    let sessionResults = await db.makeQuery(sessionQuery, [session]);
    if (sessionResults.length > 0) {
      console.log("OK");
      req.authed = true;
      req.username = sessionResults[0].username;
    } else {
      req.authed = false;
    }
  }
  next();
};

module.exports = checkAuth;
