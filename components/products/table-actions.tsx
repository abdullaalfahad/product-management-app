import { Product } from "@/types/product";
import { Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { DeleteAlert } from "./delete-alert";

export function TableActions({ product }: { product: Product }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      setDeleteDialogOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          className="inline-flex items-center cursor-pointer gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm transition-all duration-200"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => handleDeleteClick(product)}
          type="button"
          className="inline-flex items-center cursor-pointer gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 hover:shadow-sm transition-all duration-200"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>

      {deleteDialogOpen && (
        <DeleteAlert
          selectedProduct={selectedProduct as Product}
          onConfirmDelete={handleConfirmDelete}
          onCancelDelete={handleCancelDelete}
        />
      )}
    </>
  );
}
