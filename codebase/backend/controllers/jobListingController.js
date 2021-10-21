import express from 'express';
import mongoose from 'mongoose'
import Joblisting from '../models/Joblisting';
import uuid from 'uuid/v4';  

mongoose.connect(process.env.MONGO_URI);

const router = express.Router();

export const createJobListing = async (req, res) => {
    const { employer_id, job_title, job_location, job_description } = res.body;
    
    var currUser = res.locals.authData;
    const listing_id = uuid();
    var date_posted = new Date().toISOString().slice(0, 10);  
    const contact_name = currUser.firstName + ' ' + currUser.lastName;
    const contact_address = currUser.email;

    const newJobListing = new Joblisting({ listing_id, employer_id, job_description, job_location, job_title, date_posted, contact_name, contact_address });

    try {
        await newJobListing.save();
        res.status(201).json(newJobListing);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// TODO: implement extra methods to handle job listings

// export const getJobListings = async (req, res) => {

// }


// export const updateJobListing = async (req, res) => {

// }


// export const deleteJobListing = async (req, res) => {

// }

export default router;