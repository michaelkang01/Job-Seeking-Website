import express from 'express';
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;

export const createJobPosting = async (req, res) => {
    
}


export const getJobPostings = async (req, res) => {

}


export const updateJobPosting = async (req, res) => {

}


export const deleteJobPosting = async (req, res) => {

}
