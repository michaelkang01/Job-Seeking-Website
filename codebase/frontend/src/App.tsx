import React, { Component } from 'react'
import { useEffect, useState } from 'react';
import "tailwindcss/tailwind.css"
import axios from 'axios';

type joblisting = {
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
    const removeAlllistings = async () => {
      return axios.post('http://localhost:8001/remove_all_listings');
    }
  
    const createTestlisting = async () => {
      return axios.get('http://localhost:8001/create_test_listing');
    }
  
    const getAlllistings = async (setIsLoading: any, setlistings: any) => {
      return axios.get('http://localhost:8001/listings')
        .then(res => {
          setIsLoading(false);
          const listing_list = [] as joblisting[];
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
  
    const [listings, setlistings] = useState<joblisting[]>([]);
  
    useEffect(() => {
      if (isLoading) {
        getAlllistings(setIsLoading, setlistings).then(() => {
          setIsLoading(false);
        });
      }
    }, [isLoading]);
  
    return (
      <div className="">
        <header>
        </header>
        <main className="p-8 top-0">
          <p>This exists only to show that the connection to the database is working as intended. Every listing in the database is listed below.</p>
  
          <div className="mt-4 mb-2 inline-block"><a onClick={() => removeAlllistings().then(() => {
            getAlllistings(setIsLoading, setlistings)
          })} className="bg-black p-2 text-white mr-1 rounded-md cursor-pointer">Remove all listings</a>
          <a onClick={() =>
            createTestlisting().then(() => {
              getAlllistings(setIsLoading, setlistings)
            })
          } className="bg-black p-2 text-white rounded-md cursor-pointer">Create test listing</a></div>
          {isLoading ? <p>Loading...</p> :
            listings.map((listing: joblisting) => (
              <div className="mt-2 py-2 px-4 bg-gray-200 rounded-md" key={listing.listing_id}>
                <p>listing_id: {listing.listing_id}</p>
                <p>job_description: {listing.job_description}</p>
                <p>job_location: {listing.job_location}</p>
                <p>job_title: {listing.job_title}</p>
                <p>date_posted: {listing.date_posted}</p>
                <p>contact_name: {listing.contact_name}</p>
                <p>contact_title: {listing.contact_title}</p>
                <p>contact_address: {listing.contact_address}</p>
                <p>number_applied: {listing.number_applied}</p>
                <p>metadata: {listing.metadata}</p>
              </div>
            ))
          }
        </main>
      </div>
    );
  }

  export default App;