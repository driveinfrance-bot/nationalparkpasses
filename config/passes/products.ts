import type { Jurisdiction } from "./jurisdictions";

export type ProductCategory =
  | "ENTRY_PASS"
  | "CAMPING_PERMIT"
  | "VEHICLE_ACCESS_PERMIT";

export type PassProduct = {
  id: string;
  jurisdiction: Jurisdiction;
  category: ProductCategory;
  title: string;
  shortDescription: string;
  requiresVehicle: boolean;
  requiresDates: boolean;
  requiresParkSelection: boolean;
  officialFeeAud: number;
  serviceFeeAud: number;
  active: boolean;
};

export const PASS_PRODUCTS: PassProduct[] = [
  {
    id: "qld-vehicle-access",
    jurisdiction: "QLD",
    category: "VEHICLE_ACCESS_PERMIT",
    title: "QLD Vehicle Access Permit",
    shortDescription: "For beach, island, and restricted vehicle access areas.",
    requiresVehicle: true,
    requiresDates: true,
    requiresParkSelection: true,
    officialFeeAud: 40,
    serviceFeeAud: 25,
    active: true,
  },
  {
    id: "vic-camping-booking",
    jurisdiction: "VIC",
    category: "CAMPING_PERMIT",
    title: "VIC Camping Permit Booking",
    shortDescription: "Assistance with Parks Victoria campsite permit bookings.",
    requiresVehicle: false,
    requiresDates: true,
    requiresParkSelection: true,
    officialFeeAud: 55,
    serviceFeeAud: 25,
    active: true,
  },
  {
    id: "nsw-entry-pass",
    jurisdiction: "NSW",
    category: "ENTRY_PASS",
    title: "NSW Park Entry Pass",
    shortDescription: "Day-use and park entry booking support for selected parks.",
    requiresVehicle: false,
    requiresDates: true,
    requiresParkSelection: true,
    officialFeeAud: 19,
    serviceFeeAud: 25,
    active: true,
  },
  {
    id: "wa-park-pass",
    jurisdiction: "WA",
    category: "ENTRY_PASS",
    title: "WA National Park Pass",
    shortDescription: "Help booking WA entry passes for visitors and vehicles.",
    requiresVehicle: true,
    requiresDates: false,
    requiresParkSelection: false,
    officialFeeAud: 25,
    serviceFeeAud: 25,
    active: true,
  },
  {
    id: "tas-camping-permit",
    jurisdiction: "TAS",
    category: "CAMPING_PERMIT",
    title: "TAS Camping Permit",
    shortDescription: "Camping permit application support for Tasmania parks.",
    requiresVehicle: false,
    requiresDates: true,
    requiresParkSelection: true,
    officialFeeAud: 35,
    serviceFeeAud: 25,
    active: true,
  },
];
