import React, { useState } from "react";

import { useForm } from "../context/FormContext";

function CreateListing() {
    // defining the initial state for the form
    const initialState = {
        employer_id: "",
        job_title: "",
        job_location: "",
        job_description: "",
    };

    // getting the event handlers from our custom hook
    const { onChange, onSubmit, values } = useForm(
        createListingCallback,
        initialState
    );

    // a submit function that will execute upon form submission ?
    async function createListingCallback() {
        // write to db?
    }

    return (
        <form onSubmit={onSubmit}>
        <label for="employer_id">Company Name:</label>
        <input
            name='employer_id'
            id='employer_id'
            type='employer_id'
            placeholder='Smhoogle'
            onChange={onChange}
            required
        />

        <label for="job_title">Job Title:</label>
        <input
            name='job_title'
            id='job_title'
            type='job_title'
            placeholder='Software Engineer'
            onChange={onChange}
            required
        />

        <label for="job_location">Job Location:</label>
        <input
            name='job_location'
            id='job_location'
            type='job_location'
            placeholder='Toronto, Canada'
            onChange={onChange}
            required
        />

        <label for="job_description">Job Description:</label>
        <input
            name='job_description'
            id='job_description'
            type='job_description'
            placeholder='Describe the position your are posting.'
            onChange={onChange}
            required
        />
        <button type='submit'>Login</button>
        
        </form>
    );
}

export default CreateListing;