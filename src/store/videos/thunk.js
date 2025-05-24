import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllVideo, getVideo, uploadVideo } from "../../helpers/backend_helper";

export const uploadVideoThunk = createAsyncThunk(
  "uploadVideoThunk",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await uploadVideo(values);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;

      // Reject with error response
      return rejectWithValue({
        status: error.response.status,
        message: errorMessage,
      });
    }
  }
);

export const getAllVideoThunk = createAsyncThunk(
  "getAllVideoThunk",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await getAllVideo(values);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;

      // Reject with error response
      return rejectWithValue({
        status: error.response.status,
        message: errorMessage,
      });
    }
  }
);

export const getVideoThunk = createAsyncThunk(
  "getVideoThunk",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await getVideo(values);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;

      // Reject with error response
      return rejectWithValue({
        status: error.response.status,
        message: errorMessage,
      });
    }
  }
);
