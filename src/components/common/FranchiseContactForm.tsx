"use client";
import { useState } from "react";

interface FranchiseContactFormProps {
  isMobile?: boolean;
}

const FranchiseContactForm = ({ isMobile }: FranchiseContactFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    proposedCity: "",
    additionalMessage: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    proposedCity: "",
  });

  const validateFullName = (value: string) => {
    if (value.length < 2) {
      return "Full name is required";
    }
    if (!/^[A-Za-z\s]+$/.test(value)) {
      return "Full name can only contain letters and spaces";
    }
    return "";
  };

  const validatePhone = (value: string) => {
    if (!/^\d{10}$/.test(value)) {
      return "Phone number must be exactly 10 digits";
    }
    return "";
  };

  const validateEmail = (value: string) => {
    if (!value) {
      return "Email address is required";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validateCity = (value: string) => {
    if (!value.trim()) {
      return "City is required";
    }
    if (!/^[A-Za-z\s]+$/.test(value)) {
      return "City can only contain letters and spaces";
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate on change
    if (name === "fullName") {
      setErrors((prev) => ({
        ...prev,
        fullName: validateFullName(value),
      }));
    } else if (name === "phoneNumber") {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: validatePhone(value),
      }));
    } else if (name === "emailAddress") {
      setErrors((prev) => ({
        ...prev,
        emailAddress: validateEmail(value),
      }));
    } else if (name === "proposedCity") {
      setErrors((prev) => ({
        ...prev,
        proposedCity: validateCity(value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const fullNameError = validateFullName(formData.fullName);
    const phoneError = validatePhone(formData.phoneNumber);
    const emailError = validateEmail(formData.emailAddress);
    const cityError = validateCity(formData.proposedCity);

    setErrors({
      fullName: fullNameError,
      phoneNumber: phoneError,
      emailAddress: emailError,
      proposedCity: cityError,
    });

    if (fullNameError || phoneError || emailError || cityError) {
      return;
    }

    try {
      console.log("Franchise form submitted:", formData);
      // Reset form after successful submission
      setFormData({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        proposedCity: "",
        additionalMessage: "",
      });
      setErrors({
        fullName: "",
        phoneNumber: "",
        emailAddress: "",
        proposedCity: "",
      });
    } catch (error) {
      console.error("Error submitting franchise form:", error);
    }
  };

  return (
    <div className="flex-1">
      <div
        className="rounded-[20px] md:rounded-[40px] p-[2px] h-full"
        style={{
          background:
            "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
        }}
      >
        <div className="rounded-[20px] md:rounded-[40px] w-full h-full p-8 md:p-12 flex flex-col bg-[#0D0D0D]">
          <h2 className="text-2xl leading-7 md:text-[40px] font-semibold md:leading-[48px] tracking-[-1px] md:tracking-[-2px] mb-2">
            Ready to Get Started?
          </h2>
          <p className="text-xs leading-4 tracking-[-1%] md:text-base md:leading-5 text-[#8A8A8A] mb-7 md:mb-10">
            Fill Out The Form Below And We&apos;ll Contact You Within 24 Hours
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 md:gap-6 flex-1"
          >
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="grid grid-row-2 gap-4 md:grid-cols-2 md:gap-6">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="fullName"
                    className="text-xs md:text-sm text-[#8A8A8A]"
                  >
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter Your Name"
                    className={`bg-[#FFFFFF] border rounded-lg py-1.5 md:py-2 px-4 text-[#0D0D0D] placeholder:text-[#8A8A8A] focus:border-[2px] focus:border-[#00DBDC] outline-none transition-colors ${
                      errors.fullName ? "border-red-500" : "border-[#333333]"
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-xs text-red-500 mt-1">
                      {errors.fullName}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="emailAddress"
                    className="text-xs md:text-sm text-[#8A8A8A]"
                  >
                    Email Address *
                  </label>
                  <input
                    id="emailAddress"
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    placeholder="Enter Your Email Address"
                    className={`bg-[#FFFFFF] border rounded-lg py-1.5 md:py-2 px-4 text-[#0D0D0D] placeholder:text-[#8A8A8A] focus:border-[2px] focus:border-[#00DBDC] outline-none transition-colors ${
                      errors.emailAddress
                        ? "border-red-500"
                        : "border-[#333333]"
                    }`}
                  />
                  {errors.emailAddress && (
                    <span className="text-xs text-red-500 mt-1">
                      {errors.emailAddress}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-row-2 gap-4 md:grid-cols-2 md:gap-6">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="phoneNumber"
                    className="text-xs md:text-sm text-[#8A8A8A]"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter phone Number"
                    className={`bg-[#FFFFFF] border rounded-lg py-1.5 md:py-2 px-4 text-[#0D0D0D] placeholder:text-[#8A8A8A] focus:border-[2px] focus:border-[#00DBDC] outline-none transition-colors ${
                      errors.phoneNumber ? "border-red-500" : "border-[#333333]"
                    }`}
                  />
                  {errors.phoneNumber && (
                    <span className="text-xs text-red-500 mt-1">
                      {errors.phoneNumber}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="proposedCity"
                    className="text-xs md:text-sm text-[#8A8A8A]"
                  >
                    City *
                  </label>
                  <input
                    id="proposedCity"
                    type="text"
                    name="proposedCity"
                    value={formData.proposedCity}
                    onChange={handleChange}
                    placeholder="Enter Your City"
                    className={`bg-[#FFFFFF] border rounded-lg py-1.5 md:py-2 px-4 text-[#0D0D0D] placeholder:text-[#8A8A8A] focus:border-[2px] focus:border-[#00DBDC] outline-none transition-colors ${
                      errors.proposedCity
                        ? "border-red-500"
                        : "border-[#333333]"
                    }`}
                  />
                  {errors.proposedCity && (
                    <span className="text-xs text-red-500 mt-1">
                      {errors.proposedCity}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="additionalMessage"
                  className="text-sm text-[#8A8A8A]"
                >
                  Additional Message (Optional)
                </label>
                <textarea
                  id="additionalMessage"
                  name="additionalMessage"
                  value={formData.additionalMessage}
                  onChange={handleChange}
                  placeholder="Tell Us About Your Background, Experience, Or Any Questions You Have"
                  rows={4}
                  className="bg-[#FFFFFF] border border-[#333333] rounded-lg py-1.5 md:py-2 px-4 text-[#0D0D0D] placeholder:text-[#8A8A8A] focus:border-[#00DBDC] outline-none transition-colors resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full bg-[#00DBDC] border border-transparent text-black text-sm font-medium py-[10px] tracking-[-2%] md:tracking-[-6%] rounded-lg mt-auto ${
                isMobile
                  ? ""
                  : "hover:bg-transparent hover:border-[#00DBDC] hover:text-[#00DBDC]"
              } transition-all duration-200`}
            >
              Submit Your Interest
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FranchiseContactForm;
