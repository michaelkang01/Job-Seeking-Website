import React from 'react';
import { useEffect, useState } from 'react';
import "tailwindcss/tailwind.css"
import axios from 'axios';
import SearchBar from './components/SearchBar'
import Joblisting from './types/Joblisting'

const filterListingLoc = (joblistings: Joblisting[], query: any) => {
  if (!query) {
      return joblistings;
   }

  return joblistings.filter((joblisting: Joblisting) => {
      const postName = joblisting.job_location.toLowerCase();
      return postName.includes(query.toLowerCase());
  });
};
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { search } = window.location;
  const params = new URLSearchParams(search).get('location');
  const [searchQuery, setSearchQuery] = useState(params|| '');

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

  const filteredListingsLoc = filterListingLoc(joblistings, searchQuery);
  return (
    <div className="">
      <header>
      </header>
      <main className="p-8 top-0">
        <SearchBar />
        <p>Testing platform for Joblistings and Search functions. Currently Location functional to exact/inclusive wording.</p>
        {isLoading ? <p>Loading...</p> :
          filteredListingsLoc.map((joblisting: Joblisting) => (
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
