import React from 'react'
import "tailwindcss/tailwind.css";

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

const Job = (props:JobPosting) => {

    return (    
        <div>                                             
        <div className="container flex mx-auto px-2  mt-2 rounded">
       
         <div className="w-full lg:w-3/5 p-8 text-gray-900 leading-normal bg-white border rounded">
             
              <section>{props?.job_title}</section>
             {props?.employer_id}

             <section>{props?.job_location}</section>
            
             
         </div>
     
       
      </div>

     </div>
    
           
          
          
      
    )
}

export default Job
