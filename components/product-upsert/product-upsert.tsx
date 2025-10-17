"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Package, ArrowLeft } from "lucide-react";
import { ImageUpload } from "./image-upload";
import { ProductForm } from "./product-form";
import { Product } from "@/types/product";
import { BackToProducts } from "./back-to-products";

interface ProductUpsertProps {
  product?: Product;
}

export function ProductUpsert({ product }: ProductUpsertProps) {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(
    product?.images?.[0] || null
  );
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(
    product?.images?.[0] || null
  );

  const uploadToImageKit = async (file: File): Promise<string> => {
    setIsUploading(true);
    try {
      const authResponse = await axios.get("/api/imagekit-auth", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const { token, expire, signature } = authResponse.data;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      formData.append(
        "publicKey",
        process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string
      );
      formData.append("signature", signature);
      formData.append("expire", expire.toString());
      formData.append("token", token);

      const response = await axios.post(
        "https://upload.imagekit.io/api/v1/files/upload",
        formData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      setIsUploading(false);

      if (response.data.url) {
        return response.data.url;
      }
      throw new Error("Upload failed");
    } catch (error) {
      setIsUploading(false);
      toast.error("Failed to upload image");
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <BackToProducts />

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {product ? "Edit Product" : "Create New Product"}
              </h1>
              <p className="text-sm text-gray-600 mt-0.5">
                {product
                  ? "Update product information"
                  : "Add a new product to your inventory"}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <ImageUpload
            preview={preview}
            setPreview={setPreview}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            isUploading={isUploading}
            uploadToImageKit={uploadToImageKit}
          />
          <ProductForm
            product={product}
            imageUrl={imageUrl}
            isUploading={isUploading}
          />
        </div>
      </div>
    </div>
  );
}
