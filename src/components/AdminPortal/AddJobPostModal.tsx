"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface AddJobPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (jobPost: JobPostFormData) => void;
  editData?: JobPostFormData | null;
  isEdit?: boolean;
}

interface JobPostFormData {
  jobTitle: string;
  department: string;
  location: string;
  jobType: string;
  applicationDeadline: string;
  jobDescription: string;
}

const AddJobPostModal: React.FC<AddJobPostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editData,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState<JobPostFormData>({
    jobTitle: "",
    department: "",
    location: "",
    jobType: "",
    applicationDeadline: "",
    jobDescription: "",
  });

  // Update form data when editData changes
  useEffect(() => {
    if (editData && isEdit) {
      setFormData({
        jobTitle: editData.jobTitle || "",
        department: editData.department || "",
        location: editData.location || "",
        jobType: editData.jobType || "",
        applicationDeadline: editData.applicationDeadline || "",
        jobDescription: editData.jobDescription || "",
      });
    } else if (!isEdit) {
      setFormData({
        jobTitle: "",
        department: "",
        location: "",
        jobType: "",
        applicationDeadline: "",
        jobDescription: "",
      });
    }
  }, [editData, isEdit, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    if (!isEdit) {
      setFormData({
        jobTitle: "",
        department: "",
        location: "",
        jobType: "",
        applicationDeadline: "",
        jobDescription: "",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: "#0D0D0D4D",
          backdropFilter: "blur(24px)",
        }}
        onClick={onClose}
      />

      {/* Side Modal */}
      <div
        className="relative bg-[#1D1D1D] h-full flex flex-col"
        style={{ width: "720px" }}
      >
        {/* Header */}
        <div className="flex items-center pb-2 px-10 pt-10 gap-6">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center rounded-lg hover:bg-[#333333] transition-colors duration-200"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              padding: "4px",
              background: "#282828",
            }}
          >
            <Image
              src="/images/close-cross.svg"
              alt="Close"
              width={24}
              height={24}
            />
          </button>
          <h2
            className="text-white"
            style={{
              fontFamily: "Inter",
              fontWeight: 400,
              fontSize: "24px",
              lineHeight: "32px",
              letterSpacing: "0%",
            }}
          >
            Create new post
          </h2>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex flex-col py-6 px-10">
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            {/* Form Fields Container */}
            <div className="space-y-5">
              {/* Job Title */}
              <div className="flex flex-col" style={{ gap: "8px" }}>
                <label
                  className="text-[#BFBFBF]"
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "0%",
                  }}
                >
                  Job title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  required
                  className="bg-[#282828] text-white border-0 rounded-lg w-full outline-none"
                  style={{
                    height: "44px",
                    paddingTop: "12px",
                    paddingRight: "20px",
                    paddingBottom: "12px",
                    paddingLeft: "20px",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontFamily: "Inter",
                    fontWeight: 400,
                  }}
                  placeholder="Boxing Workouts vs. Other Cardio Exercises"
                />
              </div>

              {/* Department/Category and Location */}
              <div className="flex gap-4">
                <div className="flex flex-col flex-1" style={{ gap: "8px" }}>
                  <label
                    className="text-[#BFBFBF]"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "16px",
                      letterSpacing: "0%",
                    }}
                  >
                    Department/Category
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="bg-[#282828] border-0 rounded-lg outline-none appearance-none"
                    style={{
                      width: "100%",
                      height: "44px",
                      paddingTop: "12px",
                      paddingRight: "20px",
                      paddingBottom: "12px",
                      paddingLeft: "20px",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontFamily: "Inter",
                      fontWeight: 400,
                      color: formData.department ? "#FFFFFF" : "#BFBFBF",
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23BFBFBF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: "right 20px center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "16px",
                    }}
                  >
                    <option value="" style={{ color: "#BFBFBF" }}>
                      Select department
                    </option>
                    <option value="Cricket">Cricket</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Pilates">Pilates</option>
                    <option value="Recovery">Recovery</option>
                    <option value="Running">Running</option>
                    <option value="Admin">Admin</option>
                    <option value="Management">Management</option>
                  </select>
                </div>

                <div className="flex flex-col flex-1" style={{ gap: "8px" }}>
                  <label
                    className="text-[#BFBFBF]"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "16px",
                      letterSpacing: "0%",
                    }}
                  >
                    Location
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="bg-[#282828] border-0 rounded-lg outline-none appearance-none"
                    style={{
                      width: "100%",
                      height: "44px",
                      paddingTop: "12px",
                      paddingRight: "20px",
                      paddingBottom: "12px",
                      paddingLeft: "20px",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontFamily: "Inter",
                      fontWeight: 400,
                      color: formData.location ? "#FFFFFF" : "#BFBFBF",
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23BFBFBF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: "right 20px center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "16px",
                    }}
                  >
                    <option value="" style={{ color: "#BFBFBF" }}>
                      Select location
                    </option>
                    <option value="Sector 10, Dwarka, New Delhi">
                      Sector 10, Dwarka, New Delhi
                    </option>
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Noida">Noida</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                  </select>
                </div>
              </div>

              {/* Job Type and Application Deadline */}
              <div className="flex gap-4">
                <div className="flex flex-col flex-1" style={{ gap: "8px" }}>
                  <label
                    className="text-[#BFBFBF]"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "16px",
                      letterSpacing: "0%",
                    }}
                  >
                    Job type
                  </label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleInputChange}
                    required
                    className="bg-[#282828] border-0 rounded-lg outline-none appearance-none"
                    style={{
                      width: "100%",
                      height: "44px",
                      paddingTop: "12px",
                      paddingRight: "20px",
                      paddingBottom: "12px",
                      paddingLeft: "20px",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontFamily: "Inter",
                      fontWeight: 400,
                      color: formData.jobType ? "#FFFFFF" : "#BFBFBF",
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23BFBFBF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: "right 20px center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "16px",
                    }}
                  >
                    <option value="" style={{ color: "#BFBFBF" }}>
                      Select job type
                    </option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div className="flex flex-col flex-1" style={{ gap: "8px" }}>
                  <label
                    className="text-[#BFBFBF]"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "16px",
                      letterSpacing: "0%",
                    }}
                  >
                    Application deadline
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="applicationDeadline"
                      value={formData.applicationDeadline}
                      onChange={handleInputChange}
                      required
                      className="bg-[#282828] border-0 rounded-lg outline-none w-full cursor-pointer"
                      style={{
                        height: "44px",
                        paddingTop: "12px",
                        paddingRight: "48px",
                        paddingBottom: "12px",
                        paddingLeft: "52px",
                        fontSize: "14px",
                        lineHeight: "20px",
                        fontFamily: "Inter",
                        fontWeight: 400,
                        colorScheme: "dark",
                        color: formData.applicationDeadline
                          ? "#FFFFFF"
                          : "transparent",
                      }}
                    />
                    <Image
                      src="/images/careers/calendar-01.svg"
                      alt="Calendar"
                      width={16}
                      height={16}
                      className="absolute left-5 top-1/2 transform -translate-y-1/2 pointer-events-none z-10"
                    />
                    <div
                      className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none z-10"
                      style={{
                        width: "16px",
                        height: "16px",
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23BFBFBF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                    />
                    {!formData.applicationDeadline && (
                      <div
                        className="absolute left-12 top-1/2 transform -translate-y-1/2 pointer-events-none z-20 bg-[#282828]"
                        style={{
                          fontSize: "14px",
                          lineHeight: "20px",
                          fontFamily: "Inter",
                          fontWeight: 400,
                          color: "#BFBFBF",
                          paddingRight: "10px",
                        }}
                      >
                        Select application deadline
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description - Takes remaining height */}
            <div className="flex flex-col flex-1 mt-5" style={{ gap: "8px" }}>
              <label
                className="text-[#BFBFBF]"
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "16px",
                  letterSpacing: "0%",
                }}
              >
                Job description
              </label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleInputChange}
                required
                className="bg-[#282828] text-white w-full border-0 rounded-lg outline-none resize-none flex-1"
                style={{
                  paddingTop: "12px",
                  paddingRight: "20px",
                  paddingBottom: "12px",
                  paddingLeft: "20px",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontFamily: "Inter",
                  fontWeight: 400,
                }}
                placeholder="In recent years, boxing workouts have become increasingly popular among people who are looking for an effective way to get in shape."
              />
            </div>

            {/* Submit Button - Bottom Right */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                className="bg-[#00DBDC] text-[#0D0D0D] rounded hover:bg-[#00C5C8] transition-colors duration-200"
                style={{
                  width: "135px",
                  height: "36px",
                  paddingTop: "8px",
                  paddingRight: "16px",
                  paddingBottom: "8px",
                  paddingLeft: "16px",
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "20px",
                  letterSpacing: "0%",
                }}
              >
                Create job post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJobPostModal;
