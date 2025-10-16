import { createApi } from "@reduxjs/toolkit/query/react";
import api from "@/lib/axios";
import type { Product } from "@/types/product";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: async ({ url, method = "GET", body, params }: any) => {
    try {
      const result = await api({ url, method, data: body, params });
      return { data: result.data };
    } catch (err: any) {
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  },
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], { offset?: number; limit?: number }>({
      query: ({ offset = 0, limit = 10 }) => ({
        url: `/products?offset=${offset}&limit=${limit}`,
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
