import React from "react";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import JobseekerProfile from "../types/JobseekerProfile";
import Seeker from "../components/Seeker";
import axios from "axios";
import ProfileSearchBar from "../components/ProfileSearchBar";

const filterSeekerSkills = (seekers: JobseekerProfile[], query: any) => {
  if (!query) {
    return seekers;
  }

  return seekers.filter((seeker: JobseekerProfile) => {
    const lower = seeker.skills.map((skill) => skill.toLowerCase());
    const keywords = query.toLowerCase().split(/[ ,]+/);
    return keywords.some((x: string) => lower.includes(x));
  });
};

const SearchProfiles = () => {
  //Aquire state and search parameters
  const [isLoading, setIsLoading] = useState(true);
  const { search } = window.location;
  const params = new URLSearchParams(search);
  const [Seekers, setSeekers] = useState<JobseekerProfile[]>([]);

  useEffect(() => {
    const getAllJoblistings = async (setIsLoading: any, setlistings: any) => {
      return axios
        .get(`${process.env.REACT_APP_API_URL}/api/allseekerprofiles`)
        .then((res) => {
          setIsLoading(false);
          const seeker_list = [] as JobseekerProfile[];
          for (const seeker of res.data) {
            seeker_list.push({
              user: seeker.user,
              profile_picture: seeker.profile_picture,
              email: seeker.email,
              firstName: seeker.firstName,
              lastName: seeker.lastName,
              socials: seeker.socials,
              resumeUrl: seeker.resumeUrl,
              summary: seeker.summary,
              address: seeker.address,
              workExperience: seeker.workExperience,
              education: seeker.education,
              skills: seeker.skills,
              metadata: seeker.metadata,
            });
          }
          setlistings(seeker_list);
        });
    };
    if (isLoading) {
      getAllJoblistings(setIsLoading, setSeekers).then(() => {
        setIsLoading(false);
      });
    }
  }, [isLoading]);
  let filteredSeekers = Seekers;
  const wordParam = params.get("skills");
  const [searchWordQuery] = useState(wordParam || "");
  if (searchWordQuery !== "") {
    filteredSeekers = filterSeekerSkills(filteredSeekers, searchWordQuery);
  }
  const listSeekers = filteredSeekers.map((s) => {
    return <Seeker seeker={s} />;
  });
  return (
    <div className="px-8 pt-28 h-screen bg-gray-100">
      <header></header>
      <main className="p-8 top-0">
        <ProfileSearchBar />
        {filteredSeekers ? (
          <>{listSeekers}</>
        ) : (
          <>None matching criteria found.</>
        )}
      </main>
    </div>
  );
};

export default SearchProfiles;
