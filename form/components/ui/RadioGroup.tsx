interface RadioButtonProps {
  label: string;
  value: string;
  name: string;
  checked: boolean;
  onChange: (value: string) => void;
}

export default function RadioButton({ label, value, name, checked, onChange }: RadioButtonProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="w-4 h-4 accent-black" />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}
