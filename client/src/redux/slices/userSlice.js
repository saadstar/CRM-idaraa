import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../utils/customBaseQuery";


export const userSlice = createApi({
  reducerPath: "loginApi",
  baseQuery: customBaseQuery,
  tagTypes: ["user", "notice"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "/user/login",
        credentials: "include",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    register: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "/user/register",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),
    getTeam: builder.query({
      query: () => ({
        method: "GET",
        url: "/user/get-team",
        credentials: "include",
      }),
      providesTags: ["user"],
    }),
    updateTeam: builder.mutation({
      query: (data) => ({
        method: "PUT",
        url: `/user/profile`,
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    deleteTeam: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/user/${id}`,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),
    notification: builder.query({
      query: () => ({
        method: "GET",
        url: "/user/notifications",
        credentials: "include",
      }),
      providesTags: ["notice"],
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        method: "PUT",
        url: `/user/change-password`,
        body,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),
    markNotiAsRead: builder.mutation({
      query: (body) => ({
        method: "PUT",
        url: `/user/read-noti?isReadType=${body?.type}&id=${body?.id}`,
        body,
        credentials: "include",
      }),
      invalidatesTags: ["notice"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetTeamQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useNotificationQuery,
  useChangePasswordMutation,
  useMarkNotiAsReadMutation,
} = userSlice;
