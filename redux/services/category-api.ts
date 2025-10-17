import { createApi } from "@reduxjs/toolkit/query/react";
import api from "@/lib/axios";
import { Category } from "@/types/product";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
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
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "https://api.bitechx.com/categories",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
