const mongoose = require("mongoose");

const seekerSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    githubID: String,
    twitterID: String,
    facebookID: String,
    resumeUrl: String,
    summary: String,
    workExperience: { type: Array}, // {exp1: {title: "", start: "", end: "", location: "", description: ""}, exp2: {...}}
    education: { type: Array}, // {ed1: {schoolName: "", start: "", end: "", location: "", description: ""}}
    skills: [String], // "skills" : ["Express", "Ruby"]
})

const Seeker = mongoose.model("Seeker", seekerSchema);
module.exports = Seeker;