import { createApi } from "@reduxjs/toolkit/query/react";
import api from "@/lib/axios";
import type { Product } from "@/types/product";

interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: async ({ url, method = "GET", body, params }: any) => {
    try {
      const result = await api({ url, method, data: body, params });
      return { data: result.data };
    } catch (err: any) {
      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || err.message,
        },
      };
    }
  },
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], PaginationParams>({
      query: ({ page = 1, limit = 5, search }) => {
        const offset = (page - 1) * limit;
        const url = search
          ? `/products/search?searchedText=${search}`
          : `/products?offset=${offset}&limit=${limit}`;
        return { url, method: "GET" };
      },
      providesTags: ["Products"],
    }),

    getProductById: builder.query<Product, string>({
      query: (id) => ({ url: `/products/${id}` }),
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} = productApi;
