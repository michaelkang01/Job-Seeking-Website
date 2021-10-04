import crypto from 'crypto';

export default mongoose => {
    const seekerSchema = new Schema({
        email: String,
        firstName: String,
        lastName: String,   
        githubID: String,
        twitterID: String,
        facebookID: String,
        resumeUrl: String,
        summary: String,
        workExperience: { type: Array}, // {exp1: {title, start, end, location, description}, exp2: [...]}
        education: { type: Array}, // {ed1: [schoolName, start, end, location}}
        skills: [String], // "skills" : ["Express", "Ruby"]
    });
    return mongoose.model("Seeker", seekerSchema);
};