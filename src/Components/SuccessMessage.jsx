export default function SuccessMessage({ alert }) {
  return (
    <>
      <div
        className={`fixed bottom-5 right-5 transition-all duration-500 ease-in-out transform
          ${
            alert?.show == true
              ? "opacity-100 translate-y-0 scale-100" // الشكل لما تظهر
              : "opacity-0 translate-y-10 scale-95 pointer-events-none" // الشكل وهي مختفية
          }`}
      >
        <p
          className={`px-6 py-3 bg-white shadow-2xl rounded-xl font-bold ${
            alert?.type === "error" ? "text-red-500" : "text-green-500"
          }`}
        >
          {alert?.message}
        </p>
      </div>
    </>
  );
}
