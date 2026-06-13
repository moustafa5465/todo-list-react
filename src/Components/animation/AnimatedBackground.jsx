import "../../App.css";

export default function AnimatedBackground({ children }) {
  return (
    <div className="relative min-h-screen w-full bg-[#030014] backdrop-blur-[120px] overflow-hidden flex flex-row items-center justify-center">
      {/* الدائرة الأولى: باللون الأزرق (تتحرك بالأنيميشن الأول) */}
      <div className="absolute w-[800px] h-[800px] rounded-full bg-black bg-conic from-white from-50%  to-sky-500 to-50% pointer-events-none blur-[220px] animate-glow-1"></div>

      {/* المحتوى الأساسي للموقع بيتحط هنا ويكون فوق الخلفية */}
      <div className="z-10 w-full flex items-center justify-center px-4">
        {children}
      </div>
    </div>
  );
}
