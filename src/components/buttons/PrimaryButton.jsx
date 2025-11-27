export default function PrimaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-esyellow text-esblack px-4 py-2 rounded hover:bg-gray-200 transition-colors font-bold border border-gray-300"
    >
      {children}
    </button>
  );
}
