export type NswPassType =
  | "ALL_PARKS_PASS"
  | "MULTI_PARKS_PASS"
  | "COUNTRY_PARKS_PASS"
  | "SINGLE_PARK_PASS";

export type NswPassDuration = "1_YEAR" | "2_YEARS";

export type NswAnnualPassOption = {
  type: NswPassType;
  label: string;
  description: string;
  prices: Record<NswPassDuration, number>;
};

export const NSW_ANNUAL_PASS_OPTIONS: NswAnnualPassOption[] = [
  {
    type: "ALL_PARKS_PASS",
    label: "All Parks Pass",
    description: "Unlimited vehicle entry to eligible NSW national parks.",
    prices: { "1_YEAR": 190, "2_YEARS": 335 },
  },
  {
    type: "MULTI_PARKS_PASS",
    label: "Multi Parks Pass",
    description: "Great for regular visits to participating park groups.",
    prices: { "1_YEAR": 150, "2_YEARS": 270 },
  },
  {
    type: "COUNTRY_PARKS_PASS",
    label: "Country Parks Pass",
    description: "Designed for regional park travel and frequent road trips.",
    prices: { "1_YEAR": 110, "2_YEARS": 200 },
  },
  {
    type: "SINGLE_PARK_PASS",
    label: "Single Park Pass",
    description: "Valid for one selected park only.",
    prices: { "1_YEAR": 75, "2_YEARS": 130 },
  },
];

export const NSW_SINGLE_PARK_OPTIONS = [
  "Kosciuszko National Park",
  "Blue Mountains National Park",
  "Royal National Park",
  "Mungo National Park",
  "Dorrigo National Park",
];
