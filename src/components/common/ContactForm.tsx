"use client";
import { ContactFormProps } from "@/types/staticPages";
import { useState } from "react";

const ContactForm = ({ data }: { data: ContactFormProps }) => {
  const { title, description, submitButtonText } = data;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex-1">
      <div
        className="rounded-[40px] p-[2px] h-full"
        style={{
          background:
            "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
        }}
      >
        <div
          className="rounded-[40px] w-full h-full p-12 flex flex-col"
          style={{
            background: "linear-gradient(180deg, #1E1E1E 0%, #141414 100%)",
          }}
        >
          <h2 className="text-[40px] font-semibold leading-[48px] tracking-[-0.02em] mb-2">
            {title}
          </h2>
          <p className="text-base text-[#8A8A8A] mb-8">{description}</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="text-sm text-[#8A8A8A]">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="bg-[#E7E7E7] border border-[#333333] rounded-lg p-3 text-[#0D0D0D] placeholder:text-[#8A8A8A] focus:border-[#00DBDC] outline-none transition-colors"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lastName" className="text-sm text-[#8A8A8A]">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="bg-[#E7E7E7] border border-[#333333] rounded-lg p-3 text-[#0D0D0D] placeholder:text-[#8A8A8A] focus:border-[#00DBDC] outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm text-[#8A8A8A]">
                  Email ID
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-[#E7E7E7] border border-[#333333] rounded-lg p-3 text-[#0D0D0D] placeholder:text-[#8A8A8A] focus:border-[#00DBDC] outline-none transition-colors"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm text-[#8A8A8A]">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-[#E7E7E7] border border-[#333333] rounded-lg p-3 text-[#0D0D0D] placeholder:text-[#8A8A8A] focus:border-[#00DBDC] outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="message" className="text-sm text-[#8A8A8A]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="bg-[#E7E7E7] border border-[#333333] rounded-lg p-3 text-[#0D0D0D] placeholder:text-[#8A8A8A] focus:border-[#00DBDC] outline-none transition-colors flex-1 min-h-[120px] resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#00DBDC] text-black font-medium py-4 rounded-lg hover:bg-[#00c5c6] transition-colors"
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
