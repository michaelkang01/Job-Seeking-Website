import express from 'express';
import mongoose from 'mongoose'
import Joblisting from '../models/Joblisting';
import { v4 as uuid } from 'uuid';

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
const router = express.Router();

export const createJobListing = async (req, res) => {
    const { employer_id, job_title, job_location, job_description } = req.body;
    
    let currUser = res.locals.authData;
    const listing_id = uuid();
    const date_posted = new Date().toISOString().slice(0, 10);  
    const contact_name = `${currUser.firstName} ${currUser.lastName}`;
    const contact_address = `${currUser.email}`;
    const number_applied = 0;
    const newJobListing = new Joblisting({ listing_id, employer_id, job_description, job_location, job_title, date_posted, contact_name, contact_address, number_applied });

    // TODO: uncomment once recruiter profile is set up
    var recruiterProfiles = db.collection("recruiterprofiles");
    recruiterProfiles.updateOne({"email": contact_address}, {$push: { "jobsPosted": listing_id }});
    
    try {
        await newJobListing.save();
        res.status(201).json(newJobListing);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const getJobListings = async (req, res) => {
    try {
        var jobListingColl = db.collection("joblistings");
        const jobListings = jobListingColl.find();
        //const jobListings = await Joblisting.find();
        res.status(200).json(jobListings);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getJobListing = async (req, res) => {
    const { listing_id } = req.params;

    try {
        var jobListingColl = db.collection("joblistings");
        const jobListing = await jobListingColl.findById(listing_id);
        //const jobListing = await Joblisting.findById(listing_id);
        res.status(200).json(jobListing);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


// TODO: implement extra methods to handle job listings

// export const updateJobListing = async (req, res) => {

// }


// export const deleteJobListing = async (req, res) => {

// }

export default router;