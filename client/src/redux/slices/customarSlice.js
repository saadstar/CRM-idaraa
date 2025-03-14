import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../utils/customBaseQuery";

export const customarSlice = createApi({
  reducerPath: "customarSlice",
  baseQuery: customBaseQuery,
  tagTypes: ["customar"],
  endpoints: (builder) => ({
    createCustomar: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "/customar/create",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["customar"],
    }),
    updateCustomar: builder.mutation({
      query: (body) => ({
        method: "PUT",
        url: `/customar/update/${body?._id}`,
        body,
        credentials: "include",
      }),
      invalidatesTags: ["customar"],
    }),
    trashCustomar: builder.mutation({
      query: (body) => ({
        method: "PUT",
        url: `/${body.url}/${body.id}`,
        body,
        credentials: "include",
      }),
      invalidatesTags: ["customar"],
    }),
    getAllCustomars: builder.query({
      query: ({ person, isTrashed }) => ({
        method: "GET",
        url: `/customar?person=${person}&isTrashed=${isTrashed}`,
        credentials: "include",
      }),
      providesTags: ["customar"],
    }),
  }),
});

export const { 
  useCreateCustomarMutation,
  useUpdateCustomarMutation,
  useTrashCustomarMutation,
  useGetAllCustomarsQuery
} = customarSlice;
