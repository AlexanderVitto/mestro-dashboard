import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, headers }) => {
    console.log("prepareHeaders", headers);
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const hospitalsApiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: "",

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      console.log("token", token);

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Auth", "Hospital", "Articles", "Ambulances"],
  endpoints: (builder) => ({
    getToken: builder.mutation({
      query: (credential) => ({
        url: "https://mestroapp.com/mestro/auth",
        method: "POST",
        data: credential,
        headers: {
          "content-type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      }),
      transformResponse: (response, meta, arg) => response.data.token,
      transformErrorResponse: (response, meta, arg) => {
        return response;
      },
      invalidatesTags: ["Auth"],
    }),
    getHospitals: builder.query({
      query: (hospital) => ({
        url: "https://mestroapp.com/mestro/hospitals",
        method: "GET",
        params: {
          latitude: hospital.latitude,
          longitude: hospital.longitude,
          window: hospital.window,
          status: hospital.status,
        },
      }),
      // query: (hospital) =>
      //   `/hospitals?latitude=${hospital.latitude}&longitude=${hospital.longitude}&window=${hospital.window}&status=${hospital.status}`,
      transformResponse: (response, meta, arg) => response.data.hospitals,
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: ["Hospital"],
      keepUnusedDataFor: 1,
    }),
    getArticles: builder.query({
      query: (page) => ({
        url: "https://mestroapp.com/mestro/articles",
        method: "GET",
        params: {
          page: page,
        },
      }),
      // query: (page) => `/articles?page=${page}`,
      transformResponse: (response, meta, arg) => response.data.articles,
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: (result, error, articles) => {
        return [{ type: "Articles", articles }];
      },
      keepUnusedDataFor: 1,
    }),
    getAmbulances: builder.query({
      query: (position) => ({
        url: "https://mestroapp.com/mestro/ambulances",
        method: "GET",
        params: {
          latitude: position.latitude,
          longitude: position.longitude,
        },
      }),
      // query: (position) =>
      //   `/ambulances?latitude=${position.latitude}&longitude=${position.longitude}`,
      transformResponse: (response, meta, arg) => response.data.ambulances,
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: (result, error, ambulances) => {
        return [{ type: "Ambulances", ambulances }];
      },
      keepUnusedDataFor: 1,
    }),
    addNewHospital: builder.mutation({
      query: (data) => ({
        url: "https://mestroapp.com/mestro/hospitals",
        method: "PUT",
        data: data.payload,
        headers: {
          "content-type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          authorization: `Bearer ${data.token}`,
        },
      }),
      transformErrorResponse: (response, meta, arg) => {
        return response;
      },
      invalidatesTags: ["Hospital"],
    }),
    addNewArticle: builder.mutation({
      query: (data) => ({
        url: "https://mestroapp.com/mestro/articles",
        method: "PUT",
        data: data.payload,
        headers: {
          "content-type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          authorization: `Bearer ${data.token}`,
        },
        invalidatesTags: ["Articles"],
      }),
    }),
    addNewAmbulance: builder.mutation({
      query: (data) => ({
        url: "https://mestroapp.com/mestro/ambulances",
        method: "PUT",
        data: data.payload,
        headers: {
          "content-type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          authorization: `Bearer ${data.token}`,
        },
        invalidatesTags: ["Ambulances"],
      }),
    }),
    updateNewHospital: builder.mutation({
      query: (data) => ({
        url: `https://mestroapp.com/mestro/hospital/${data.id}`,
        method: "PATCH",
        data: data.payload,
        headers: {
          "content-type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          authorization: `Bearer ${data.token}`,
        },
      }),
      transformErrorResponse: (response, meta, arg) => {
        return response;
      },
      invalidatesTags: ["Hospital"],
    }),
    updateNewArticle: builder.mutation({
      query: (data) => ({
        url: `https://mestroapp.com/mestro/article/${data.id}`,
        method: "PATCH",
        data: data.payload,
        headers: {
          "content-type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          authorization: `Bearer ${data.token}`,
        },
        transformErrorResponse: (response, meta, arg) => {
          return response;
        },
        invalidatesTags: ["Articles"],
      }),
    }),
    updateNewAmbulance: builder.mutation({
      query: (data) => ({
        url: `https://mestroapp.com/mestro/ambulance/${data.id}`,
        method: "PATCH",
        data: data.payload,
        headers: {
          "content-type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          authorization: `Bearer ${data.token}`,
        },
        transformErrorResponse: (response, meta, arg) => {
          return response;
        },
        invalidatesTags: ["Ambulances"],
      }),
    }),
    deleteHospitalById: builder.mutation({
      query: (data) => ({
        url: `https://mestroapp.com/mestro/hospital/${data.id}`,
        method: "DELETE",
        headers: {
          "content-type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          authorization: `Bearer ${data.token}`,
        },
        invalidatesTags: ["Hospital"],
      }),
    }),
    deleteArticleById: builder.mutation({
      query: (data) => ({
        url: `https://mestroapp.com/mestro/article/${data.id}`,
        method: "DELETE",
        headers: {
          "content-type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          authorization: `Bearer ${data.token}`,
        },
        invalidatesTags: ["Articles"],
      }),
    }),
    deleteAmbulanceById: builder.mutation({
      query: (data) => ({
        url: `https://mestroapp.com/mestro/ambulance/${data.id}`,
        method: "DELETE",
        headers: {
          "content-type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          authorization: `Bearer ${data.token}`,
        },
        invalidatesTags: ["Ambulances"],
      }),
    }),
  }),
});

export const {
  useGetTokenMutation,
  useGetHospitalsQuery,
  useGetArticlesQuery,
  useGetAmbulancesQuery,
  useAddNewHospitalMutation,
  useAddNewArticleMutation,
  useAddNewAmbulanceMutation,
  useUpdateNewHospitalMutation,
  useUpdateNewArticleMutation,
  useUpdateNewAmbulanceMutation,
  useDeleteHospitalByIdMutation,
  useDeleteArticleByIdMutation,
  useDeleteAmbulanceByIdMutation,
} = hospitalsApiSlice;
