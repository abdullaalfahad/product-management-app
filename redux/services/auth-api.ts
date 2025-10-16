import { createApi } from "@reduxjs/toolkit/query/react";
import { setToken, logout } from "../slices/auth-slice";
import api from "@/lib/axios";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: async ({ url, method, body }: any) => {
    try {
      const result = await api({ url, method, data: body });
      console.log(result);
      return { data: result.data };
    } catch (err: any) {
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  },
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, { email: string }>({
      query: (body) => ({ url: "/auth", method: "POST", body }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data.token));
        } catch {
          dispatch(logout());
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
