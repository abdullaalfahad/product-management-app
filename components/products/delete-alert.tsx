"use client";

import { Trash2, X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useDeleteProductMutation } from "@/redux/services/product-api";
import type { Product } from "@/types/product";

type DeleteAlertProps = {
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
  selectedProduct: Product;
};

export function DeleteAlert({
  onCancelDelete,
  onConfirmDelete,
  selectedProduct,
}: DeleteAlertProps) {
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: string, name: string) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success(`Deleted ${name}`);
      onConfirmDelete();
    } catch {
      toast.error("Failed to delete product.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200 border border-gray-100">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Product
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCancelDelete}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Info */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700 mb-2">
            Are you sure you want to permanently delete this product?
          </p>

          {selectedProduct && (
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-200">
              <Image
                src={
                  (selectedProduct.images?.[0] as string) || "/placeholder.png"
                }
                alt={selectedProduct.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-lg object-cover ring-2 ring-gray-200"
                unoptimized
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {selectedProduct.name}
                </p>
                <p className="text-sm text-gray-500">
                  ${selectedProduct.price.toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancelDelete}
            className="flex-1 px-4 cursor-pointer py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() =>
              handleDelete(selectedProduct?.id, selectedProduct?.name)
            }
            className="flex-1 inline-flex cursor-pointer items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
