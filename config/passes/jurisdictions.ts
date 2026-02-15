export type Jurisdiction =
  | "NSW"
  | "QLD"
  | "VIC"
  | "WA"
  | "SA"
  | "TAS"
  | "NT"
  | "ACT";

export const JURISDICTIONS: { code: Jurisdiction; name: string }[] = [
  { code: "NSW", name: "New South Wales" },
  { code: "QLD", name: "Queensland" },
  { code: "VIC", name: "Victoria" },
  { code: "WA", name: "Western Australia" },
  { code: "SA", name: "South Australia" },
  { code: "TAS", name: "Tasmania" },
  { code: "NT", name: "Northern Territory" },
  { code: "ACT", name: "Australian Capital Territory" },
];
