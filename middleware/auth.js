function redirectIfLoggedOut(req, res, next) {
  if (req.session && req.session.userID) {
    return next();
  }

  return res.redirect("/login");
}

function redirectIfLoggedIn(req, res, next) {
  if (req.session.userID) {
    return res.redirect("/");
  }
  next();
}


module.exports = { redirectIfLoggedOut, redirectIfLoggedIn };