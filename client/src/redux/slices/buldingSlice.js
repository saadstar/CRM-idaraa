import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../utils/customBaseQuery";

export const buldingSlice = createApi({
  reducerPath: "buldingSlice",
  baseQuery: customBaseQuery,
  tagTypes: ["bulding"],
  endpoints: (builder) => ({
    createBulding: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "/bulding/create",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["bulding"],
    }),
    addPriceOffer: builder.mutation({
      query: ({ id, formData }) => {
        console.log({ id, formData });
        return({
        method: "PUT",
        url: `/bulding/update-price-offer/${id}`,
        body:formData,
        credentials: "include",
      })},
      invalidatesTags: ["bulding"],
    }),
    updateBulding: builder.mutation({
      query: (body) => ({
        method: "PUT",
        url: `/bulding/update/${body?._id}`,
        body,
        credentials: "include",
      }),
      invalidatesTags: ["bulding"],
    }),
    trashBulding: builder.mutation({
      query: (body) => ({
        method: "PUT",
        url: `/${body.url}/${body.id}`,
        body,
        credentials: "include",
      }),
      invalidatesTags: ["bulding"],
    }),
    getClients: builder.query({
      query: () => ({
        method: "GET",
        url: `/bulding/clients`,
        credentials: "include",
      }),
      providesTags: ["bulding"],
    }),   
    getAllBuldings: builder.query({
      query: ({ documnetNum, isTrashed }) => ({
        method: "GET",
        url: `/bulding?documnetNum=${documnetNum}&isTrashed=${isTrashed}`,
        credentials: "include",
      }),
      providesTags: ["bulding"],
    }),   
    getSingleBulding: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/bulding/${id}`,
        credentials: "include",
      }),
      providesTags: ["bulding"],
    }),
    postBuldingActivity: builder.mutation({
      query: ({ body, id }) => ({
        method: "POST",
        url: `/bulding/activity/${id}`,
        body,
        credentials: "include",
      }),
      invalidatesTags: ["bulding"],
    }),
  }),
});

export const { 
    useCreateBuldingMutation,
    useUpdateBuldingMutation,
    useAddPriceOfferMutation,
    useTrashBuldingMutation,
    useGetAllBuldingsQuery,
    useGetSingleBuldingQuery,
    usePostBuldingActivityMutation,
    useGetClientsQuery
} = buldingSlice;
