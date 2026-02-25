const User = require("../models/userModel");
// GET
const visLoginside = (req, res) => {
  res.render("login", { title: "Logg inn", css: "form.css" });
};
const visRegistreringsside = (req, res) => {
  res.render("register", { title: "Registrer", css: "form.css" });
};
const visProfilSide = (req, res) => {
  res.render("profil", {
    title: "Profil",
    css: "main.css",
    user: req.session.username,
    role: req.session.role,
  });
};

// POST
const loginPost = async (req, res) => {
  try {
    const { brukernavn, passord } = req.body;
    const userRecord = await User.findOne({ brukernavn });
    if (!userRecord) {
      return res.status(400).send("Brukeren finnes ikke"); // User not found
    }

    const user = await userRecord.comparePassword(passord);
    if (user) {
      req.session.userID = userRecord._id; // Store user ID in session
      req.session.username = userRecord.brukernavn; // Store username in session for easy access
      req.session.role = userRecord.role;
      console.log("Session data:", req.session); // Log session data for debugging
      res.redirect("/");
      console.log("Bruker logget inn:", userRecord.brukernavn);
    } else {
      res.status(400).send("Passord er feil");
    }
  } catch (error) {
    res.status(500).render("error", { error: error.message, title: "Feil" });
    console.error("Feil ved innlogging:", error);
  }
};

const registerPost = async (req, res) => {
  try {
    const { brukernavn, passord, passord2 } = req.body;
    if (passord !== passord2) {
      return res.status(400).send("Passordene matcher ikke");
    }

    const newUser = new User({ brukernavn, passord });
    const userSaved = await newUser.save();
    console.log("Ny bruker registrert:", userSaved.brukernavn);

    // Auto-login med en gang
    req.session.userID = userSaved._id;
    req.session.username = userSaved.brukernavn;
    req.session.role = userRecord.role;

    console.log("Session etter registrering:", req.session);

    res.redirect("/");
  } catch (error) {
    res.status(500).render("error", { error: error.message, title: "Feil" });
    console.error("Feil ved registrering:", error);
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Feil ved utlogging:", err);
      return res
        .status(500)
        .render("error", { error: err.message, title: "Feil" });
    }
    res.redirect("/");
  });
  console.log("Bruker logget ut");
};

module.exports = {
  visLoginside,
  visRegistreringsside,
  loginPost,
  registerPost,
  logout,
  visProfilSide,
};
