"use client";

import React, { useState } from "react";
import Image from "next/image";
import JobPostApplicationTable from "./JobPostApplicationTable";
import AddJobPostModal from "./AddJobPostModal";

type ToggleOption = "job-posts" | "application";

const JobPostApplicationSection: React.FC = () => {
  const [selectedToggle, setSelectedToggle] =
    useState<ToggleOption>("job-posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editJobData, setEditJobData] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  const handleAddNew = () => {
    setIsEditMode(false);
    setEditJobData(null);
    setIsAddModalOpen(true);
  };

  const handleEditJobPost = (index: number, jobData: any) => {
    const mappedData = {
      jobTitle: jobData.jobTitle,
      department: jobData.department,
      location: jobData.location,
      jobType: "Full-time", // Default since this field might not exist in mockData
      applicationDeadline: "", // Default since this field might not exist in mockData
      jobDescription: "Job description placeholder", // Default since this field might not exist in mockData
    };
    setEditJobData(mappedData);
    setIsEditMode(true);
    setIsAddModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
    setIsEditMode(false);
    setEditJobData(null);
  };

  const handleJobPostSubmit = (jobPost: any) => {
    if (isEditMode) {
      console.log("Job post updated:", jobPost);
      // Here you would typically make an API call to update the job post
    } else {
      console.log("New job post created:", jobPost);
      // Here you would typically make an API call to save the job post
    }
  };

  const handleFilter = () => {
    console.log("Filter clicked");
  };

  return (
    <div>
      {/* Filter Header */}
      <div className="flex justify-between items-center p-6">
        {/* Toggle Section */}
        <div
          className="bg-[#1D1D1D] rounded-lg flex p-[6px]"
          style={{
            width: "202px",
            height: "40px",
            gap: "13px",
          }}
        >
          <button
            type="button"
            onClick={() => setSelectedToggle("job-posts")}
            className={`rounded-md px-3 py-1 text-sm transition-all duration-200 ${
              selectedToggle === "job-posts"
                ? "bg-[#00DBDC] text-[#0D0D0D]"
                : "text-[#8A8A8A]"
            }`}
            style={{
              width: "90px",
              height: "28px",
              fontFamily: "Inter",
              fontWeight: selectedToggle === "job-posts" ? 500 : 400,
              fontSize: "14px",
              lineHeight: "20px",
            }}
          >
            Job posts
          </button>
          <button
            type="button"
            onClick={() => setSelectedToggle("application")}
            className={`rounded-md px-3 py-1 text-sm transition-all duration-200 ${
              selectedToggle === "application"
                ? "bg-[#00DBDC] text-[#0D0D0D]"
                : "text-[#8A8A8A]"
            }`}
            style={{
              width: "90px",
              height: "28px",
              fontFamily: "Inter",
              fontWeight: selectedToggle === "application" ? 500 : 400,
              fontSize: "14px",
              lineHeight: "20px",
            }}
          >
            Application
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="bg-[#0D0D0D] border border-[#333333] rounded-lg pl-10 pr-4 py-2 text-white placeholder-[#8A8A8A] focus:outline-none focus:border-[#00DBDC] transition-colors duration-200"
              style={{ width: "240px", height: "40px" }}
            />
            <Image
              src="/images/careers/career-search.svg"
              alt="Search"
              width={16}
              height={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A8A8A]"
            />
          </div>

          {/* Filter Button */}
          <button
            type="button"
            onClick={handleFilter}
            className="bg-[#0D0D0D] border border-[#333333] rounded-lg flex items-center justify-center gap-2 hover:bg-[#333333] transition-colors duration-200 px-4"
            style={{ height: "40px" }}
          >
            <Image
              src="/images/careers/filter.svg"
              alt="Filter"
              width={16}
              height={16}
            />
            <span className="text-[#BFBFBF] text-sm font-normal">Filter</span>
          </button>

          {/* Add New Post Button */}
          <button
            type="button"
            onClick={handleAddNew}
            className="bg-[#0D0D0D] border border-[#333333] rounded-lg flex items-center justify-center gap-2 hover:bg-[#333333] transition-colors duration-200 px-4"
            style={{ height: "40px" }}
          >
            <Image
              src="/images/careers/plus.svg"
              alt="Add new post"
              width={16}
              height={16}
            />
            <span className="text-[#BFBFBF] text-sm font-normal">
              Add new post
            </span>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="pb-6">
        <JobPostApplicationTable
          selectedToggle={selectedToggle}
          onEditJobPost={handleEditJobPost}
        />
      </div>

      {/* Add Job Post Modal */}
      <AddJobPostModal
        isOpen={isAddModalOpen}
        onClose={handleModalClose}
        onSubmit={handleJobPostSubmit}
        editData={editJobData}
        isEdit={isEditMode}
      />
    </div>
  );
};

export default JobPostApplicationSection;
