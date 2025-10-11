"use client";

import React, { useState } from "react";
import Image from "next/image";
import Pagination from "../common/Pagination";

type ToggleOption = "job-posts" | "application";

interface JobPostApplicationTableProps {
  selectedToggle: ToggleOption;
  jobPosts?: JobPostData[];
  applications?: ApplicationData[];
  onEditJobPost?: (index: number, jobData: JobPostData) => void;
  onDeleteJobPost?: (index: number, jobData: JobPostData) => void;
  onChangeJobPostStatus?: (
    index: number,
    jobData: JobPostData,
    newStatus: "Active" | "Closed"
  ) => void;
  onToggleVisibility?: (index: number, jobData: JobPostData) => void;
  onChangeApplicationStatus?: (
    index: number,
    application: ApplicationData,
    newStatus: "In Review" | "Shortlisted" | "New"
  ) => void;
  onDownloadResume?: (index: number, application: ApplicationData) => void;
  // Pagination props
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
}

interface ApplicationData {
  id: number;
  candidatesName: string;
  emailAddress: string;
  phoneNumber: string;
  workExperience: string;
  expectedSalary: string;
  appliedFor: string;
  resumeStatus: "In Review" | "Shortlisted" | "New";
  resumeUrl?: string;
}

interface JobPostData {
  id: number;
  jobTitle: string;
  department: string;
  location: string;
  status: "Active" | "Closed" | "Deleted";
  isVisible: boolean;
}

const mockApplicationData: ApplicationData[] = [];

const mockJobPostData: JobPostData[] = [];

