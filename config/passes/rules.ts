import type { Jurisdiction } from "./jurisdictions";
import { PASS_PRODUCTS } from "./products";

export type ActivityType = "VISIT" | "CAMP" | "DRIVE" | "UNSURE";

export function getRecommendedProducts(input: {
  jurisdiction: Jurisdiction;
  activityType: ActivityType;
}) {
  const stateProducts = PASS_PRODUCTS.filter(
    (product) => product.active && product.jurisdiction === input.jurisdiction
  );

  if (input.activityType === "UNSURE") {
    return stateProducts.slice(0, 3);
  }

  if (input.activityType === "DRIVE") {
    return stateProducts.filter((product) => product.category === "VEHICLE_ACCESS_PERMIT");
  }

  if (input.activityType === "CAMP") {
    return stateProducts.filter((product) => product.category === "CAMPING_PERMIT");
  }

  return stateProducts.filter((product) => product.category === "ENTRY_PASS");
}
