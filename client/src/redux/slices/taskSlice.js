import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../utils/customBaseQuery";

export const taskSlice = createApi({
  reducerPath: "taskSlice",
  baseQuery: customBaseQuery,
  tagTypes: ["task"],
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "/task/create",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["task"],
    }),
    duplicateTask: builder.mutation({
      query: ({ id }) => ({
        method: "POST",
        url: `/task/duplicate/${id}`,
        body: {},
        credentials: "include",
      }),
      invalidatesTags: ["task"],
    }),
    updateTask: builder.mutation({
      query: (body) => ({
        method: "PUT",
        url: `/task/update/${body?._id}`,
        body,
        credentials: "include",
      }),
      invalidatesTags: ["task"],
    }),
    trashTask: builder.mutation({
      query: (body) => ({
        method: "PUT",
        url: `/task/${body.id}`,
        body,
        credentials: "include",
      }),
      invalidatesTags: ["task"],
    }),
    getDashboardStats: builder.query({
      query: () => ({
        method: "GET",
        url: "/task/dashboard",
        credentials: "include",
      }),
      providesTags: ["task"],
    }),
    getAllTasks: builder.query({
      query: ({ strQuery, isTrashed, search }) => ({
        method: "GET",
        url: `/task?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
        credentials: "include",
      }),
      providesTags: ["task"],
    }),
    createSubTask: builder.mutation({
      query: ({ data, id,url }) => ({
        method: "PUT",
        url: `/${url}/create-subtask/${id}`,
        body:data,
        credentials: "include",
      }),
      invalidatesTags: ["task",'bulding'],
    }),
    getSingleTask: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/task/${id}`,
        credentials: "include",
      }),
      providesTags: ["task"],
    }),
    postTaskActivity: builder.mutation({
      query: ({ body, id }) => ({
        method: "POST",
        url: `/task/activity/${id}`,
        body,
        credentials: "include",
      }),
      invalidatesTags: ["task"],
    }),
    deleteRestoreTask: builder.mutation({
      query: ({ actionType, id }) => ({
        method: "DELETE",
        url: `/task/delete-restore/${id}?actionType=${actionType}`,        
        credentials: "include",
      }),
      invalidatesTags: ["task"],
    }),
  }),
});

export const { useGetDashboardStatsQuery, useGetAllTasksQuery, useCreateTaskMutation,
  useDuplicateTaskMutation, useUpdateTaskMutation
    , useTrashTaskMutation,
  useCreateSubTaskMutation, useGetSingleTaskQuery,
  usePostTaskActivityMutation,
    useDeleteRestoreTaskMutation
} = taskSlice;
