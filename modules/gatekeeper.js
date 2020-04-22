const gatekeeper = (req, res, next) => {
  if (req.authed) {
    next();
  } else {
    res.redirect('/login');
  }
};

module.exports = gatekeeper;
