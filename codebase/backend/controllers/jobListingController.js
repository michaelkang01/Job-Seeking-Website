import express from 'express';
import mongoose from 'mongoose'
import Joblisting from '../models/Joblisting';

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
const router = express.Router();

export const createJobListing = async (req, res) => {
    const { job_title, job_location, job_description } = res.body;

    const newJobListing = new Joblisting({ job_title, job_location, job_description });

    try {
        await newJobListing.save();
        res.status(201).json(newJobListing);
    } catch (error) {
        res.status(409).json({ message: error.message});
    }
}


export const getJobListings = async (req, res) => {

}


export const updateJobListing = async (req, res) => {

}


export const deleteJobListing = async (req, res) => {

}

export default router;