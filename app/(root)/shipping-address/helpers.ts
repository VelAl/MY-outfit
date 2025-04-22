import { T_ShippingAddress } from "@/app-types-ts";

//___SHIPP_ADDRESS___________FORM HELPERS________________
export const emptyShippingAddress: T_ShippingAddress = {
  city: "",
  country: "",
  fullName: "",
  postalCode: "",
  streetAddress: "",
};

export const inputsStructure: {
  name: keyof T_ShippingAddress;
  label: string;
}[] = [
  { name: "fullName", label: "Full Name" },
  { name: "streetAddress", label: "Address" },
  { name: "city", label: "City" },
  { name: "postalCode", label: "Postal Code" },
  { name: "country", label: "Country" },
] as const;
