const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  title: { type: String, required: true },

  department: {
    type: String,
    required: true,
    enum: [
      "Marketing",
      "Sales",
      "Operations",
      "Product & Technology",
      "Customer Experience",
    ],
  },

  location: { type: String, required: true },

  employmentType: {
    type: String,
    enum: ["Full-time", "Part-time", "Intern"],
    required: true,
  },

  experienceLevel: {
    type: String,
    enum: ["Entry-level", "Mid-level", "Senior-level"],
    required: true,
  },

  educationRequirements: { type: String, required: true }, // "Degree or Certification required"

  responsibilities: [{ type: String, required: true }], // ["List of job responsibilities and duties","Another responsibility","And so on..."],

  minimumRequirements: [{ type: String, required: true }], // ["List of job requirements and qualifications","Another requirement","And so on...",]

  prefferedRequirements: [{ type: String, required: true }], // ["List of job requirements and qualifications","Another requirement","And so on...",]

  about: { type: String, required: true }, // job description

  skills: [{ type: String, required: true }], // ["Skill 1", "Skill 2", "Skill 3", "And so on..."],

  benefits: [{ type: String, required: true }], // ["Health insurance","401(k) plan","Flexible work hours","And so on...",],

  additionalInformation: { type: String, required: true }, //"Any other relevant information about the job or company",
});

const Job = mongoose.model("job", jobSchema);

module.exports = Job;
