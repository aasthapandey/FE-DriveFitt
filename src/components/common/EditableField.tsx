"use client";

import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { FieldValidation } from "@/types/auth";

interface EditableFieldProps {
  field: "name" | "email" | "dateOfBirth";
  label: string;
  value: string;
  isEditing: boolean;
  error: string;
  isMobile?: boolean;
  onStartEdit: () => void;
  onSave: (value: string) => void;
  onCancel: () => void;
  onValidate?: (value: string) => FieldValidation;
}

const EditableField = ({
  field,
  label,
  value,
  isEditing,
  error,
  isMobile = false,
  onStartEdit,
  onSave,
  onCancel,
  onValidate,
}: EditableFieldProps) => {
  const [localValue, setLocalValue] = useState(value);
  const [validation, setValidation] = useState<FieldValidation>({
    isValid: true,
    message: "",
  });

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    // Real-time validation
    if (onValidate) {
      const validationResult = onValidate(newValue);
      setValidation(validationResult);
    }
  };

  const handleSave = () => {
    if (validation.isValid && localValue.trim() !== value.trim()) {
      // Save asynchronously in background
      onSave(localValue.trim());
      // Immediately exit edit mode and show updated value
      onCancel();
    } else if (localValue.trim() === value.trim()) {
      onCancel(); // No changes, just cancel
    }
  };

  const handleCancel = () => {
    setLocalValue(value);
    setValidation({ isValid: true, message: "" });
    onCancel();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  const getInputType = () => {
    switch (field) {
      case "email":
        return "email";
      case "dateOfBirth":
        return "date";
      default:
        return "text";
    }
  };

  const renderActionButton = (
    text: string,
    onClick: () => void,
    disabled = false
  ) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`font-normal transition-colors duration-200 self-start disabled:opacity-50 ${
          isMobile ? "text-xs leading-5" : "text-sm leading-5"
        } ${
          disabled
            ? "text-[#8A8A8A] cursor-not-allowed"
            : "text-[#00DBDC] hover:text-[#00DBDC]/80"
        }`}
      >
        {text}
      </button>
    );
  };

  if (isEditing) {
    return (
      <div className="flex flex-col">
        <span
          className={`font-light mb-2 text-[#8A8A8A] ${
            isMobile ? "text-xs leading-4" : "text-base leading-5"
          }`}
        >
          {label}
        </span>
        <TextField
          type={getInputType()}
          value={localValue}
          onChange={handleValueChange}
          onKeyDown={handleKeyDown}
          error={!!(error || (!validation.isValid && validation.message))}
          helperText={error || (!validation.isValid ? validation.message : "")}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            sx: {
              fontSize: isMobile ? "20px" : "24px",
              lineHeight: "28px",
              fontWeight: 400,
              color: "white",
              opacity: 0.8, // 20% opacity reduction
              "& input": {
                padding: 0,
                margin: 0,
                background: "transparent",
                border: "none",
                outline: "none",
              },
            },
          }}
          sx={{
            "& .MuiFormHelperText-root": {
              color: "#ef4444",
              fontSize: "12px",
              marginTop: "4px",
            },
          }}
        />
        <div className="mt-2">
          {renderActionButton(
            "Save",
            handleSave,
            localValue.trim() === value.trim() || !validation.isValid
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <span
        className={`font-light mb-2 text-[#8A8A8A] ${
          isMobile ? "text-xs leading-4" : "text-base leading-5"
        }`}
      >
        {label}
      </span>
      <span
        className={`font-normal mb-5 text-white ${
          isMobile ? "text-xl leading-7" : "text-2xl leading-7"
        }`}
      >
        {value}
      </span>
      {renderActionButton("Change", onStartEdit)}
    </div>
  );
};

export default EditableField;
