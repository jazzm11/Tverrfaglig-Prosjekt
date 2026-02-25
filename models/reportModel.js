const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  kommentarId: {
    type: String,
    required: true,
  },
  kommentar: {
    type: String,
    ref: "Review",
    required: true,
  },
  rapportertAv: {
    type: String, // evt req.session.username
    required: true,
  },
  grunn: {
    type: String,
    required: true,
  },
  opprettet: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Report", reportSchema);
