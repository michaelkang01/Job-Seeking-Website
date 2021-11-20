import React, { useEffect } from "react";
import { useState } from "react";
import "tailwindcss/tailwind.css";
import Footer from "../components/Footer";
import Job from "../components/Job";
import Nav from "../components/Nav";
import getPosting from "./getPostings";


interface JobPosting {
   employer_id: string
   job_location: string 
   job_description: string
   job_title: string
   contact_name:string
   contact_title : string 
   contact_address :string
   number_applied :number 
   date_posted: string

}
const JobListings = () => {
   const [apiJobListings,setApijoblistings] =useState([{ employer_id: "", job_location: "",job_description: "", 
    job_title: "", contact_name: "", contact_title: "", contact_address: "", number_applied: -1 ,date_posted:""}])

   

   useEffect(() => {
     var postings = getPosting()
     setApijoblistings(postings)
   }, [])
 
  return (
   <><div>
        <Nav />

        <body className="bg-gray-100 tracking-wider rounded tracking-normal pt-24">
           
           {apiJobListings && apiJobListings.map((Posting)=>{
              return(
                 <Job {...Posting} />
              )
           })}
                  <div className="w-full lg:w-4/5 lg:ml-auto text-base md:text-sm text-gray-500 px-4 py-6">
          
          </div>
        </body>
        

     </div><Footer /></>
  );
};

export default JobListings;