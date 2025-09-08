"use client";

import { useState } from "react";
import { JobSearchSection as JobSearchSectionType } from "@/types/staticPages";
import JobDisplay from "./JobDisplay";

interface JobSearchSectionProps {
  data: JobSearchSectionType;
  isMobile?: boolean;
}

const JobSearchSection = ({ data, isMobile }: JobSearchSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All job categories");
  const [selectedType, setSelectedType] = useState("All job types");
  const [selectedLocation, setSelectedLocation] = useState("All job location");

  const filteredJobs = data.jobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All job categories" || true; // For now, all jobs match
    const matchesType =
      selectedType === "All job types" || job.jobType === selectedType;
    const matchesLocation =
      selectedLocation === "All job location" ||
      job.location === selectedLocation;

    return matchesSearch && matchesCategory && matchesType && matchesLocation;
  });

  return (
    <div className="w-full flex justify-center px-6 mt-[-200px] md:mt-[-320px] md:px-[120px]">
      <div
        className={`${
          isMobile ? "h-[785px]" : "h-[1388px]"
        } w-full rounded-[40px] border-2 border-[#333333] bg-gradient-to-b from-[#1E1E1E] to-[#141414]`}
      >
        {/* Job Search Bar */}
        <div
          className={`p-6 md:px-10 md:pt-10 md:pb-6 ${
            isMobile ? "space-y-4" : "flex gap-4"
          }`}
        >
          {/* Search Input */}
          <div className="relative flex-1 w-[2/5]">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`${
                isMobile
                  ? "h-[36px] pl-10 pr-4 py-2"
                  : "h-[44px] pl-10 pr-4 py-3"
              } w-full bg-[#0D0D0D] border border-[#333333] rounded-lg text-white placeholder-[#FFFFFF] focus:outline-none focus:border-[#00DBDC]`}
            />
            <img
              src="/images/careers/career-search.svg"
              alt="Search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
            />
          </div>

          {/* Job Categories Dropdown */}
          <div className="relative md:w-[240px] w-[1/5]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`${
                isMobile
                  ? "h-[36px] pl-4 pr-10 leading-[36px]"
                  : "h-[44px] pl-4 pr-10 leading-[44px]"
              } w-full bg-[#0D0D0D] border border-[#333333] rounded-lg text-white focus:outline-none focus:border-[#00DBDC] appearance-none`}
            >
              {data.jobCategories.map((category) => (
                <option
                  key={category}
                  value={category}
                  className="bg-[#0D0D0D] text-white"
                >
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path
                  d="M1 1L6 6L11 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Job Types Dropdown */}
          <div className="relative md:w-[240px] w-[1/5]">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className={`${
                isMobile
                  ? "h-[36px] pl-4 pr-10 leading-[36px]"
                  : "h-[44px] pl-4 pr-10 leading-[44px]"
              } w-full bg-[#0D0D0D] border border-[#333333] rounded-lg text-white focus:outline-none focus:border-[#00DBDC] appearance-none`}
            >
              {data.jobTypes.map((type) => (
                <option
                  key={type}
                  value={type}
                  className="bg-[#0D0D0D] text-white"
                >
                  {type}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path
                  d="M1 1L6 6L11 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Job Location Dropdown */}
          <div className="relative md:w-[240px] w-[1/5]">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className={`${
                isMobile
                  ? "h-[36px] pl-4 pr-10 leading-[36px]"
                  : "h-[44px] pl-4 pr-10 leading-[44px]"
              } w-full bg-[#0D0D0D] border border-[#333333] rounded-lg text-white focus:outline-none focus:border-[#00DBDC] appearance-none`}
            >
              {data.jobLocations.map((location) => (
                <option
                  key={location}
                  value={location}
                  className="bg-[#0D0D0D] text-white"
                >
                  {location}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path
                  d="M1 1L6 6L11 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Job Component List */}
        <div className="px-6 md:px-10 pb-6 md:pb-10">
          <div className="space-y-0">
            {filteredJobs.map((job, index) => (
              <JobDisplay
                key={job.id}
                job={job}
                isMobile={isMobile}
                isFirst={index === 0}
                isLast={(index + 1) % 10 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearchSection;
