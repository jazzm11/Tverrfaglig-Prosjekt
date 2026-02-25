const Website = require("../models/websiteModel");
const Review = require("../models/vurderModel");

// GET
const visOpprettNettsted = (req, res) => {
  res.render("opprett", {
    title: "Opprett Nettsted",
    user: req.session.username,
    css: "opprett.css",
  });
};

const visNettsider = async (req, res) => {
  try {
    const nettsider = await Website.find().sort({ createdAt: -1 });
    res.render("nettsider", {
      title: "Nettsider",
      user: req.session.username,
      role: req.session.role,
      css: "nettsider.css",
      nettsider,
    });
  } catch (error) {
    console.error(error);
  }
};

const visVurderingSide = async (req, res) => {
  try {
    const id = req.params.id;

    const nettside = await Website.findById(id);
    const vurderingene = await Review.find({
      websiteId: id,
    }).sort({ _id: -1 });

    // Total number of reviews
    const totalReviews = vurderingene.length;

    // Average score (avoid divide by zero)
    const avgScore =
      totalReviews === 0
        ? 0
        : vurderingene.reduce((sum, r) => sum + r.wcagScore, 0) / totalReviews;

    // Optional: round to 1 decimal
    const avgScoreRounded = Math.round(avgScore * 10) / 10;

    res.render("vurdering", {
      title: "Vurder",
      user: req.session.username,
      role: req.session.role,
      css: "vurdering.css",
      nettside,
      vurderingene,
      avgScoreRounded,
    });
  } catch (error) {
    console.error(error);
  }
};

// POST
const opprettNettsted = (req, res) => {
  try {
    const { navn, lenke, bilde, beskrivelse, dato } = req.body;
    const nyttNettsted = new Website({
      navn,
      lenke,
      bilde,
      beskrivelse,
      timestamps: dato,
      publisertAv: req.session.username,
    });
    nyttNettsted.save();
    console.log("Nettsiden lagt inn");
    res.redirect("/nettsider");
  } catch (error) {
    console.error(error);
  }
};

const lagreVurdering = async (req, res) => {
  try {
    const websiteId = req.params.id;
    const user = req.session.username || "Anonymous";
    const { vurderingTekst, wcagScore } = req.body;

    await Review.create({
      websiteId,
      user,
      tekst: vurderingTekst,
      wcagScore,
    });

    console.log("Nettsiden vurdert");
    res.redirect("/vurdering/" + websiteId);
  } catch (error) {
    console.error(error);
  }
};

const slettPoster = async (req, res) => {
  try {
    const id = req.params.id;
    await Website.findByIdAndDelete(id);

    await Review.deleteMany({ websiteId: id });
    console.log("Nettsiden slettet av admin");
    res.redirect("/nettsider");
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  visOpprettNettsted,
  opprettNettsted,
  visNettsider,
  visVurderingSide,
  lagreVurdering,
  slettPoster,
};
