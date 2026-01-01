import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center w-screen md:h-1/1 md:m-0 mt-8">
      <div className="text-center p-8 rounded-lg shadow-md bg-white">
        <div className="icon-area">⚠️</div>
        <h2 className="text-amber-400">404 | Page not found</h2>
      </div>
    </div>
  );
}
