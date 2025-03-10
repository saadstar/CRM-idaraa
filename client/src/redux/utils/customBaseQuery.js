import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const customBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8800/api/",
  prepareHeaders: (headers, { getState }) => {
    // Retrieve the token from Redux state
    const user = getState().auth.user?.data;
    const token =
      user?.token || JSON.parse(localStorage.getItem("userInfo"))?.data?.token; // Fallback to local storage
    
    if (token) {
      headers.set("Authorization", ` Bearer ${token}`);
    }
    return headers;
  },
});

export default customBaseQuery;
