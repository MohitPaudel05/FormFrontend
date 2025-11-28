// components/ui/SuccessMessage.tsx
export default function SuccessMessage({ message }: { message: string }) {
  return (
    <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded">
      {message}
    </div>
  );
}
