"use client";

import React, { useEffect } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { StudentFull } from "../../types/student";
import { provinceOptions } from "../../constants/enums";

type Props = {
  fullStudentData?: any;
};

const districtsMap: Record<string, string[]> = {
  "Province1": ["Jhapa", "Morang", "Sunsari"],
  "Province2": ["Saptari", "Dhanusha"],
  Bagmati: ["Kathmandu", "Lalitpur", "Bhaktapur"],
  Gandaki: ["Pokhara", "Kaski"],
  Lumbini: ["Butwal", "Rupandehi"],
  Karnali: ["Surkhet", "Dailekh"],
  Sudurpashchim: ["Dhangadhi", "Kailali"],
};

const municipalitiesMap: Record<string, string[]> = {
  Jhapa: ["Birtamod", "Damak"],
  Morang: ["Biratnagar", "Belbari"],
  Sunsari: ["Inaruwa", "Itahari"],
  Saptari: ["Rajbiraj", "Saptakoshi"],
  Dhanusha: ["Janakpur", "Mithila"],
  Kathmandu: ["Kathmandu Metropolitan", "Kirtipur"],
  Lalitpur: ["Lalitpur Metropolitan", "Godawari"],
  Bhaktapur: ["Bhaktapur Municipality"],
  Pokhara: ["Pokhara Metropolitan"],
  Kaski: ["Lekhnath"],
  Butwal: ["Butwal Municipality"],
  Rupandehi: ["Siddharthanagar"],
  Surkhet: ["Birendranagar"],
  Dailekh: ["Dailekh Municipality"],
  Dhangadhi: ["Dhangadhi Municipality"],
  Kailali: ["Dhangadhi Sub-Metropolitan"],
};

// Map numeric enum values to string representations
// Backend uses: 1=Permanent, 2=Temporary, 3=SameAsPermanent
const addressTypeMap: Record<number | string, string> = {
  1: "Permanent",
  2: "Temporary",
  3: "SameAsPermanent",
  "Permanent": "Permanent",
  "Temporary": "Temporary",
  "SameAsPermanent": "SameAsPermanent",
};

// Helper function to safely convert addressType from any format to string
const normalizeAddressType = (value: any): "Permanent" | "Temporary" | "SameAsPermanent" => {
  if (!value) return "Permanent";
  
  // If it's already a string, validate it's a valid enum value
  if (typeof value === "string") {
    if (["Permanent", "Temporary", "SameAsPermanent"].includes(value)) {
      return value as "Permanent" | "Temporary" | "SameAsPermanent";
    }
  }
  
  // If it's a number, convert using the map
  if (typeof value === "number") {
    const mapped = addressTypeMap[value];
    if (mapped) {
      console.log(`📌 Converted numeric addressType ${value} to "${mapped}"`);
      return mapped as "Permanent" | "Temporary" | "SameAsPermanent";
    }
  }
  
  // Default fallback
  return "Permanent";
};

