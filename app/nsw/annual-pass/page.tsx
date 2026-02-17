"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NSW_ANNUAL_PASS_OPTIONS,
  NSW_SINGLE_PARK_OPTIONS,
  type NswPassDuration,
  type NswPassType,
} from "@/config/passes/nsw-annual-pass";

type Step = "DETAILS" | "REVIEW";

const VEHICLE_STATES = ["NSW", "QLD", "VIC", "WA", "SA", "TAS", "NT", "ACT"];
const VEHICLE_TYPES = ["Car", "Motorbike", "4WD", "Campervan", "Other"];

export default function NswAnnualPassPage() {
  const [step, setStep] = useState<Step>("DETAILS");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isSeniorsCardHolder, setIsSeniorsCardHolder] = useState(false);
  const [passType, setPassType] = useState<NswPassType | null>(null);
  const [duration, setDuration] = useState<NswPassDuration>("1_YEAR");
  const [singlePark, setSinglePark] = useState("");

  const [numberPlate, setNumberPlate] = useState("");
  const [confirmNumberPlate, setConfirmNumberPlate] = useState("");
  const [registrationState, setRegistrationState] = useState("NSW");
  const [vehicleType, setVehicleType] = useState("Car");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");

  const today = useMemo(() => new Date(), []);
  const endDate = useMemo(() => {
    const d = new Date(today);
    d.setFullYear(d.getFullYear() + (duration === "2_YEARS" ? 2 : 1));
    return d;
  }, [today, duration]);

  const selectedOption = NSW_ANNUAL_PASS_OPTIONS.find((option) => option.type === passType);
  const officialFeeAud = selectedOption ? selectedOption.prices[duration] : 0;
  const serviceFeeAud = 25;
  const totalAud = officialFeeAud + serviceFeeAud;

  const isValid =
    !!passType &&
    (!passType || passType !== "SINGLE_PARK_PASS" || !!singlePark) &&
    numberPlate.trim().length >= 2 &&
    confirmNumberPlate.trim() === numberPlate.trim() &&
    firstName.trim().length >= 1 &&
    lastName.trim().length >= 1 &&
    email.trim().length >= 3 &&
    confirmEmail.trim() === email.trim() &&
    phone.trim().length >= 6;

  async function onCheckout() {
    if (!selectedOption) return;
    setLoading(true);
    setError(null);
    try {
      const bookingPayload = {
        product: "NSW_ANNUAL_PASS",
        passType,
        passLabel: selectedOption.label,
        duration,
        singlePark: passType === "SINGLE_PARK_PASS" ? singlePark : null,
        eligibility: { isSeniorsCardHolder },
        dates: {
          startDate: today.toISOString(),
          endDate: endDate.toISOString(),
        },
        vehicle: {
          numberPlate,
          registrationState,
          vehicleType,
        },
        customer: {
          firstName,
          lastName,
          email,
          phone,
          postcode: postcode || null,
        },
        fees: {
          officialFeeAud,
          serviceFeeAud,
          totalAud,
        },
      };

      const createResponse = await fetch("/api/nsw/annual-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });
      if (!createResponse.ok) {
        throw new Error("Unable to create booking");
      }
      const { orderId } = await createResponse.json();

      const checkoutResponse = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const checkoutJson = await checkoutResponse.json();
      if (!checkoutResponse.ok || !checkoutJson.url) {
        throw new Error(checkoutJson.error || "Unable to start checkout");
      }

      window.location.href = checkoutJson.url;
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="section bg-slate-50">
      <div className="container max-w-[640px] space-y-6">
        <h1 className="text-3xl font-semibold">
          Buy an annual pass to visit all NSW national parks.
        </h1>

        <Card>
          <CardContent className="space-y-4">
            <p className="text-sm font-semibold">Eligibility</p>
            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={isSeniorsCardHolder}
                onChange={(event) => setIsSeniorsCardHolder(event.target.checked)}
                className="mt-1 h-4 w-4"
              />
              I&apos;m an Australian Seniors Card holder.
            </label>
            <Link className="text-sm font-medium text-[#1F3A2E] underline" href="/nsw/concession-info">
              Apply for Concession Pass
            </Link>
          </CardContent>
        </Card>

        {step === "DETAILS" ? (
          <Card>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-semibold">Select annual pass type</p>
                {NSW_ANNUAL_PASS_OPTIONS.map((option) => (
                  <div key={option.type} className="rounded-lg border border-slate-200 p-3">
                    <button
                      type="button"
                      className="w-full text-left"
                      onClick={() => setPassType(option.type)}
                    >
                      <p className="font-semibold text-slate-900">{option.label}</p>
                      <p className="text-sm text-slate-600">{option.description}</p>
                    </button>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(["1_YEAR", "2_YEARS"] as NswPassDuration[]).map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => {
                            setPassType(option.type);
                            setDuration(d);
                          }}
                          className={`rounded-lg border px-3 py-2 text-sm ${
                            passType === option.type && duration === d
                              ? "border-[#1F3A2E] bg-[#1F3A2E] text-white"
                              : "border-slate-300 bg-white text-slate-700"
                          }`}
                        >
                          {d === "1_YEAR" ? "1 year" : "2 years"} · ${option.prices[d]}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {passType === "SINGLE_PARK_PASS" ? (
                <div className="space-y-2">
                  <Label htmlFor="singlePark">Select a single park</Label>
                  <select
                    id="singlePark"
                    className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3"
                    value={singlePark}
                    onChange={(event) => setSinglePark(event.target.value)}
                  >
                    <option value="">Select a park</option>
                    {NSW_SINGLE_PARK_OPTIONS.map((park) => (
                      <option key={park} value={park}>
                        {park}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              <div className="space-y-2 rounded-lg border border-slate-200 p-3 text-sm">
                <p>
                  Start date: <span className="font-medium">{today.toLocaleDateString()}</span>
                </p>
                <p>
                  End date: <span className="font-medium">{endDate.toLocaleDateString()}</span>
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold">Vehicle details</p>
                <div className="space-y-2">
                  <Label htmlFor="numberPlate">Vehicle number plate</Label>
                  <Input id="numberPlate" value={numberPlate} onChange={(e) => setNumberPlate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmNumberPlate">Confirm vehicle number plate</Label>
                  <Input
                    id="confirmNumberPlate"
                    value={confirmNumberPlate}
                    onChange={(e) => setConfirmNumberPlate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationState">Vehicle state of registration</Label>
                  <select
                    id="registrationState"
                    className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3"
                    value={registrationState}
                    onChange={(e) => setRegistrationState(e.target.value)}
                  >
                    {VEHICLE_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Vehicle type</Label>
                  <select
                    id="vehicleType"
                    className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  >
                    {VEHICLE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold">Personal details</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmEmail">Confirm email</Label>
                  <Input
                    id="confirmEmail"
                    type="email"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone/mobile</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postcode">Postcode (optional)</Label>
                  <Input id="postcode" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
                </div>
              </div>

              <Button type="button" className="w-full sm:w-auto" disabled={!isValid} onClick={() => setStep("REVIEW")}>
                Review booking
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="space-y-4">
              <h2 className="text-2xl font-semibold">Review your booking</h2>
              <p className="text-sm text-slate-700">
                We submit on your behalf. Processed within 12 hours. Private service, not affiliated with government.
              </p>
              <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4 text-sm">
                <p>
                  <span className="font-semibold">Pass:</span> {selectedOption?.label}
                </p>
                <p>
                  <span className="font-semibold">Duration:</span> {duration === "1_YEAR" ? "1 year" : "2 years"}
                </p>
                {passType === "SINGLE_PARK_PASS" ? (
                  <p>
                    <span className="font-semibold">Single park:</span> {singlePark}
                  </p>
                ) : null}
                <p>
                  <span className="font-semibold">Vehicle:</span> {numberPlate} ({registrationState}, {vehicleType})
                </p>
                <p>
                  <span className="font-semibold">Applicant:</span> {firstName} {lastName}
                </p>
                <p>
                  <span className="font-semibold">Total:</span> ${totalAud} AUD
                </p>
              </div>

              {error ? <p className="text-sm text-red-700">{error}</p> : null}

              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="outline" onClick={() => setStep("DETAILS")}>
                  Back
                </Button>
                <Button type="button" onClick={onCheckout} disabled={loading}>
                  {loading ? "Starting checkout..." : "Proceed to secure checkout"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
