"use client";

import React, { useEffect } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { StudentFull } from "../../types/student";

type Props = {};

const provinces = ["Province 1", "Province 2", "Bagmati", "Gandaki", "Lumbini", "Karnali", "Sudurpashchim"];

const districtsMap: Record<string, string[]> = {
  "Province 1": ["Jhapa", "Morang", "Sunsari"],
  "Province 2": ["Saptari", "Dhanusha"],
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

const AddressSection: React.FC<Props> = () => {
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<StudentFull>();

  const sameAsPermanent = useWatch({
    control,
    name: "address.1.sameAsPermanent",
  });

  const permanentProvince = watch("address.0.province");
  const permanentDistrict = watch("address.0.district");
  const permanentMunicipality = watch("address.0.municipality");
  const permanentWardNumber = watch("address.0.wardNumber");
  const permanentTole = watch("address.0.tole");
  const permanentHouseNumber = watch("address.0.houseNumber");
  
  const temporaryProvince = watch("address.1.province");
  const temporaryDistrict = watch("address.1.district");

  // Copy Permanent to Temporary if checked - with all individual fields tracked
  useEffect(() => {
    if (sameAsPermanent) {
      setValue("address.1.province", permanentProvince);
      setValue("address.1.district", permanentDistrict);
      setValue("address.1.municipality", permanentMunicipality);
      setValue("address.1.wardNumber", permanentWardNumber);
      setValue("address.1.tole", permanentTole);
      setValue("address.1.houseNumber", permanentHouseNumber);
    }
  }, [sameAsPermanent, permanentProvince, permanentDistrict, permanentMunicipality, permanentWardNumber, permanentTole, permanentHouseNumber, setValue]);

  const renderAddress = (index: number) => {
    const addr = index === 0 ? "Permanent" : "Temporary";
    const currentProvince = index === 0 ? permanentProvince : temporaryProvince;
    const currentDistrict = index === 0 ? permanentDistrict : temporaryDistrict;
    const isDisabled = index === 1 && sameAsPermanent;

    return (
      <div key={index} className="p-6 border-2 border-gray-200 rounded-xl bg-white hover:border-blue-300 transition-all duration-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
          📍 {addr} Address {index === 1 && <span className="text-sm font-normal text-gray-500">(Optional)</span>}
        </h3>

        {index === 1 && (
          <div className="flex items-center space-x-3 mb-5 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <input 
              type="checkbox" 
              id="sameAsAddr" 
              {...register(`address.${index}.sameAsPermanent`)} 
              className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor="sameAsAddr" className="font-medium text-gray-700 cursor-pointer">Same as Permanent Address</label>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Province <span className="text-red-500">*</span></label>
            <select 
              {...register(`address.${index}.province`)} 
              disabled={isDisabled}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                isDisabled ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed" : "bg-white"
              } ${
                errors.address?.[index]?.province
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : !isDisabled && "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
            >
              <option value="">Select Province</option>
              {provinces.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            {errors.address?.[index]?.province && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.address[index]?.province?.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">District <span className="text-red-500">*</span></label>
            <select 
              {...register(`address.${index}.district`)} 
              disabled={isDisabled}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                isDisabled ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed" : "bg-white"
              } ${
                errors.address?.[index]?.district
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : !isDisabled && "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
            >
              <option value="">Select District</option>
              {districtsMap[currentProvince || ""]?.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {errors.address?.[index]?.district && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.address[index]?.district?.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Municipality/VDC <span className="text-red-500">*</span></label>
            <select 
              {...register(`address.${index}.municipality`)} 
              disabled={isDisabled}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                isDisabled ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed" : "bg-white"
              } ${
                errors.address?.[index]?.municipality
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : !isDisabled && "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
            >
              <option value="">Select Municipality</option>
              {municipalitiesMap[currentDistrict || ""]?.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            {errors.address?.[index]?.municipality && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.address[index]?.municipality?.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Ward Number <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              {...register(`address.${index}.wardNumber`)} 
              disabled={isDisabled}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                isDisabled ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed" : "bg-white"
              } ${
                errors.address?.[index]?.wardNumber
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : !isDisabled && "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
              placeholder="Ward no."
            />
            {errors.address?.[index]?.wardNumber && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.address[index]?.wardNumber?.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Tole/Street <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              {...register(`address.${index}.tole`)} 
              disabled={isDisabled}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                isDisabled ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed" : "bg-white"
              } ${
                errors.address?.[index]?.tole
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : !isDisabled && "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
              placeholder="Street/tole name"
            />
            {errors.address?.[index]?.tole && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.address[index]?.tole?.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">House Number</label>
            <input 
              type="text" 
              {...register(`address.${index}.houseNumber`)} 
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
