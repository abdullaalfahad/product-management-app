"use client";

import { useParams } from "next/navigation";
import { useGetProductByIdQuery } from "@/redux/services/product-api";
import { ProductNotFound } from "../product-details/empty-state";
import ProductUpsertSkeleton from "../product-upsert/loading-skeleton";
import { ProductUpsert } from "../product-upsert/product-upsert";

export function ProductEditWrapper() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error } = useGetProductByIdQuery(slug);

  if (isLoading) {
    return <ProductUpsertSkeleton />;
  }

  if (!data || error) return <ProductNotFound />;

  return <ProductUpsert product={data} />;
}
