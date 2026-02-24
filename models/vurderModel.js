const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    websiteId: {
        type: String
    },
    user: {
        type: String
    },
    tekst: { 
        type: String, 
        required: true 
    },
    wcagScore: { 
        type: Number, 
        min: 1, 
        max: 10, 
        required: true 
    },
  }
);

module.exports = mongoose.model("Review", reviewSchema);
