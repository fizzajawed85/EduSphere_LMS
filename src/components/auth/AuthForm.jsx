export default function AuthForm({
  title,
  subtitle,
  children,
  onSubmit,
  buttonText,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-esblack">{title}</h2>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>

      <div className="mt-6 space-y-4">{children}</div>

      <button
        type="submit"
        className="w-full bg-esblue text-white p-3 rounded-lg mt-4 font-semibold"
      >
        {buttonText}
      </button>
    </form>
  );
}
