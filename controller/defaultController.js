const visHjemmeside = (req, res) => {
  res.render("index", {
    title: "Hjemmeside",
    user: req.session.username,
    css: null,
    role: req.session.role,
  });
};

module.exports = {
  visHjemmeside,
};
