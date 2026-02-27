const visHjemmeside = (req, res) => {
  res.render("index", {
    title: "Hjemmeside",
    user: req.session.username,
    css: null,
    role: req.session.role,
  });
};

const visFaqSide = (req, res) => {
  res.render("faq", {
    title: "Faq",
    user: req.session.username,
    css: "faq.css",
    role: req.session.role,
  });
};

const visErrorSide = (req, res) => {
  res.render("error", {
    title: "Error",
    user: req.session.username,
    css: null,
    role: req.session.role,
  });
};

module.exports = {
  visHjemmeside,
  visFaqSide,
  visErrorSide,
};
