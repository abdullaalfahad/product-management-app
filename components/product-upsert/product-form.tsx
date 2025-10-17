"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, DollarSign, FileText, Loader2, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useGetCategoriesQuery } from "@/redux/services/category-api";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/services/product-api";
import type { Product } from "@/types/product";

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
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();
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

    const payload = {
      name: data.name,
      price: data.price,
      description: data.description || "",
      categoryId: data.categoryId,
      images: [imageUrl],
    };

    try {
      if (product) {
        await updateProduct({ id: product.id, body: payload }).unwrap();
        toast.success("Product updated successfully!");
      } else {
        await createProduct(payload).unwrap();
        toast.success("Product created successfully!");
      }
      router.push("/products");
    } catch {
      toast.error(
        product ? "Failed to update product" : "Failed to create product",
      );
    }
  };

  const isSubmitting =
    creating || updating || isUploading || isLoadingCategories;

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Product Details
        </h3>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Product Name *
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className={`w-full border rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
              errors.name ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-2">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1"
            >
              <DollarSign className="w-4 h-4" />
              Price *
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className={`w-full border rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                errors.price ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="0.00"
            />
            {errors.price && (
              <p className="text-red-600 text-sm mt-2">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1"
            >
              <Tag className="w-4 h-4" />
              Category *
            </label>
            <select
              id="categoryId"
              {...register("categoryId")}
              className={`w-full border rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
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
              <p className="text-red-600 text-sm mt-2">
                {errors.categoryId.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
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
            disabled={isSubmitting}
            className="flex-1 sm:flex-none cursor-pointer px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {isUploading
                  ? "Uploading..."
                  : isLoadingCategories
                    ? "Loading..."
                    : product
                      ? "Updating..."
                      : "Saving..."}
              </>
            ) : (
              <>
                <span className="whitespace-nowrap">{product ? "Update Product" : "Create Product"}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