const AddressSection: React.FC<Props> = ({ fullStudentData }) => {
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<StudentFull>();

  const syncInitialized = React.useRef(false);

  // Initialize addressType on first render
  useEffect(() => {
    const currentAddresses = watch("addresses");
    if (currentAddresses) {
      // Set default addressType if not set
      if (!currentAddresses[0]?.addressType) {
        setValue("addresses.0.addressType", "Permanent");
      }
      if (!currentAddresses[1]?.addressType) {
        setValue("addresses.1.addressType", "Temporary");
      }
    }
  }, []);

  // Sync address data when fullStudentData changes - only once
  useEffect(() => {
    if (fullStudentData?.addresses && fullStudentData.addresses.length > 0 && !syncInitialized.current) {
      syncInitialized.current = true;
      console.log("🔄 Syncing address data from fullStudentData:", fullStudentData.addresses);
      
      // Set permanent address (index 0)
      if (fullStudentData.addresses[0]) {
        const perm = fullStudentData.addresses[0];
        const permAddressType = normalizeAddressType(perm.addressType);
        console.log("📍 Setting permanent address:", perm, "normalized addressType:", permAddressType);
        setValue("addresses.0.addressType", permAddressType);
        setValue("addresses.0.province", perm.province || "");
        // Force re-render after province is set to load districts
        setTimeout(() => {
          setValue("addresses.0.district", perm.district || "");
          setValue("addresses.0.municipality", perm.municipality || "");
        }, 50);
        setValue("addresses.0.wardNumber", perm.wardNumber || "");
        setValue("addresses.0.tole", perm.tole || "");
        setValue("addresses.0.houseNumber", perm.houseNumber || "");
      }
      
      // Set temporary address (index 1)
      // If only one address is provided and it's "SameAsPermanent", copy permanent to temporary
      if (fullStudentData.addresses.length === 1 && fullStudentData.addresses[0]) {
        const perm = fullStudentData.addresses[0];
        const permAddressType = normalizeAddressType(perm.addressType);
        
        if (permAddressType === "SameAsPermanent") {
          console.log("📍 Only permanent address provided with SameAsPermanent flag, copying to temporary");
          setValue("addresses.1.addressType", "SameAsPermanent");
          setValue("addresses.1.province", perm.province || "");
          setTimeout(() => {
            setValue("addresses.1.district", perm.district || "");
            setValue("addresses.1.municipality", perm.municipality || "");
          }, 50);
          setValue("addresses.1.wardNumber", perm.wardNumber || "");
          setValue("addresses.1.tole", perm.tole || "");
          setValue("addresses.1.houseNumber", perm.houseNumber || "");
        }
      } else if (fullStudentData.addresses[1]) {
        // If second address exists, use it
        const temp = fullStudentData.addresses[1];
        const tempAddressType = normalizeAddressType(temp.addressType);
        console.log("📍 Setting temporary address:", temp, "normalized addressType:", tempAddressType);
        setValue("addresses.1.addressType", tempAddressType);
        setValue("addresses.1.province", temp.province || "");
        setTimeout(() => {
          setValue("addresses.1.district", temp.district || "");
          setValue("addresses.1.municipality", temp.municipality || "");
        }, 50);
        setValue("addresses.1.wardNumber", temp.wardNumber || "");
        setValue("addresses.1.tole", temp.tole || "");
        setValue("addresses.1.houseNumber", temp.houseNumber || "");
      }
    }
  }, [fullStudentData, setValue]);

  const sameAsPermanent = useWatch({
    control,
    name: "addresses.1.addressType",
  });

  const permanentProvince = watch("addresses.0.province");
  const permanentDistrict = watch("addresses.0.district");
  const permanentMunicipality = watch("addresses.0.municipality");
  const permanentWardNumber = watch("addresses.0.wardNumber");
  const permanentTole = watch("addresses.0.tole");
  const permanentHouseNumber = watch("addresses.0.houseNumber");
  
  const temporaryProvince = watch("addresses.1.province");
  const temporaryDistrict = watch("addresses.1.district");
  const temporaryMunicipality = watch("addresses.1.municipality");
  
  // Copy Permanent to Temporary if "SameAsPermanent" is selected
  useEffect(() => {
    if (sameAsPermanent === "SameAsPermanent") {
      setValue("addresses.1.province", permanentProvince);
      setValue("addresses.1.district", permanentDistrict);
      setValue("addresses.1.municipality", permanentMunicipality);
      setValue("addresses.1.wardNumber", permanentWardNumber);
      setValue("addresses.1.tole", permanentTole);
      setValue("addresses.1.houseNumber", permanentHouseNumber);
    }
  }, [sameAsPermanent, permanentProvince, permanentDistrict, permanentMunicipality, permanentWardNumber, permanentTole, permanentHouseNumber, setValue]);

  const renderAddress = (index: number) => {
    const addr = index === 0 ? "Permanent" : "Temporary";
    let currentProvince = index === 0 ? permanentProvince : temporaryProvince;
    let currentDistrict = index === 0 ? permanentDistrict : temporaryDistrict;
    const isDisabled = index === 1 && sameAsPermanent === "SameAsPermanent";
    
    // When disabled (SameAsPermanent), use permanent values for dropdown options
    if (isDisabled) {
      currentProvince = permanentProvince;
      currentDistrict = permanentDistrict;
    }

    // Don't render the temporary address fields if SameAsPermanent is selected
    if (index === 1 && isDisabled) {
      return (
        <div key={index} className="p-6 border-2 border-gray-200 rounded-xl bg-white hover:border-blue-300 transition-all duration-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
            📍 {addr} Address
          </h3>
          
          {/* Hidden field to store addressType */}
          <input type="hidden" {...register(`addresses.${index}.addressType`)} />
          
          <div className="flex items-center space-x-3 mb-5 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <input 
              type="checkbox" 
              id="sameAsAddr"
              checked={sameAsPermanent === "SameAsPermanent"}
              onChange={(e) => {
                if (e.target.checked) {
                  setValue("addresses.1.addressType", "SameAsPermanent");
                } else {
                  setValue("addresses.1.addressType", "Temporary");
                }
              }}
              className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor="sameAsAddr" className="font-medium text-gray-700 cursor-pointer">Same as Permanent Address</label>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-gray-700">✓ Using permanent address details</p>
          </div>

          {/* Hidden inputs for temporary address fields to maintain form structure */}
          <input type="hidden" {...register(`addresses.${index}.province`)} />
          <input type="hidden" {...register(`addresses.${index}.district`)} />
          <input type="hidden" {...register(`addresses.${index}.municipality`)} />
          <input type="hidden" {...register(`addresses.${index}.wardNumber`)} />
          <input type="hidden" {...register(`addresses.${index}.tole`)} />
          <input type="hidden" {...register(`addresses.${index}.houseNumber`)} />
        </div>
      );
    }

    return (
      <div key={index} className="p-6 border-2 border-gray-200 rounded-xl bg-white hover:border-blue-300 transition-all duration-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
          📍 {addr} Address
        </h3>

        {/* Hidden field to store addressType */}
        <input type="hidden" {...register(`addresses.${index}.addressType`)} />

        {index === 1 && (
          <div className="flex items-center space-x-3 mb-5 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <input 
              type="checkbox" 
              id="sameAsAddr"
              checked={sameAsPermanent === "SameAsPermanent"}
              onChange={(e) => {
                if (e.target.checked) {
                  setValue("addresses.1.addressType", "SameAsPermanent");
                } else {
                  setValue("addresses.1.addressType", "Temporary");
                }
              }}
              className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor="sameAsAddr" className="font-medium text-gray-700 cursor-pointer">Same as Permanent Address</label>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Province <span className="text-red-500">*</span></label>
            <select 
              {...register(`addresses.${index}.province`)} 
              disabled={isDisabled}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                isDisabled ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed" : "bg-white"
              } ${
                errors.addresses?.[index]?.province
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : !isDisabled && "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
            >
              <option value="">Select Province</option>
              {provinceOptions.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
            {errors.addresses?.[index]?.province && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.addresses[index]?.province?.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">District <span className="text-red-500">*</span></label>
            <select 
              {...register(`addresses.${index}.district`)} 
              disabled={isDisabled}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                isDisabled ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed" : "bg-white"
              } ${
                errors.addresses?.[index]?.district
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : !isDisabled && "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
            >
              <option value="">Select District</option>
              {currentProvince && districtsMap[currentProvince] ? (
                // If province is selected, show only its districts
                districtsMap[currentProvince].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))
              ) : (
                // If no province selected, show all districts as fallback
                Object.values(districtsMap).flat().map((d, idx) => (
                  <option key={`${d}-${idx}`} value={d}>{d}</option>
                ))
              )}
            </select>
            {errors.addresses?.[index]?.district && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.addresses[index]?.district?.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Municipality/VDC <span className="text-red-500">*</span></label>
            <select 
              {...register(`addresses.${index}.municipality`)} 
              disabled={isDisabled}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                isDisabled ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed" : "bg-white"
              } ${
                errors.addresses?.[index]?.municipality
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : !isDisabled && "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
            >
              <option value="">Select Municipality</option>
              {currentDistrict && municipalitiesMap[currentDistrict] ? (
                // If district is selected, show only its municipalities
                municipalitiesMap[currentDistrict].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))
              ) : (
                // If no district selected, show all municipalities as fallback
                Object.values(municipalitiesMap).flat().map((m, idx) => (
                  <option key={`${m}-${idx}`} value={m}>{m}</option>
                ))
              )}
            </select>
            {errors.addresses?.[index]?.municipality && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.addresses[index]?.municipality?.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Ward Number <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              {...register(`addresses.${index}.wardNumber`)} 
              disabled={isDisabled}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                isDisabled ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed" : "bg-white"
              } ${
                errors.addresses?.[index]?.wardNumber
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : !isDisabled && "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
              placeholder="Ward no."
            />
            {errors.addresses?.[index]?.wardNumber && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.addresses[index]?.wardNumber?.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Tole/Street <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              {...register(`addresses.${index}.tole`)} 
              disabled={isDisabled}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                isDisabled ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed" : "bg-white"
              } ${
                errors.addresses?.[index]?.tole
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : !isDisabled && "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
              placeholder="Street/tole name"
            />
            {errors.addresses?.[index]?.tole && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.addresses[index]?.tole?.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">House Number</label>
            <input 
              type="text" 
              {...register(`addresses.${index}.houseNumber`)} 
              disabled={isDisabled}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                isDisabled ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed" : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
              placeholder="House no."
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-teal-600 to-teal-400 rounded"></div>
        <h2 className="text-3xl font-bold text-gray-900">Address Details</h2>
      </div>
      <div className="space-y-5">
        {[0, 1].map(renderAddress)}
      </div>
    </div>
  );
};

export default AddressSection;
