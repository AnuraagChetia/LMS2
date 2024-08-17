const mongoose = require("mongoose");

const jobApplicationSchema = mongoose.Schema({
  job: { type: mongoose.Types.ObjectId, ref: "job", required: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: Number, required: true },
  currentCTC: { type: String, required: true },
  expectedCTC: { type: String, required: true },
  resume: { type: String, required: true },
});

const JobApplication = mongoose.model("jobApplication", jobApplicationSchema);

module.exports = JobApplication;
