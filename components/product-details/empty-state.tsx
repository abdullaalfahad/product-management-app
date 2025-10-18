import { Package } from "lucide-react";
import { BackToProducts } from "../product-upsert/back-to-products";

export function ProductNotFound() {
  return (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Product Not Found
        </h3>
        <p className="text-gray-600 mb-4">
          The product you're looking for doesn't exist or has been removed.
        </p>

        <BackToProducts />
      </div>
    </div>
  );
}
