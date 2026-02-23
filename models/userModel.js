const mongoose = require("mongoose");
const argon2 = require("argon2");

const userSchema = new mongoose.Schema({
  brukernavn: {
    type: String,
    required: true,
    unique: true,
  },
  passord: {
    type: String,
    required: true,
  },
});

// Hash password before save
userSchema.pre("save", async function () {
  try {
    this.passord = await argon2.hash(this.passord);
  } catch (err) {
    console.log("Couldn't hash the password. Cause:", err);
  }
});


// Compare password (login)
userSchema.methods.comparePassword = async function (plainPassword) {
  return argon2.verify(this.passord, plainPassword);
};

module.exports = mongoose.model("User", userSchema);