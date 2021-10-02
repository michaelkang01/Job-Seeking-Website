import React from 'react';
import { useEffect, useState } from 'react';
import "tailwindcss/tailwind.css"
import axios from 'axios';

type Joblisting = {
  listing_id: number,
  employer_id: String, //should be listingname of the listing poster.
  job_description: String,
  job_location: String,
  job_title: String,
  date_posted: Date,
  contact_name: String,
  contact_title: String,
  contact_address: String,
  number_applied: number,
  metadata: any
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParam, setSearchParam] = useState("");
  
  const getFilterJoblistings = async (setIsLoading: any, setlistings: any) => {
    return axios.get('http://localhost:8001/joblistings')
      .then(res => {
        setIsLoading(false);
        const listing_list = [] as Joblisting[];
        for (const listing of res.data) {
          listing_list.push({
            listing_id: listing.listing_id,
            employer_id: listing.emplyoer_id,
            job_description: listing.job_description,
            job_location: listing.job_location,
            job_title: listing.job_title,
            date_posted: listing.date_posted,
            contact_name: listing.contact_name,
            contact_title: listing.contact_title,
            contact_address: listing.contact_address,
            number_applied: listing.number_applied,
            metadata: listing.metadata
          });
        }
        setlistings(listing_list);
      });
  };

  const getAllJoblistings = async (setIsLoading: any, setlistings: any) => {
    return axios.get('http://localhost:8001/joblistings')
      .then(res => {
        setIsLoading(false);
        const listing_list = [] as Joblisting[];
        for (const listing of res.data) {
          listing_list.push({
            listing_id: listing.listing_id,
            employer_id: listing.emplyoer_id,
            job_description: listing.job_description,
            job_location: listing.job_location,
            job_title: listing.job_title,
            date_posted: listing.date_posted,
            contact_name: listing.contact_name,
            contact_title: listing.contact_title,
            contact_address: listing.contact_address,
            number_applied: listing.number_applied,
            metadata: listing.metadata
          });
        }
        setlistings(listing_list);
      });
  };


  const [joblistings, setListings] = useState<Joblisting[]>([]);

  useEffect(() => {
    if (isLoading) {
      getAllJoblistings(setIsLoading, setListings).then(() => {
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  return (
    <div className="">
      <header>
      </header>
      <main className="p-8 top-0">
        <p>This exists only to show that the connection to the database is working as intended. Every user in the database is listed below.</p>
        {isLoading ? <p>Loading...</p> :
          joblistings.map((joblisting: Joblisting) => (
            <div className="mt-2 py-2 px-4 bg-gray-200 rounded-md" key={joblisting.listing_id}>
              <p>Listing_id: {joblisting.listing_id}</p>
              <p>Employer_id: {joblisting.employer_id}</p>
              <p>Job_location: {joblisting.job_location}</p>
              <p>job_description: {joblisting.job_description}</p>
              <p>Metadata: {joblisting.metadata}</p>
            </div>
          ))
        }
      </main>
    </div>
  );
}

export default App;
