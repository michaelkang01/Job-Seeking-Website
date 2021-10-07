import crypto from 'crypto';

export default mongoose => {
    const seekerSchema = new Schema({
        // https://mongoosejs.com/docs/populate.html
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        email: String,
        firstName: String,
        lastName: String,   
        githubID: String,
        twitterID: String,
        facebookID: String,
        resumeUrl: String,
        summary: String,
        workExperience: [{ title: String, start: String , end: String, location: String, description: String }],
        education: [{ schoolName: String, start: String, end: String, location: String }],
        skills: [String], // "skills" : ["Express", "Ruby"]
    });
    return mongoose.model("Seeker", seekerSchema);
};

// object relation for job seeker accounts