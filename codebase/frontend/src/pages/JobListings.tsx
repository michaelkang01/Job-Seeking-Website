import React, { useEffect } from "react";
import { useState } from "react";
import "tailwindcss/tailwind.css";
import Footer from "../components/Footer";
import Job from "../components/Job";
import Nav from "../components/Nav";
import Joblisting from "../types/Joblisting";
import getPosting from "./getPostings";
import './JobListings.css'

interface prop{
   jobs:Joblisting[]
}
const JobListings = (props:prop) => {
   console.log('render')
   var date = new Date();
   

   const [moreDetails,setMoredetails] = useState(-1)
  function handleClick(){
   if(moreDetails ==-1){
      return
   }
   setMoredetails(-1)
   }
   const differenceInDays = (a:Date, b:Date) => Math.floor(
      (a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24)
    )
  return (
   <div className="bg-gray-100 " >
   
       
       <div className="mx-auto grid grid-flow-col auto-cols-max max-w-screen-xl    bg-gray-100">
        
        <div className="pt-24 pb-6 mx-0 ">
        
         
   
           {props.jobs !=undefined && props.jobs.map((Posting)=>{
              return(
                 <Job moreDetails={moreDetails} setMoreDetails={setMoredetails} job={Posting} />
              )
           })}
        </div>
        
        <div className="pt-24  pb-6 w-full ">
        
       {moreDetails == -1 ?<> </>:
            <div className="moredetails p-12 text-gray-900 w-full  pr-25  mx-2  bg-white border rounded flex-none">
               <button onClick={ handleClick} className="cross ">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>
      </button>
      
              <span className="text-3xl text-left font-bold">{props.jobs[moreDetails-1].job_title}</span>
             <div className="text-2xl">{props.jobs[moreDetails-1].employer_id}</div>
             <div className="text-xl text-right">{props.jobs[moreDetails-1].contact_name}</div>
             <div className="text-xl text-right">{props.jobs[moreDetails-1].contact_address}</div>
             <div className="text-xl text-right">{props.jobs[moreDetails-1].contact_title}</div>
             <div className="text-xl font-semibold">{props.jobs[moreDetails-1].number_applied == 0?<div>Be the first to apply</div>:<div> {props.jobs[moreDetails-1].number_applied} others already applied </div>}  </div>
             <section>{props.jobs[moreDetails-1].job_location}</section>
             <section className =" font-extralight text-center">- {props.jobs[moreDetails-1].job_description}</section>
           
          
            
            <button className="button bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ">
            Apply
            </button>
            <div className="text-xl font-bold">
           Posted  {differenceInDays(date,new Date(props.jobs[moreDetails-1].date_posted))} days ago
           </div>
         </div> }
       
  
   
      
        
            </div> 
        </div>
        

     </div>
  );
};

export default JobListings;