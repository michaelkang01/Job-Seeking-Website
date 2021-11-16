import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

import Job from "./Job";

import Joblisting from "../types/Joblisting";

import { useAuth } from "../context/AuthContext";


interface prop {
  jobs: Joblisting[]
  applied: boolean

}
const JobListings = (props: prop) => {
  console.log("render");
  var date = new Date();
  let emptyjob = undefined as Joblisting | undefined;
  const auth = useAuth();
  const authToken = auth.getAuthData().authToken;
  const authData = auth.getAuthData().authData;
  const [moreDetails, setMoredetails] = useState(-1);
  const [jobSelected, setJobSelected] = useState(emptyjob);
  function selectJob(id: number) {
    setMoredetails(id);
    var job = props.jobs.find(({ listing_id }) => listing_id === id);

    setJobSelected(job);
  }

  function handleClick() {
    if (moreDetails === -1) {
      return;
    }
    setMoredetails(-1);
    setJobSelected(emptyjob);
  }

  function sendMail() {
    const mailto: string = "mailto:" + jobSelected?.contact_address;
    window.location.href = mailto;
  }

  const differenceInDays = (a: Date, b: Date) =>
    Math.floor((a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24));
  return (
    <div className="bg-gray-100 ">
      <div className="mx-auto grid grid-cols-20 min-w-screen-lg max-w-screen-xl bg-gray-100">
        <div className="pt-24 pb-6 mx-0 w-full">
          {props.jobs !== undefined &&
            props.jobs.map((Posting) => {
              return (
                <Job
                  moreDetails={moreDetails}
                  setMoreDetails={selectJob}
                  job={Posting}
                />
              );
            })}
        </div>

        <div className="pt-24 pb-6 w-full ">
          {moreDetails === -1 || jobSelected === undefined ? (
            <> </>
          ) : (
            <div className="moredetails p-12 text-gray-900 w-full pr-25 mx-2 bg-white border rounded flex-none">
              <button onClick={handleClick} className="cross ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>

              <span className="text-3xl text-left font-bold">
                {jobSelected?.job_title}
              </span>
              <div className="text-2xl">{jobSelected?.employer_id}</div>
              {authToken && authData ? (<>
                <div className="text-xl text-right">{jobSelected?.contact_name}</div>
                <div className="text-xl text-right">{jobSelected?.contact_title}</div>
                <div className="text-xl text-right">{jobSelected?.contact_address}
                  <button onClick={sendMail} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-1 border border-gray-400 rounded shadow">
                    <svg width="20" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </button>
                </div>
              </>) : (
                <>
                  <div className="filter blur text-xl text-right">xczf213asd</div>
                  <div className="filter blur text-xl text-right">sadfdasczxv as3q234213</div>
                  <div className="filter blur text-xl text-right">asdfadsc@dasfrqeatasd.dsc</div>
                  <div className="text-xl text-right">Login to view contact information</div>
                </>
              )}
              <div className="text-xl font-semibold">
                {jobSelected?.number_applied === 0 ? (
                  <div>Be the first to apply</div>
                ) : (
                  <div>
                    {" "}
                    {jobSelected?.number_applied} others already applied{" "}
                  </div>
                )}{" "}
              </div>
              <section>{jobSelected?.job_location}</section>
              <section className=" font-extralight text-center">
                - {jobSelected?.job_description}
              </section>


              {props.applied ? (
                <button className="button bg-green-500  font-semibold text-white py-2 px-4 border  hover:border-transparent rounded cursor-not-allowed ">
                  Applied!
                </button>
              ) : (
                <Link
                  to={{
                    pathname: `/application/${jobSelected.listing_id}`,

                  }}
                >



                  <button className="button bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ">
                    Apply
                  </button>
                </Link>
              )}

              <div className="text-xl font-bold">
                {jobSelected?.date_posted !== undefined ? (
                  <div>
                    Posted{" "}
                    {differenceInDays(date, new Date(jobSelected?.date_posted))}{" "}
                    days ago
                  </div>
                ) : (
                  <div />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListings;
