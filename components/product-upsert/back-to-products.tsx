import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackToProducts() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/products")}
      className="inline-flex items-center cursor-pointer gap-2 px-4 py-2 mb-6 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
    >
      <ArrowLeft className="w-4 h-4" />
      Back to Products
    </button>
  );
}
