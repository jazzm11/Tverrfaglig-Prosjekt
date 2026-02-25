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


function isAdmin(req, res, next) {
  if (req.session.role === 'admin') {
    return next();
  }

  return res.redirect("/login");
}

module.exports = { redirectIfLoggedOut, redirectIfLoggedIn, isAdmin };