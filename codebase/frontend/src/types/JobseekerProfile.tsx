type JobseekerProfile = {
    email: string,
    firstName: string,
    lastName: string,
    githubID: string,
    facebookID: string,
    resumeUrl: string,
    summary: string,
    address: string,
    workExperience: Object,
    education: Object,
    skills: any,
    metadata: Array<any>
}

export default JobseekerProfile