"use client";

import React from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { StudentFull } from "../../types/student";

const divisionGPAOptions = ["First", "Second", "Third", "GPA", "Other"];
const qualificationOptions = [
  { value: "SLC", label: "SLC/SEE" },
  { value: "Plus", label: "+2" },
  { value: "Bachelors", label: "Bachelors" },
  { value: "Masters", label: "Masters" },
];

type Props = {
  fullStudentData?: any;
};

const QualificationSection: React.FC<Props> = ({ fullStudentData }) => {
  const { control, register, formState: { errors } } = useFormContext<StudentFull>();
  const [showAllQualifications, setShowAllQualifications] = React.useState(true);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "academicHistories",
  });

  const hasInitialized = React.useRef(false);

  React.useEffect(() => {
    // Only initialize once and only if no student data exists
    if (!hasInitialized.current && fields.length === 0 && !fullStudentData?.academicHistories) {
      hasInitialized.current = true;
      append({ 
        qualification: "SLC", 
        board: "", 
        institution: "", 
        passedYear: "", 
        divisionGPA: "First", 
        marksheetPath: "",
        provisionalPath: "",
        photoPath: "",
        signaturePath: "",
        characterCertificatePath: "",
        marksheet: null as any,
        provisional: null as any,
        photo: null as any,
        signature: null as any,
        characterCertificate: null as any
      });
    }
  }, []);

  // Show all items if data exists, otherwise show only first item unless user clicks "Show More"
  const visibleFields = fullStudentData?.academicHistories?.length > 0 ? fields : (showAllQualifications ? fields : fields.slice(0, 1));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded"></div>
        <h2 className="text-3xl font-bold text-gray-900">Previous Academic Qualifications</h2>
      </div>

      <div className="space-y-3">
        {visibleFields.map((field, index) => (
          <div key={field.id} className="border-2 border-yellow-200 rounded-xl p-6 bg-white hover:border-yellow-300 transition-all duration-200">
            {/* Card Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-yellow-100">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <span>📚</span> Qualification {index + 1} {index === 0 && <span className="text-red-500 text-sm"></span>}
              </h3>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    remove(index);
                  }}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg text-sm transition-all duration-200"
                >
                  ✕ Remove
                </button>
              )}
            </div>

            {/* Card Content - Always Visible */}
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Qualification <span className="text-red-500">*</span></label>
                  <select
                    {...register(`academicHistories.${index}.qualification`)}
                    className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 ${
                      errors.academicHistories?.[index]?.qualification
                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                        : "border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 hover:border-gray-400"
                    }`}
                  >
                    <option value="">Select Qualification</option>
                    {qualificationOptions.map((qual) => (
                      <option key={qual.value} value={qual.value}>{qual.label}</option>
                    ))}
                  </select>
                  {errors.academicHistories?.[index]?.qualification && (
                    <p className="text-red-600 text-sm mt-2 font-medium">
                      {errors.academicHistories[index]?.qualification?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Board <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    {...register(`academicHistories.${index}.board`)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                      errors.academicHistories?.[index]?.board
                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                        : "border-gray-300 bg-white focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 hover:border-gray-400"
                    }`}
                    placeholder="Board/University name"
                  />
                  {errors.academicHistories?.[index]?.board && (
                    <p className="text-red-600 text-sm mt-2 font-medium">
                      {errors.academicHistories[index]?.board?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Institution <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    {...register(`academicHistories.${index}.institution`)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                      errors.academicHistories?.[index]?.institution
                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                        : "border-gray-300 bg-white focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 hover:border-gray-400"
                    }`}
                    placeholder="School/College name"
                  />
                  {errors.academicHistories?.[index]?.institution && (
                    <p className="text-red-600 text-sm mt-2 font-medium">
                      {errors.academicHistories[index]?.institution?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Passed Year <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    {...register(`academicHistories.${index}.passedYear`)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                      errors.academicHistories?.[index]?.passedYear
                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                        : "border-gray-300 bg-white focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 hover:border-gray-400"
                    }`}
                    placeholder="e.g., 2020"
                  />
                  {errors.academicHistories?.[index]?.passedYear && (
                    <p className="text-red-600 text-sm mt-2 font-medium">
                      {errors.academicHistories[index]?.passedYear?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Division / GPA <span className="text-red-500">*</span></label>
                  <select
                    {...register(`academicHistories.${index}.divisionGPA`)}
                    className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 ${
                      errors.academicHistories?.[index]?.divisionGPA
                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                        : "border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 hover:border-gray-400"
                    }`}
                  >
                    <option value="">Select Division/GPA</option>
                    {divisionGPAOptions.map((division) => (
                      <option key={division} value={division}>{division}</option>
                    ))}
                  </select>
                  {errors.academicHistories?.[index]?.divisionGPA && (
                    <p className="text-red-600 text-sm mt-2 font-medium">
                      {errors.academicHistories[index]?.divisionGPA?.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Hidden input fields for Path fields - must be registered to send with form */}
              <input type="hidden" {...register(`academicHistories.${index}.photoPath`)} />
              <input type="hidden" {...register(`academicHistories.${index}.signaturePath`)} />
              <input type="hidden" {...register(`academicHistories.${index}.characterCertificatePath`)} />
              <input type="hidden" {...register(`academicHistories.${index}.marksheetPath`)} />
              <input type="hidden" {...register(`academicHistories.${index}.provisionalPath`)} />

              {/* Document Uploads Section */}
              <div className="pt-4 border-t-2 border-yellow-100">
                <h4 className="font-semibold text-gray-800 mb-4">📸 Document & Photo Uploads</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Photo Upload */}
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Photo <span className="text-red-500">*</span> (Passport Size)</label>
                    
                    {/* Display existing photo */}
                    {fullStudentData?.academicHistories?.[index]?.photoPath && (
                      <div className="mb-3 p-3 bg-green-50 border-2 border-green-200 rounded-lg">
                        <p className="text-sm text-green-700 font-semibold mb-2">✅ Current Photo:</p>
                        <img 
                          src={`https://localhost:7190/${fullStudentData.academicHistories[index].photoPath}`}
                          alt="Passport photo"
                          className="w-full h-32 object-cover rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    
                    <Controller
                      control={control}
                      name={`academicHistories.${index}.photo`}
                      render={({ field }) => (
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 ${
                            errors.academicHistories?.[index]?.photo ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 hover:border-gray-400"
                          }`}
                        />
                      )}
                    />
                    {errors.academicHistories?.[index]?.photo && (
                      <p className="text-red-600 text-sm mt-2 font-medium">
                        {errors.academicHistories[index]?.photo?.message}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">JPG/PNG, Max 2MB {fullStudentData?.academicHistories?.[index]?.photoPath && '(Optional - leave empty to keep current)'}</p>
                  </div>

                  {/* Signature Upload */}
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Signature <span className="text-red-500">*</span></label>
                    
                    {/* Display existing signature */}
                    {fullStudentData?.academicHistories?.[index]?.signaturePath && (
                      <div className="mb-3 p-3 bg-purple-50 border-2 border-purple-200 rounded-lg">
                        <p className="text-sm text-purple-700 font-semibold mb-2">✅ Current Signature:</p>
                        <img 
                          src={`https://localhost:7190/${fullStudentData.academicHistories[index].signaturePath}`}
                          alt="Signature"
                          className="w-full h-32 object-cover rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    
                    <Controller
                      control={control}
                      name={`academicHistories.${index}.signature`}
                      render={({ field }) => (
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 ${
                            errors.academicHistories?.[index]?.signature ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 hover:border-gray-400"
                          }`}
                        />
                      )}
                    />
                    {errors.academicHistories?.[index]?.signature && (
                      <p className="text-red-600 text-sm mt-2 font-medium">
                        {errors.academicHistories[index]?.signature?.message}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">JPG/PNG, Max 1MB {fullStudentData?.academicHistories?.[index]?.signaturePath && '(Optional - leave empty to keep current)'}</p>
                  </div>

                  {/* Character Certificate Upload */}
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Character Certificate <span className="text-red-500">*</span></label>
                    
                    {/* Display existing certificate */}
                    {fullStudentData?.academicHistories?.[index]?.characterCertificatePath && (
                      <div className="mb-3 p-3 bg-red-50 border-2 border-red-200 rounded-lg">
                        <p className="text-sm text-red-700 font-semibold mb-2">✅ Current Certificate:</p>
                        <img 
                          src={`https://localhost:7190/${fullStudentData.academicHistories[index].characterCertificatePath}`}
                          alt="Character Certificate"
                          className="w-full h-32 object-cover rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            const parent = (e.target as HTMLImageElement).parentElement;
                            if (parent) {
                              const filename = fullStudentData.academicHistories[index].characterCertificatePath.split('/').pop();
                              parent.innerHTML = `<div class="text-xs text-red-600 truncate">📄 ${filename}</div>`;
                            }
                          }}
                        />
                      </div>
                    )}
                    
                    <Controller
                      control={control}
                      name={`academicHistories.${index}.characterCertificate`}
                      render={({ field }) => (
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 ${
                            errors.academicHistories?.[index]?.characterCertificate ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 hover:border-gray-400"
                          }`}
                        />
                      )}
                    />
                    {errors.academicHistories?.[index]?.characterCertificate && (
                      <p className="text-red-600 text-sm mt-2 font-medium">
                        {errors.academicHistories[index]?.characterCertificate?.message}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">JPG/JPEG/PNG, Max 2MB {fullStudentData?.academicHistories?.[index]?.characterCertificatePath && '(Optional - leave empty to keep current)'}</p>
                  </div>
                </div>

                {/* Marksheet & Provisional Documents */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Marksheet Document</label>
                    
                    {/* Display existing marksheet */}
                    {fullStudentData?.academicHistories?.[index]?.marksheetPath && (
                      <div className="mb-3 p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-700 font-semibold mb-2">✅ Current Marksheet:</p>
                        <img 
                          src={`https://localhost:7190/${fullStudentData.academicHistories[index].marksheetPath}`}
                          alt="Marksheet"
                          className="w-full h-32 object-cover rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            const parent = (e.target as HTMLImageElement).parentElement;
                            if (parent) {
                              const filename = fullStudentData.academicHistories[index].marksheetPath.split('/').pop();
                              parent.innerHTML = `<div class="text-xs text-blue-600 truncate">📄 ${filename}</div>`;
                            }
                          }}
                        />
                      </div>
                    )}
                    
                    <Controller
                      control={control}
                      name={`academicHistories.${index}.marksheet`}
                      render={({ field }) => (
                        <input
                          type="file"
                          accept=".pdf,.jpg,.png"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 hover:border-gray-400 transition-all duration-200 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                        />
                      )}
                    />
                    <p className="text-sm text-gray-500 mt-1">PDF/JPG/PNG {fullStudentData?.academicHistories?.[index]?.marksheetPath && '(Optional - leave empty to keep current)'}</p>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Provisional / Admit Card</label>
                    
                    {/* Display existing provisional */}
                    {fullStudentData?.academicHistories?.[index]?.provisionalPath && (
                      <div className="mb-3 p-3 bg-amber-50 border-2 border-amber-200 rounded-lg">
                        <p className="text-sm text-amber-700 font-semibold mb-2">✅ Current Provisional:</p>
                        <img 
                          src={`https://localhost:7190/${fullStudentData.academicHistories[index].provisionalPath}`}
                          alt="Provisional / Admit Card"
                          className="w-full h-32 object-cover rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            const parent = (e.target as HTMLImageElement).parentElement;
                            if (parent) {
                              const filename = fullStudentData.academicHistories[index].provisionalPath.split('/').pop();
                              parent.innerHTML = `<div class="text-xs text-amber-600 truncate">📄 ${filename}</div>`;
                            }
                          }}
                        />
                      </div>
                    )}
                    
                    <Controller
                      control={control}
                      name={`academicHistories.${index}.provisional`}
                      render={({ field }) => (
                        <input
                          type="file"
                          accept=".pdf,.jpg,.png"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 hover:border-gray-400 transition-all duration-200 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200"
                        />
                      )}
                    />
                    <p className="text-sm text-gray-500 mt-1">PDF/JPG/PNG {fullStudentData?.academicHistories?.[index]?.provisionalPath && '(Optional - leave empty to keep current)'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Show More / Show Less Button */}
        {fields.length > 1 && (
          <button
            type="button"
            onClick={() => setShowAllQualifications(!showAllQualifications)}
            className="w-full py-2 text-yellow-600 hover:text-yellow-700 font-semibold text-sm transition-all duration-200"
          >
            {showAllQualifications ? '▲ Show Less' : '▼ Show More (' + (fields.length - 1) + ' more)'}
          </button>
        )}

        {/* Add More Button */}
        <button
          type="button"
          onClick={() => {
            append({ 
              qualification: "SLC", 
              board: "", 
              institution: "", 
              passedYear: "", 
              divisionGPA: "First", 
              marksheetPath: "",
              provisionalPath: "",
              photoPath: "",
              signaturePath: "",
              characterCertificatePath: "",
              marksheet: null as any,
              provisional: null as any,
              photo: null as any,
              signature: null as any,
              characterCertificate: null as any
            });
          }}
          className="w-full py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg"
        >
          <span className="text-lg">+</span> Add More Qualification
        </button>
      </div>
    </div>
  );
};

export default QualificationSection;

