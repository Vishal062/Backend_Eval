const mongoose = require("mongoose");
const lectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  batch: { type: String, required: true },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("lecture", lectureSchema);
