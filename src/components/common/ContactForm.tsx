import { ContactFormProps } from "@/types/staticPages";
import { useState } from "react";

const ContactForm = ({ data }: { data: ContactFormProps }) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    message,
    submitButtonText,
    title,
  } = data;
  return <div>Contact Form</div>;
};

export default ContactForm;
