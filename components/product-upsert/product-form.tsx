"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign, FileText, Loader2, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCreateProductMutation } from "@/redux/services/product-api";
import { useGetCategoriesQuery } from "@/redux/services/category-api";
import { Product } from "@/types/product";

const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: Product;
  imageUrl: string | null;
  isUploading: boolean;
}

export function ProductForm({
  product,
  imageUrl,
  isUploading,
}: ProductFormProps) {
  const router = useRouter();
  const [createProduct, { isLoading: creating }] = useCreateProductMutation();
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error,
  } = useGetCategoriesQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      price: product?.price || 0,
      description: product?.description || "",
      categoryId: product?.category?.id || "",
    },
  });

  if (error) {
    toast.error("Failed to load categories");
  }

  const onSubmit = async (data: ProductFormData) => {
    if (!imageUrl) {
      toast.error("Please upload an image");
      return;
    }
    try {
      const payload = {
        name: data.name,
        price: data.price,
        description: data.description || "",
        categoryId: data.categoryId,
        images: [imageUrl],
      };
      await createProduct(payload).unwrap();
      toast.success("Product created successfully!");
      router.push("/products");
    } catch (err) {
      toast.error("Failed to create product");
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Product Details
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name *
          </label>
          <input
            type="text"
            {...register("name")}
            className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
              errors.name ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              Price *
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                errors.price ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="0.00"
            />
            {errors.price && (
              <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                {errors.price.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Tag className="w-4 h-4" />
              Category *
            </label>
            <select
              {...register("categoryId")}
              className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                errors.categoryId ? "border-red-300" : "border-gray-300"
              }`}
              disabled={isLoadingCategories}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                {errors.categoryId.message}
              </p>
            )}
            {isLoadingCategories && (
              <p className="text-gray-500 text-sm mt-2">
                Loading categories...
              </p>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
            placeholder="Enter product description..."
          />
          <p className="text-xs text-gray-500 mt-2">
            Optional: Provide additional details about the product
          </p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 sm:flex-none px-6 cursor-pointer py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={creating || isUploading || isLoadingCategories}
            className="flex-1 sm:flex-none cursor-pointer px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center justify-center gap-2"
          >
            {creating || isUploading || isLoadingCategories ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {isUploading
                  ? "Uploading..."
                  : isLoadingCategories
                  ? "Loading..."
                  : "Saving..."}
              </>
            ) : (
              <>{product ? "Update Product" : "Create Product"}</>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
