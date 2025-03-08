const mongoose = require("mongoose");

const SpecialtySchema = new mongoose.Schema(
  {
    Area: {
      type: String,
      required: true,
      unique: true,
    },
    Description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Specialty = mongoose.model("SpecialtyArea", SpecialtySchema);

module.exports = Specialty;
