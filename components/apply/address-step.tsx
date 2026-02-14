"use client";

import { useState, useEffect } from "react";
import { getAddressFormat, type AddressInfo } from "@/lib/address-formats";

type AddressStepProps = {
  country: string;
  initialAddress?: AddressInfo;
  onContinue: (address: AddressInfo) => void;
  onBack: () => void;
  error?: string | null;
};

export default function AddressStep({
  country,
  initialAddress,
  onContinue,
  onBack,
  error: externalError,
}: AddressStepProps) {
  const format = getAddressFormat(country);
  const [address, setAddress] = useState<AddressInfo>(
    initialAddress || { name: "" }
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(externalError || null);

  // Sync external error prop
  useEffect(() => {
    if (externalError) {
      setError(externalError);
    }
  }, [externalError]);

  const updateField = (name: string, value: string) => {
    setAddress((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    setError(null);
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    for (const field of format.fields) {
      const value = address[field.name as keyof AddressInfo] as string | undefined;
      const fieldValue = value || "";

      if (field.required && !fieldValue.trim()) {
        errors[field.name] = `${field.label} is required`;
      } else if (field.validation && fieldValue.trim()) {
        const validationError = field.validation(fieldValue);
        if (validationError) {
          errors[field.name] = validationError;
        }
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) {
      setError("Please fix the errors below");
      return;
    }
    onContinue(address);
  };

  const getFieldValue = (name: string): string => {
    return (address[name as keyof AddressInfo] as string | undefined) || "";
  };

  const getFieldError = (name: string): string | undefined => {
    return fieldErrors[name];
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        {format.fields.map((field) => {
          const value = getFieldValue(field.name);
          const fieldError = getFieldError(field.name);
          const hasError = !!fieldError;

          return (
            <div key={field.name}>
              <label className="text-sm font-semibold text-slate-800">
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
              </label>
              <input
                className={`input mt-1 ${hasError ? "border-red-500" : ""}`}
                value={value}
                onChange={(e) => updateField(field.name, e.target.value)}
                placeholder={field.placeholder}
                type={field.type || "text"}
              />
              {fieldError && (
                <p className="mt-1 text-xs text-red-600">{fieldError}</p>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-3">
        <button
          className="button"
          type="button"
          onClick={handleContinue}
        >
          Next: Contact & review
        </button>
        <button
          className="rounded-full border border-slate-300 px-4 py-3 font-semibold text-slate-800"
          type="button"
          onClick={onBack}
        >
          Back
        </button>
      </div>
      {(error || externalError) && (
        <p className="text-sm text-red-600">{error || externalError}</p>
      )}
    </div>
  );
}

