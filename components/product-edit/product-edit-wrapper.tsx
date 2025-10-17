"use client";

import { useParams } from "next/navigation";
import { useGetProductByIdQuery } from "@/redux/services/product-api";
import { ProductUpsert } from "../product-upsert/product-upsert";

export function ProductEditWrapper() {
  const { slug } = useParams<{ slug: string }>();

  const { data } = useGetProductByIdQuery(slug);

  return <ProductUpsert product={data} />;
}
