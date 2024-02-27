import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { UpdateArgs } from "@/types/store";
import { BrandFilter } from "@/types/filters";

// API
import * as API from "@/api/brand";

export const getBrands = createAsyncThunk("brand/get", async (filter: BrandFilter, thunkAPI) => {
  try {
    const response = await API.getBrands(filter);
    return response;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});

export const createBrand = createAsyncThunk("brand/create", async (data: FormData, thunkAPI) => {
  try {
    const response = await API.createBrand(data);
    return response;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});

export const updateBrand = createAsyncThunk(
  "brand/update",
  async ({ slug, data }: UpdateArgs, thunkAPI) => {
    try {
      const response = await API.updateBrand(slug, data);
      return { response, slug };
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const deleteBrand = createAsyncThunk("brand/delete", async (slug: string, thunkAPI) => {
  try {
    await API.deleteBrand(slug);
    return slug;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});
