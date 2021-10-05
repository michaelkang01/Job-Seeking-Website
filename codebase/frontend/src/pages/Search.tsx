import React from 'react';
import { useEffect, useState } from 'react';
import "tailwindcss/tailwind.css"
import axios from 'axios';
import SearchBar from '../components/SearchBar'
import Joblisting from '../types/Joblisting'
import { useAuth } from "../context/AuthContext";

const filterListingLoc = (joblistings: Joblisting[], query: any) => {
  if (!query) {
      return joblistings;
   }

  return joblistings.filter((joblisting: Joblisting) => {
      const jobLoc = joblisting.job_location.toLowerCase();
      const locs = query.toLowerCase().split(/[ ,]+/)
      return locs.some((x: string) => jobLoc.includes(x));
  });
};

const filterListingKeywords = (joblistings: Joblisting[], query: any) => {
  if (!query) {
      return joblistings;
   }

  return joblistings.filter((joblisting: Joblisting) => {
      const jobDesc = joblisting.job_description.toLowerCase();
      const jobTitle = joblisting.job_title.toLowerCase();
      const keywords = query.toLowerCase().split(/[ ,]+/)
      return keywords.some((x:string) => jobDesc.includes(x)) || keywords.some((x:string) => jobTitle.includes(x));
  });
}; 
 //Loading job listings
const Search = () => {
  //Aquire state and search parameters
  const [isLoading, setIsLoading] = useState(true);
  const { search } = window.location;
  const params = new URLSearchParams(search);
  //Checking auth/login
  const auth = useAuth();
  const authToken = auth.getAuthData().authToken;
  const authData = auth.getAuthData().authData;
  //Acquire Job listings
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
  
  let filteredListings = joblistings;
  //Filtering Location
  const locParam = params.get('location');
  const [searchLocQuery, setSearchLocQuery] = useState(locParam ||  "");
  if (searchLocQuery !== "") {
    filteredListings = filterListingLoc(filteredListings, searchLocQuery);
  }
  //Filtering Keywords
  const wordParam = params.get('keywords');
  const [searchWordQuery, setSearchWordQuery] = useState(wordParam ||  "");
  if (searchWordQuery !== "") {
    filteredListings = filterListingKeywords(filteredListings, searchWordQuery);
  }
  return (
    <div className="px-8 pt-28 h-screen">
      <header>
      </header>
      <main className="p-8 top-0">
        {authToken && authData ? (
          <>
          <h1 className="text-2xl">Hi There! {JSON.parse(authData).payload.firstName} {JSON.parse(authData).payload.lastName}.</h1>
          </>
        ) : (
          <h1 className="text-2xl">Hi There, if you want to auto-search your data, please sign in!</h1>
        )}
        <SearchBar />
        <p>Testing platform for Joblistings and Search functions. Keyword/Location working to exact/inclusive and multi-parameter seperated by comma or space</p>
        {isLoading ? <p>Loading...</p> :
          filteredListings.map((joblisting: Joblisting) => (
            <div className="mt-2 py-2 px-4 bg-gray-200 rounded-md" key={joblisting.listing_id}>
              <p>Listing_id: {joblisting.listing_id}</p>
              <p>Employer_id: {joblisting.employer_id}</p>
              <p>Job_Title: {joblisting.job_title}</p>
              <p>Job_location: {joblisting.job_location}</p>
              <p>Job_description: {joblisting.job_description}</p>
              <p>Metadata: {joblisting.metadata}</p>
            </div>
          ))
        }
      </main>
    </div>
  );
}

export default Search;