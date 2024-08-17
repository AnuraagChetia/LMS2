const mongoose = require("mongoose");

const moduleSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  lectures: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      videoUrl: { type: String },
      duration: { type: Number }, // Duration of the lecture in minutes or hours
    },
  ],
});

const Module = mongoose.model("module", moduleSchema);

module.exports = Module;
