// app/components/ui/FileInput.tsx
import React, { useCallback } from 'react';
import { UseFormRegister, RegisterOptions } from 'react-hook-form';

interface FileInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  validation?: RegisterOptions;
  error?: string;
  accept?: string;
  className?: string;
}

const FileInput: React.FC<FileInputProps> = ({ label, name, register, validation, error, accept, className }) => {
  const [fileName, setFileName] = React.useState<string>('');
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
  }, []);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <label className={`flex items-center px-4 py-2 bg-white border rounded-md shadow-sm cursor-pointer ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}>
        <svg className="w-6 h-6 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
        <span className="text-gray-500">{fileName || 'Choose file'}</span>
        <input
          type="file"
          className="hidden"
          {...register(name, {
            ...validation,
            onChange: (e) => {
              handleFileChange(e);
              register(name).onChange(e);
            },
          })}
          accept={accept}
        />
      </label>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FileInput;