const JobPostApplicationTable: React.FC<JobPostApplicationTableProps> = ({
  selectedToggle,
  jobPosts = mockJobPostData,
  applications = mockApplicationData,
  onEditJobPost,
  onDeleteJobPost,
  onChangeJobPostStatus,
  onToggleVisibility,
  onChangeApplicationStatus,
  onDownloadResume,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [jobPostStatuses, setJobPostStatuses] = useState<
    ("Active" | "Closed" | "Deleted")[]
  >(jobPosts.map((item) => item.status));
  const [applicationStatuses, setApplicationStatuses] = useState<
    ("In Review" | "Shortlisted" | "New")[]
  >(applications.map((item) => item.resumeStatus));

  // keep local mirrors in sync with incoming props
  React.useEffect(() => {
    setJobPostStatuses(jobPosts.map((item) => item.status));
  }, [jobPosts]);
  React.useEffect(() => {
    setApplicationStatuses(applications.map((item) => item.resumeStatus));
  }, [applications]);

  const handleJobPostStatusChange = (
    index: number,
    newStatus: "Active" | "Closed"
  ) => {
    const updatedStatuses = [...jobPostStatuses];
    updatedStatuses[index] = newStatus;
    setJobPostStatuses(updatedStatuses);
    setDropdownOpen(null);
    onChangeJobPostStatus?.(index, jobPosts[index], newStatus);
  };

  const handleApplicationStatusChange = (
    index: number,
    newStatus: "In Review" | "Shortlisted" | "New"
  ) => {
    const updatedStatuses = [...applicationStatuses];
    updatedStatuses[index] = newStatus;
    setApplicationStatuses(updatedStatuses);
    setDropdownOpen(null);
    onChangeApplicationStatus?.(index, applications[index], newStatus);
  };

  const handleEdit = (index: number) => {
    const jobData = jobPosts[index];
    onEditJobPost?.(index, jobData);
    setDropdownOpen(null);
  };

  const handleDelete = (index: number) => {
    onDeleteJobPost?.(index, jobPosts[index]);
    setDropdownOpen(null);
  };

  const toggleDropdown = (index: number) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest?.("[data-menu-root]")) setDropdownOpen(null);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  const renderApplicationHeaders = () => (
    <div
      className="bg-[#333333] flex items-center text-[#8A8A8A] w-full sticky top-0 z-10"
      style={{
        height: "48px",
        paddingTop: "16px",
        paddingRight: "40px",
        paddingBottom: "16px",
        paddingLeft: "40px",
        gap: "24px",
        fontWeight: 500,
        fontSize: "12px",
        lineHeight: "16px",
      }}
    >
      <div className="flex-1 text-center">Candidates name</div>
      <div className="flex-1 text-center">Email address</div>
      <div className="flex-1 text-center">Phone number</div>
      <div className="flex-1 text-center">Work Experience</div>
      <div className="flex-1 text-center">Expected Salary</div>
      <div className="flex-1 text-center">Applied for</div>
      <div className="flex-1 text-center">Resume status</div>
      <div className="w-20">Action</div>
    </div>
  );

  const renderJobPostHeaders = () => (
    <div
      className="bg-[#333333] flex items-center text-[#8A8A8A] w-full sticky top-0 z-10"
      style={{
        height: "48px",
        paddingTop: "16px",
        paddingRight: "40px",
        paddingBottom: "16px",
        paddingLeft: "40px",
        gap: "24px",
        fontWeight: 500,
        fontSize: "12px",
        lineHeight: "16px",
      }}
    >
      <div className="flex-1">Job title</div>
      <div className="flex-1">Department</div>
      <div className="flex-1">Location</div>
      <div className="flex-1 text-center">Status</div>
      <div className="w-20">Action</div>
    </div>
  );

  const renderApplicationRows = () =>
    applications.map((item, index) => (
      <div
        key={index}
        className="bg-[#1D1D1D] border-r border-b border-l border-[#333333] flex items-center text-white relative w-full"
        style={{
          height: "56px",
          paddingTop: "16px",
          paddingRight: "40px",
          paddingBottom: "16px",
          paddingLeft: "40px",
          gap: "24px",
          fontSize: "14px",
        }}
      >
        <div className="flex-1 flex justify-center">{item.candidatesName}</div>
        <div className="flex-1 flex justify-center">{item.emailAddress}</div>
        <div className="flex-1 flex justify-center">{item.phoneNumber}</div>
        <div className="flex-1 flex justify-center">{item.workExperience}</div>
        <div className="flex-1 flex justify-center">{item.expectedSalary}</div>
        <div className="flex-1 flex justify-center">{item.appliedFor}</div>
        <div className="flex-1 flex justify-center">
          <div className="relative">
            <button
              type="button"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                toggleDropdown(index);
              }}
              className="bg-[#333333] border border-[#333333] rounded flex items-center justify-between transition-colors"
              style={{
                width: "85px",
                height: "24px",
                paddingTop: "4px",
                paddingRight: "10px",
                paddingBottom: "4px",
                paddingLeft: "10px",
                gap: "4px",
              }}
            >
              <span
                className={`text-center ${
                  applicationStatuses[index] === "In Review"
                    ? "text-[#BFBFBF]"
                    : applicationStatuses[index] === "Shortlisted"
                    ? "text-[#0BFFB6]"
                    : "text-[#00DBDC]"
                }`}
                style={{
                  fontWeight: 300,
                  fontSize: "12px",
                  lineHeight: "16px",
                  letterSpacing: "0%",
                }}
              >
                {applicationStatuses[index]}
              </span>
              <svg
                width="8"
                height="6"
                viewBox="0 0 8 6"
                fill="none"
                className={`${
                  applicationStatuses[index] === "In Review"
                    ? "text-[#BFBFBF]"
                    : applicationStatuses[index] === "Shortlisted"
                    ? "text-[#0BFFB6]"
                    : "text-[#00DBDC]"
                } transform transition-transform duration-200 ${
                  dropdownOpen === index ? "rotate-180" : ""
                }`}
              >
                <path
                  d="M1 1L4 4L7 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {dropdownOpen === index && (
              <div
                className="absolute left-0 bg-[#1D1D1D] border border-[#333333] rounded shadow-lg z-10"
                style={{
                  width: "85px",
                  // Position above for last 2 items, below for others
                  ...(index >= applications.length - 2
                    ? { bottom: "100%", marginBottom: "4px" }
                    : { top: "100%", marginTop: "4px" }),
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    handleApplicationStatusChange(index, "In Review")
                  }
                  className="block w-full text-left px-3 py-2 text-sm text-white hover:bg-[#333333]"
                >
                  In Review
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleApplicationStatusChange(index, "Shortlisted")
                  }
                  className="block w-full text-left px-3 py-2 text-sm text-white hover:bg-[#333333]"
                >
                  Shortlisted
                </button>
                <button
                  type="button"
                  onClick={() => handleApplicationStatusChange(index, "New")}
                  className="block w-full text-left px-3 py-2 text-sm text-white hover:bg-[#333333]"
                >
                  New
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-20">
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown(index + 1000)}
              className="w-8 h-8 flex items-center justify-center hover:bg-[#333333] rounded"
            >
              <Image
                src="/images/careers/dots-vertical.svg"
                alt="Actions"
                width={16}
                height={16}
              />
            </button>
            {dropdownOpen === index + 1000 && (
              <div
                className="absolute right-0 bg-[#1D1D1D] border border-[#333333] rounded shadow-lg z-10"
                style={{
                  // Position above for last 2 items, below for others
                  ...(index >= applications.length - 2
                    ? { bottom: "100%", marginBottom: "4px" }
                    : { top: "100%", marginTop: "4px" }),
                }}
              >
                {item.resumeUrl && (
                  <button
                    type="button"
                    onClick={() => onDownloadResume?.(index, item)}
                    className="block w-full text-left px-3 py-2 text-sm text-white hover:bg-[#333333]"
                  >
                    Download Resume
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="block w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-[#333333]"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    ));

  const renderJobPostRows = () =>
    jobPosts.map((item, index) => (
      <div
        key={index}
        className="bg-[#1D1D1D] border-r border-b border-l border-[#333333] flex items-center text-white relative w-full"
        style={{
          height: "56px",
          paddingTop: "16px",
          paddingRight: "40px",
          paddingBottom: "16px",
          paddingLeft: "40px",
          gap: "24px",
          fontSize: "14px",
        }}
      >
        <div className="flex-1">{item.jobTitle}</div>
        <div className="flex-1">{item.department}</div>
        <div className="flex-1">{item.location}</div>
        <div className="flex-1 flex justify-center">
          <div className="relative" data-menu-root>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown(index + 2000);
              }}
              className="bg-[#333333] border border-[#333333] rounded flex items-center justify-center gap-1 transition-colors"
              style={{
                width: "85px",
                height: "24px",
                paddingTop: "4px",
                paddingRight: "10px",
                paddingBottom: "4px",
                paddingLeft: "10px",
                gap: "4px",
              }}
            >
              <span
                className={`text-center ${
                  jobPostStatuses[index] === "Active"
                    ? "text-[#00DBDC]"
                    : jobPostStatuses[index] === "Closed"
                    ? "text-[#BFBFBF]"
                    : "text-[#FF6B6B]"
                }`}
                style={{
                  fontWeight: 300,
                  fontSize: "12px",
                  lineHeight: "16px",
                  letterSpacing: "0%",
                }}
              >
                {jobPostStatuses[index]}
              </span>
              <svg
                width="8"
                height="6"
                viewBox="0 0 8 6"
                fill="none"
                className={`${"text-[#BFBFBF]"} transform transition-transform duration-200 ${
                  dropdownOpen === index + 2000 ? "rotate-180" : ""
                }`}
              >
                <path
                  d="M1 1L4 4L7 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {dropdownOpen === index + 2000 && (
              <div
                className="absolute left-0 bg-[#1D1D1D] border border-[#333333] rounded shadow-lg z-10"
                data-menu-root
                style={{
                  width: "85px",
                  // Position above for last 2 items, below for others
                  ...(index >= jobPosts.length - 2
                    ? { bottom: "100%", marginBottom: "4px" }
                    : { top: "100%", marginTop: "4px" }),
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    handleJobPostStatusChange(
                      index,
                      jobPostStatuses[index] === "Active" ? "Closed" : "Active"
                    );
                    setDropdownOpen(null);
                  }}
                  className="block w-full text-left px-3 py-2 text-sm text-white hover:bg-[#333333]"
                >
                  {jobPostStatuses[index] === "Active" ? "Closed" : "Active"}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-20">
          <div className="relative" data-menu-root>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown(index + 3000);
              }}
              className="w-8 h-8 flex items-center justify-center hover:bg-[#333333] rounded"
            >
              <Image
                src="/images/careers/dots-vertical.svg"
                alt="Actions"
                width={16}
                height={16}
              />
            </button>
            {dropdownOpen === index + 3000 && (
              <div
                className="absolute right-0 bg-[#1D1D1D] border border-[#333333] rounded shadow-lg z-10"
                style={{
                  // Position above for last 2 items, below for others
                  ...(index >= jobPosts.length - 2
                    ? { bottom: "100%", marginBottom: "4px" }
                    : { top: "100%", marginTop: "4px" }),
                }}
                data-menu-root
              >
                <button
                  type="button"
                  onClick={() => {
                    handleEdit(index);
                    setDropdownOpen(null);
                  }}
                  className="block w-full text-left px-3 py-2 text-sm text-white hover:bg-[#333333]"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onToggleVisibility?.(index, jobPosts[index]);
                    setDropdownOpen(null);
                  }}
                  className="block w-full text-left px-3 py-2 text-sm text-white hover:bg-[#333333]"
                >
                  {jobPosts[index].isVisible ? "Hide" : "Show"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDelete(index);
                    setDropdownOpen(null);
                  }}
                  className="block w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-[#333333]"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    ));

  return (
    <div className="w-full pb-6">
      {selectedToggle === "application" ? (
        <div className="w-full">
          <div className="border border-[#333333] rounded-t-2xl overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              {renderApplicationHeaders()}
              <div className="pb-4">{renderApplicationRows()}</div>
            </div>
          </div>
          {onPageChange && (
            <div className="mt-4 px-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full">
          <div className="border border-[#333333] rounded-2xl overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              {renderJobPostHeaders()}
              <div className="">{renderJobPostRows()}</div>
            </div>
          </div>
          {onPageChange && (
            <div className="mt-4 px-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobPostApplicationTable;
