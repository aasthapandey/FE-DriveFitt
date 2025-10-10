"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import JobPostApplicationTable from "./JobPostApplicationTable";
import AddJobPostModal from "./AddJobPostModal";
import { jobAPI } from "@/services/jobAPI";
import { applicationAPI } from "@/services/applicationAPI";
import { ApplicationStatus, JobStatus, JobType } from "@/types/database";

type ToggleOption = "job-posts" | "application";

const JobPostApplicationSection: React.FC = () => {
  const [selectedToggle, setSelectedToggle] =
    useState<ToggleOption>("job-posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editJobData, setEditJobData] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [jobPosts, setJobPosts] = useState<
    {
      id: number;
      jobTitle: string;
      department: string;
      location: string;
      status: "Active" | "Closed" | "Deleted";
      isVisible: boolean;
    }[]
  >([]);
  const [applications, setApplications] = useState<
    {
      id: number;
      candidatesName: string;
      emailAddress: string;
      phoneNumber: string;
      workExperience: string;
      expectedSalary: string;
      appliedFor: string;
      resumeStatus: "In Review" | "Shortlisted" | "New";
      resumeUrl?: string;
    }[]
  >([]);

  const toStatus = (s: number | JobStatus): "Active" | "Closed" | "Deleted" =>
    s === JobStatus.ACTIVE
      ? "Active"
      : s === JobStatus.CLOSED
      ? "Closed"
      : "Deleted";

  const toApplicationLabel = (
    s: number | ApplicationStatus
  ): "In Review" | "Shortlisted" | "New" =>
    s === ApplicationStatus.SHORTLISTED
      ? "Shortlisted"
      : s === ApplicationStatus.IN_REVIEW
      ? "In Review"
      : "New";

  useEffect(() => {
    (async () => {
      try {
        const [jobs, apps] = await Promise.all([
          jobAPI.list(),
          applicationAPI.list(),
        ]);

        const jobMapped = jobs.map((j) => ({
          id: j.id,
          jobTitle: j.title,
          department: j.department?.name || "",
          location: j.location?.full_location || "",
          status: toStatus(j.status as number),
          isVisible: !!j.is_visible,
        }));
        setJobPosts(jobMapped);

        const appMapped = apps.map((a) => ({
          id: a.id,
          candidatesName: a.candidate_name,
          emailAddress: a.email,
          phoneNumber: a.phone || "",
          workExperience: a.work_exprience || "",
          expectedSalary: a.expected_salary || "",
          appliedFor: a.job?.title || "",
          resumeStatus: toApplicationLabel(a.status),
          resumeUrl: a.resume,
        }));
        setApplications(appMapped);
      } catch (_) {
        setJobPosts([]);
        setApplications([]);
      }
    })();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleAddNew = () => {
    setIsEditMode(false);
    setEditJobData(null);
    setIsAddModalOpen(true);
  };

  const handleEditJobPost = (index: number, jobData: any) => {
    const mappedData = {
      jobTitle: jobData.jobTitle || "",
      departmentId: "",
      locationId: "",
      jobType: "Full-time",
      applicationDeadline: "",
      jobDescription: "",
      skillsRequired: "",
      roleItems: [],
      qualifications: [],
      yearsOfExperience: "",
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

  const handleJobPostSubmit = async (jobPost: any) => {
    const mapJobType = (jt: string): JobType => {
      const v = (jt || "").toLowerCase();
      if (v.includes("part")) return JobType.PART_TIME;
      if (v.includes("contract")) return JobType.CONTRACTOR;
      return JobType.FULL_TIME;
    };

    const payload = {
      title: jobPost.jobTitle,
      department_id: Number(jobPost.departmentId),
      location_id: Number(jobPost.locationId),
      job_type: mapJobType(jobPost.jobType),
      application_deadline: jobPost.applicationDeadline || undefined,
      job_description: jobPost.jobDescription || undefined,
      skills_required: jobPost.skillsRequired || undefined,
      role: jobPost.roleItems || [],
      qualifications: jobPost.qualifications || [],
      years_of_experience: jobPost.yearsOfExperience || undefined,
      is_visible: true,
    } as any;

    if (isEditMode && jobPost?.id) {
      await jobAPI.update(jobPost.id, payload);
    } else {
      await jobAPI.create(payload);
    }
    setIsAddModalOpen(false);
    const refreshed = await jobAPI.list();
    setJobPosts(
      refreshed.map((j) => ({
        id: j.id,
        jobTitle: j.title,
        department: j.department?.name || "",
        location: j.location?.full_location || "",
        status: toStatus(j.status),
        isVisible: !!j.is_visible,
      }))
    );
  };

  const handleFilter = () => {};

  const filteredJobPosts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return jobPosts.filter(
      (j) =>
        j.jobTitle.toLowerCase().includes(q) ||
        j.department.toLowerCase().includes(q)
    );
  }, [jobPosts, searchQuery]);

  const filteredApplications = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return applications.filter(
      (a) =>
        a.candidatesName.toLowerCase().includes(q) ||
        a.appliedFor.toLowerCase().includes(q)
    );
  }, [applications, searchQuery]);

  const handleChangeJobPostStatus = async (
    index: number,
    jobData: { id: number },
    newStatus: "Active" | "Closed"
  ) => {
    await jobAPI.setStatus(
      jobData.id,
      newStatus === "Active" ? JobStatus.ACTIVE : JobStatus.CLOSED
    );
  };

  const handleToggleVisibility = async (
    _index: number,
    jobData: { id: number; isVisible: boolean }
  ) => {
    await jobAPI.setVisibility(jobData.id, !jobData.isVisible);
    const refreshed = await jobAPI.list();
    setJobPosts(
      refreshed.map((j) => ({
        id: j.id,
        jobTitle: j.title,
        department: j.department?.name || "",
        location: j.location?.full_location || "",
        status: toStatus(j.status),
        isVisible: !!j.is_visible,
      }))
    );
  };

  const handleChangeApplicationStatus = async (
    index: number,
    application: { id: number },
    newStatus: "In Review" | "Shortlisted" | "New"
  ) => {
    const statusMap: Record<string, ApplicationStatus> = {
      "In Review": ApplicationStatus.IN_REVIEW,
      Shortlisted: ApplicationStatus.SHORTLISTED,
      New: ApplicationStatus.NEW,
    };
    await applicationAPI.setStatus(application.id, statusMap[newStatus]);
  };

  const handleDownloadResume = (
    _index: number,
    application: { resumeUrl?: string }
  ) => {
    if (application.resumeUrl) window.open(application.resumeUrl, "_blank");
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
          jobPosts={filteredJobPosts}
          applications={filteredApplications}
          onEditJobPost={handleEditJobPost}
          onDeleteJobPost={() => {}}
          onChangeJobPostStatus={handleChangeJobPostStatus}
          onChangeApplicationStatus={handleChangeApplicationStatus}
          onDownloadResume={handleDownloadResume}
          onToggleVisibility={handleToggleVisibility}
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
