const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema({
  navn: {
    type: String,
    required: true,
  },
  lenke: {
    type: String,
    required: true,
  },
  bilde: {
    type: String,
    required: true,
  },
  beskrivelse: {
    type: String,
    required: true,
  },
  timestamps: {
    type: String,
    required: true,
  },
  publisertAv: {
    type: String,
    required: true,
  },
});

const Website = mongoose.model("Website", websiteSchema);

module.exports = Website;
