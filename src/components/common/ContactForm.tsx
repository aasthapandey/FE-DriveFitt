"use client";
import { ContactFormProps } from "@/types/staticPages";
import { useState } from "react";

const ContactForm = ({
  data,
  isMobile,
}: {
  data: ContactFormProps;
  isMobile?: boolean;
}) => {
  const { title, description, submitButtonText, fields } = data;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    phone: "",
  });

  const validateFirstName = (value: string) => {
    if (value.length < 2) {
      return "First name missing";
    }
    if (!/^[A-Za-z\s]+$/.test(value)) {
      return "First name can only contain letters and spaces";
    }
    return "";
  };

  const validatePhone = (value: string) => {
    if (!/^\d{10}$/.test(value)) {
      return "Phone number must be exactly 10 digits";
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
    if (name === "firstName") {
      setErrors((prev) => ({
        ...prev,
        firstName: validateFirstName(value),
      }));
    } else if (name === "phone") {
      setErrors((prev) => ({
        ...prev,
        phone: validatePhone(value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const firstNameError = validateFirstName(formData.firstName);
    const phoneError = validatePhone(formData.phone);

    setErrors({
      firstName: firstNameError,
      phone: phoneError,
    });

    if (firstNameError || phoneError) {
      return;
    }

    try {
      // Here you would typically send the form data to your backend
      console.log("Form submitted:", formData);
      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
      setErrors({
        firstName: "",
        phone: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
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
            {title}
          </h2>
          <p className="text-xs leading-4 tracking-[-1%] md:text-base md:leading-5 text-[#8A8A8A] mb-7 md:mb-10">
            {description}
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 md:gap-6 flex-1"
          >
            <div className="grid grid-row-2 gap-4 md:grid-cols-2 md:gap-6">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="firstName"
                  className="text-xs md:text-sm text-[#8A8A8A]"
                >
                  {fields.firstName.label}
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={fields.firstName.placeholder}
                  className={`bg-[#FFFFFF] border rounded-lg py-1.5 md:py-2 px-4 text-[#0D0D0D] placeholder:text-[#8A8A8A] focus:border-[2px] focus:border-[#00DBDC] outline-none transition-colors ${
                    errors.firstName ? "border-red-500" : "border-[#333333]"
                  }`}
                />
                {errors.firstName && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.firstName}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="lastName"
                  className="text-xs md:text-sm text-[#8A8A8A]"
                >
                  {fields.lastName.label}
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder={fields.lastName.placeholder}
                  className="bg-[#FFFFFF] border border-[#333333] rounded-lg py-1.5 md:py-2 px-4 text-[#0D0D0D] placeholder:text-[#8A8A8A] focus:border-[#00DBDC] outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-row-2 gap-4 md:grid-cols-2 md:gap-6">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-xs md:text-sm text-[#8A8A8A]"
                >
                  {fields.email.label}
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={fields.email.placeholder}
                  className="bg-[#FFFFFF] border border-[#333333] rounded-lg py-1.5 md:py-2 px-4 text-[#0D0D0D] placeholder:text-[#8A8A8A] focus:border-[#00DBDC] outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="phone"
                  className="text-xs md:text-sm text-[#8A8A8A]"
                >
                  {fields.phone.label}
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={fields.phone.placeholder}
                  className={`bg-[#FFFFFF] border rounded-lg py-1.5 md:py-2 px-4 text-[#0D0D0D] placeholder:text-[#8A8A8A] focus:border-[#00DBDC] outline-none transition-colors ${
                    errors.phone ? "border-red-500" : "border-[#333333]"
                  }`}
                />
                {errors.phone && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 flex-1">
              <label htmlFor="message" className="text-sm text-[#8A8A8A]">
                {fields.message.label}
              </label>
              <input
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={fields.message.placeholder}
                className="bg-[#FFFFFF] border border-[#333333] rounded-lg py-1.5 md:py-2 px-4 text-[#0D0D0D] placeholder:text-[#8A8A8A] focus:border-[#00DBDC] outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className={`w-full bg-[#00DBDC] border border-transparent text-black text-sm font-medium py-[10px] tracking-[-2%] md:tracking-[-6%] rounded-lg ${
                isMobile
                  ? ""
                  : "hover:bg-transparent hover:border-[#00DBDC] hover:text-[#00DBDC]"
              } transition-all duration-200`}
            >
              {submitButtonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
