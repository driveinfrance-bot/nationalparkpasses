export type AddressField = {
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  validation?: (value: string) => string | null;
  type?: "text" | "number";
};

export type AddressFormat = {
  fields: AddressField[];
  postalCodePattern?: RegExp;
};

const ukPostalCodePattern = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i;
const fiveDigitPattern = /^\d{5}$/;
const netherlandsPostalCodePattern = /^\d{4}\s?[A-Z]{2}$/i;
const belgiumPostalCodePattern = /^\d{4}$/;

const validatePostalCode = (pattern: RegExp, value: string): string | null => {
  if (!value.trim()) return null; // Let required validation handle empty
  return pattern.test(value) ? null : "Invalid postal code format";
};

export const addressFormats: Record<string, AddressFormat> = {
  "United Kingdom": {
    fields: [
      {
        name: "name",
        label: "Name",
        placeholder: "Full name",
        required: true,
      },
      {
        name: "street",
        label: "Street Address",
        placeholder: "Street address",
        required: true,
      },
      {
        name: "locality",
        label: "Locality",
        placeholder: "Locality",
        required: true,
      },
      {
        name: "postTown",
        label: "Post Town",
        placeholder: "Post town",
        required: true,
      },
      {
        name: "county",
        label: "County (optional)",
        placeholder: "County",
        required: false,
      },
      {
        name: "postalCode",
        label: "Postcode",
        placeholder: "e.g. SW1A 1AA",
        required: true,
        validation: (value) => validatePostalCode(ukPostalCodePattern, value),
      },
    ],
    postalCodePattern: ukPostalCodePattern,
  },
  Germany: {
    fields: [
      {
        name: "name",
        label: "Name",
        placeholder: "Full name",
        required: true,
      },
      {
        name: "street",
        label: "Street",
        placeholder: "Street name",
        required: true,
      },
      {
        name: "houseNumber",
        label: "House Number",
        placeholder: "House number",
        required: true,
      },
      {
        name: "postalCode",
        label: "Postal Code",
        placeholder: "12345",
        required: true,
        validation: (value) => validatePostalCode(fiveDigitPattern, value),
      },
      {
        name: "city",
        label: "City",
        placeholder: "City",
        required: true,
      },
    ],
    postalCodePattern: fiveDigitPattern,
  },
  Italy: {
    fields: [
      {
        name: "name",
        label: "Name",
        placeholder: "Full name",
        required: true,
      },
      {
        name: "street",
        label: "Street",
        placeholder: "Street name",
        required: true,
      },
      {
        name: "houseNumber",
        label: "House Number",
        placeholder: "House number",
        required: true,
      },
      {
        name: "postalCode",
        label: "Postal Code",
        placeholder: "12345",
        required: true,
        validation: (value) => validatePostalCode(fiveDigitPattern, value),
      },
      {
        name: "city",
        label: "City",
        placeholder: "City",
        required: true,
      },
    ],
    postalCodePattern: fiveDigitPattern,
  },
  Spain: {
    fields: [
      {
        name: "name",
        label: "Name",
        placeholder: "Full name",
        required: true,
      },
      {
        name: "street",
        label: "Street",
        placeholder: "Street name",
        required: true,
      },
      {
        name: "houseNumber",
        label: "House Number",
        placeholder: "House number",
        required: true,
      },
      {
        name: "postalCode",
        label: "Postal Code",
        placeholder: "12345",
        required: true,
        validation: (value) => validatePostalCode(fiveDigitPattern, value),
      },
      {
        name: "city",
        label: "City",
        placeholder: "City",
        required: true,
      },
    ],
    postalCodePattern: fiveDigitPattern,
  },
  Netherlands: {
    fields: [
      {
        name: "name",
        label: "Name",
        placeholder: "Full name",
        required: true,
      },
      {
        name: "street",
        label: "Street",
        placeholder: "Street name",
        required: true,
      },
      {
        name: "houseNumber",
        label: "House Number",
        placeholder: "House number",
        required: true,
      },
      {
        name: "postalCode",
        label: "Postal Code",
        placeholder: "1012 WX",
        required: true,
        validation: (value) =>
          validatePostalCode(netherlandsPostalCodePattern, value),
      },
      {
        name: "city",
        label: "City",
        placeholder: "City",
        required: true,
      },
    ],
    postalCodePattern: netherlandsPostalCodePattern,
  },
  Belgium: {
    fields: [
      {
        name: "name",
        label: "Name",
        placeholder: "Full name",
        required: true,
      },
      {
        name: "street",
        label: "Street",
        placeholder: "Street name",
        required: true,
      },
      {
        name: "houseNumber",
        label: "House Number",
        placeholder: "House number",
        required: true,
      },
      {
        name: "postalCode",
        label: "Postal Code",
        placeholder: "1234",
        required: true,
        validation: (value) => validatePostalCode(belgiumPostalCodePattern, value),
      },
      {
        name: "city",
        label: "City",
        placeholder: "City",
        required: true,
      },
    ],
    postalCodePattern: belgiumPostalCodePattern,
  },
};

export const getAddressFormat = (country: string): AddressFormat => {
  return (
    addressFormats[country] || {
      fields: [
        {
          name: "name",
          label: "Name",
          placeholder: "Full name",
          required: true,
        },
        {
          name: "street",
          label: "Street Address",
          placeholder: "Street address",
          required: true,
        },
        {
          name: "city",
          label: "City",
          placeholder: "City",
          required: true,
        },
        {
          name: "postalCode",
          label: "Postal Code",
          placeholder: "Postal code",
          required: true,
        },
        {
          name: "country",
          label: "Country",
          placeholder: "Country",
          required: true,
        },
      ],
    }
  );
};

export type AddressInfo = {
  name: string;
  street?: string;
  houseNumber?: string;
  locality?: string;
  postTown?: string;
  county?: string;
  city?: string;
  postalCode?: string;
  country?: string;
};

