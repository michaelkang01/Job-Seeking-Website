import React, { useEffect, useState } from 'react'
import TextInput from '../components/TextInput'
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import "tailwindcss/tailwind.css";
import { useAuth } from "../context/AuthContext";

function PostJob(this: any) {
    const location = useLocation();
    const history = useHistory()

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const form = event.target as HTMLFormElement;
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}/api/recruiter/postjob`,
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                employer_id: form.employer_id.value,
                job_title: form.job_title.value,
                job_location: form.email.value,
                job_description: form.job_description.value,
            },
        });
    };

    //Checking auth/login
    const auth = useAuth();
    const signedIn = auth.getAuthData().authToken.length > 0;

    return (
        <div className="mx-auto max-w-screen-xl pt-96  ">
            <div className="text-xl font-bold pb-10">Create a new job listing</div>
            <form onSubmit={submitForm}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                        >
                            Company Name
                        </label>
                        <TextInput
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            placeholder="Company XYZ"
                            name={"employer_id"}
                            required={true}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                        >
                            Job Title
                        </label>
                        <TextInput
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            placeholder="Software Engineer"
                            name={"job_title"}
                            required={true}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Job Location
                        </label>
                        <TextInput
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            placeholder="Toronto, Canada"
                            name={"job_location"}
                            required={true}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-city"
                        >
                            Job Description
                        </label>
                        <TextInput
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            placeholder="This job requires proficiency in Java."
                            name={"job_description"}
                            required={true}
                        />
                    </div>
                </div>
                <button
                    className="h-12 px-6  text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default PostJob