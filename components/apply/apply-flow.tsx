"use client";

import { useMemo, useState } from "react";
import PaymentStep from "./payment-step";
import AddressStep from "./address-step";
import { type AddressInfo } from "@/lib/address-formats";

type VehicleInfo = {
  registration: string;
  country: string;
  vehicleType: string;
  fuelType: string;
  firstRegistrationDate: string;
};

type ContactInfo = {
  email: string;
  name?: string;
};

type UploadInfo = { url: string; name: string } | null;

const steps = ["Vehicle & upload", "Address", "Contact & review", "Payment"];

const preferredCountries = [
  "United Kingdom",
  "Germany",
  "Belgium",
  "Netherlands",
  "Italy",
];

const allCountries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const countryOptions = [
  ...preferredCountries,
  ...allCountries
    .filter((c) => !preferredCountries.includes(c))
    .sort((a, b) => a.localeCompare(b)),
];

export default function ApplyFlow() {
  const [step, setStep] = useState(0);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [vehicle, setVehicle] = useState<VehicleInfo>({
    registration: "",
    country: "",
    vehicleType: "",
    fuelType: "",
    firstRegistrationDate: "",
  });
  const [upload, setUpload] = useState<UploadInfo>(null);
  const [address, setAddress] = useState<AddressInfo>({ name: "" });
  const [contact, setContact] = useState<ContactInfo>({ email: "" });
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const progress = useMemo(
    () => Math.round(((step + 1) / steps.length) * 100),
    [step]
  );

  const ensureOrder = async () => {
    if (orderId) return orderId;
    setLoading(true);
    setError(null);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vehicleRegistration: vehicle.registration,
        country: vehicle.country,
        vehicleType: vehicle.vehicleType,
        fuelType: vehicle.fuelType,
        firstRegistrationDate: vehicle.firstRegistrationDate,
        priceCents: 2950,
        currency: "EUR",
      }),
    });
    if (!res.ok) {
      setError("Could not create order. Check your inputs.");
      setLoading(false);
      return null;
    }
    const json = await res.json();
    setOrderId(json.id);
    setLoading(false);
    return json.id as string;
  };

  const handleUpload = async (file: File) => {
    const currentOrderId = orderId || (await ensureOrder());
    if (!currentOrderId) return;
    setLoading(true);
    setError(null);
    const data = new FormData();
    data.append("file", file);
    data.append("orderId", currentOrderId);
    const res = await fetch("/api/upload", { method: "POST", body: data });
    if (!res.ok) {
      setError("Upload failed. Please try again.");
      setLoading(false);
      return;
    }
    const json = await res.json();
    setUpload({ url: json.url, name: json.name });
    setLoading(false);
  };

  const handleVehicleContinue = async () => {
    const currentOrderId = orderId || (await ensureOrder());
    if (!currentOrderId) return;
    if (!upload) {
      setError("Upload your registration document to continue.");
      return;
    }
    setStep(1);
    setError(null);
  };

  const handleAddressContinue = async (addressData: AddressInfo) => {
    setAddress(addressData);
    const currentOrderId = orderId || (await ensureOrder());
    if (!currentOrderId) return;
    setLoading(true);
    setError(null);
    const res = await fetch(`/api/orders/${currentOrderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        addressName: addressData.name,
        addressStreet: addressData.street,
        addressHouseNumber: addressData.houseNumber,
        addressLocality: addressData.locality,
        addressPostTown: addressData.postTown,
        addressCounty: addressData.county,
        addressCity: addressData.city,
        addressPostalCode: addressData.postalCode,
        addressCountry: addressData.country,
      }),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Address save error:", errorData);
      setError(
        errorData.error?.fieldErrors
          ? "Please check your address fields"
          : "Could not save address. Please try again."
      );
      setLoading(false);
      return;
    }
    setStep(2);
    setError(null);
    setLoading(false);
  };

  const handleContactAndReview = async () => {
    if (!contact.email) {
      setError("Please enter a valid email.");
      return;
    }
    if (!consent) {
      setError("Please acknowledge the consent to continue.");
      return;
    }
    const currentOrderId = orderId || (await ensureOrder());
    if (!currentOrderId) return;
    setLoading(true);
    setError(null);
    const res = await fetch(`/api/orders/${currentOrderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: contact.email,
        name: contact.name,
        consent: true,
      }),
    });
    if (!res.ok) {
      let errorData: any = {};
      const responseText = await res.text();
      console.error("Contact save error - Status:", res.status, "Response:", responseText);
      
      try {
        errorData = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse error response as JSON");
        errorData = { error: { message: responseText || `Server error (${res.status})` } };
      }
      
      if (errorData.error?.fieldErrors?.email) {
        const emailErrors = Array.isArray(errorData.error.fieldErrors.email) 
          ? errorData.error.fieldErrors.email 
          : [errorData.error.fieldErrors.email];
        setError(`Email error: ${emailErrors.join(", ")}`);
      } else if (errorData.error?.formErrors && errorData.error.formErrors.length > 0) {
        setError(errorData.error.formErrors.join(", "));
      } else if (errorData.error?.message) {
        setError(errorData.error.message);
      } else {
        setError(`Failed to save contact information. Please try again. (Status: ${res.status})`);
      }
      setLoading(false);
      return;
    }
    setStep(3);
    setLoading(false);
  };

  const onPaid = (pi: string) => {
    setError(null);
    setLoading(false);
    window.location.href = `/success?orderId=${orderId ?? ""}&pi=${pi}`;
  };

  function renderStep() {
    switch (step) {
      case 0:
        return (
          <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-slate-800">
                  Registration number
                </label>
                <input
                  className="input mt-1"
                  value={vehicle.registration}
                  onChange={(e) =>
                    setVehicle((v) => ({ ...v, registration: e.target.value }))
                  }
                  placeholder="e.g. AA-111-AA"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-800">
                  Country of registration
                </label>
                <select
                  className="input mt-1"
                  value={vehicle.country}
                  onChange={(e) =>
                    setVehicle((v) => ({ ...v, country: e.target.value }))
                  }
                >
                  <option value="">Select country</option>
                  {countryOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-800">
                  Vehicle type
                </label>
                <select
                  className="input mt-1"
                  value={vehicle.vehicleType}
                  onChange={(e) =>
                    setVehicle((v) => ({ ...v, vehicleType: e.target.value }))
                  }
                >
                  <option value="">Select vehicle category</option>
                  <option value="Passenger cars (Category M1)">
                    Passenger cars (Category M1)
                  </option>
                  <option value="Light commercial vehicles (Category N1)">
                    Light commercial vehicles (Category N1)
                  </option>
                  <option value="Motorcycles (Category L3e, L4e, L5e or L7e)">
                    Motorcycles (Category L3e, L4e, L5e or L7e)
                  </option>
                  <option value="Mopeds (Category L1e, L2e or L6e)">
                    Mopeds (Category L1e, L2e or L6e)
                  </option>
                  <option value="Buses and Coaches (Category M2 or M3)">
                    Buses and Coaches (Category M2 or M3)
                  </option>
                  <option value="Heavy goods vehicles (Category N2 or N3)">
                    Heavy goods vehicles (Category N2 or N3)
                  </option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-800">
                  Fuel type
                </label>
                <select
                  className="input mt-1"
                  value={vehicle.fuelType}
                  onChange={(e) =>
                    setVehicle((v) => ({ ...v, fuelType: e.target.value }))
                  }
                >
                  <option value="">Select fuel type</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Essence">Essence</option>
                  <option value="Biodiesel only PL">Biodiesel only PL</option>
                  <option value="Electric and hydrogen">
                    Electric and hydrogen
                  </option>
                  <option value="Gas">Gas</option>
                  <option value="Plug-in hybrids">Plug-in hybrids</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-800">
                  First registration date
                </label>
                <input
                  type="date"
                  className="input mt-1 bg-white"
                  value={vehicle.firstRegistrationDate}
                  onChange={(e) =>
                    setVehicle((v) => ({
                      ...v,
                      firstRegistrationDate: e.target.value,
                    }))
                  }
                  min="1900-01-01"
                  max={new Date().toISOString().split("T")[0]}
                  inputMode="numeric"
                  aria-label="Date of first registration"
                />
              </div>
            </div>
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
              <p className="font-semibold text-slate-900">
                Upload registration document
              </p>
              <p className="text-sm text-slate-600">
                Accepts PDF, JPG, PNG up to 10MB.
              </p>
              <div className="mt-4">
                <input
                  type="file"
                  id="file-upload"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(file);
                  }}
                />
                <label
                  htmlFor="file-upload"
                  className="button cursor-pointer inline-flex"
                >
                  Choose File
                </label>
              </div>
              {upload ? (
                <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-3 animate-in fade-in duration-300">
                  <p className="text-sm font-semibold text-green-800 flex items-center justify-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>File uploaded successfully!</span>
                  </p>
                  <p className="text-xs text-green-700 mt-1">{upload.name}</p>
                </div>
              ) : (
                <p className="mt-3 text-xs text-slate-500">
                  Upload after entering vehicle details.
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                className="button"
                type="button"
                onClick={handleVehicleContinue}
                disabled={loading}
              >
                {loading ? "Saving..." : "Next: Address"}
              </button>
            </div>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
          </div>
        );
      case 1:
        return (
          <AddressStep
            country={vehicle.country}
            initialAddress={address}
            onContinue={handleAddressContinue}
            onBack={() => setStep(0)}
            error={error}
          />
        );
      case 2:
        return (
          <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-slate-800">
                  Email (required)
                </label>
                <input
                  className="input mt-1"
                  value={contact.email}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, email: e.target.value }))
                  }
                  placeholder="you@example.com"
                  type="email"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-800">
                  Name (optional)
                </label>
                <input
                  className="input mt-1"
                  value={contact.name ?? ""}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, name: e.target.value }))
                  }
                  placeholder="Your name"
                />
              </div>
            </div>
            <div className="card p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Review details</p>
              <ul className="mt-2 space-y-1">
                <li>Registration: {vehicle.registration || "—"}</li>
                <li>Country: {vehicle.country || "—"}</li>
                <li>Vehicle: {vehicle.vehicleType || "—"}</li>
                <li>Fuel: {vehicle.fuelType || "—"}</li>
                <li>
                  First registration: {vehicle.firstRegistrationDate || "—"}
                </li>
                <li>Email: {contact.email || "—"}</li>
                <li>Upload: {upload?.name ?? "Pending"}</li>
                <li className="mt-2 pt-2 border-t border-slate-200">
                  <strong>Address:</strong>
                </li>
                <li>{address.name || "—"}</li>
                {address.street && (
                  <li>
                    {address.street}
                    {address.houseNumber ? ` ${address.houseNumber}` : ""}
                  </li>
                )}
                {address.locality && <li>{address.locality}</li>}
                {address.postTown && <li>{address.postTown}</li>}
                {address.county && <li>{address.county}</li>}
                {address.city && <li>{address.city}</li>}
                {address.postalCode && <li>{address.postalCode}</li>}
                {address.country && <li>{address.country}</li>}
              </ul>
            </div>
            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1"
              />
              <span>
                I understand this is a private processing service and authorize
                you to process my Crit'Air application. The price shown includes
                the official fee.
              </span>
            </label>
            <div className="flex items-center gap-3">
              <button
                className="button"
                type="button"
                onClick={handleContactAndReview}
                disabled={loading}
              >
                {loading ? "Saving..." : "Next: Payment"}
              </button>
              <button
                className="rounded-full border border-slate-300 px-4 py-3 font-semibold text-slate-800"
                type="button"
                onClick={() => setStep(1)}
              >
                Back
              </button>
            </div>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            {orderId ? (
              <PaymentStep orderId={orderId} onPaid={onPaid} />
            ) : (
              <p className="text-sm text-red-600">
                Missing order. Go back and re-enter details.
              </p>
            )}
            <button
              className="rounded-full border border-slate-300 px-4 py-3 font-semibold text-slate-800"
              type="button"
              onClick={() => setStep(2)}
            >
              Back
            </button>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="card p-6">
      <div className="mb-6">
        <p className="text-sm font-semibold text-slate-800">
          Step {step + 1} of {steps.length}
        </p>
        <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-lg font-semibold text-slate-900">
          {steps[step]}
        </p>
      </div>
      {renderStep()}
    </div>
  );
}

