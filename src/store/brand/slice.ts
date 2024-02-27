import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { Brand } from "@/types";
import { Status } from "@/types/store";

// Actions
import { getBrands, createBrand, updateBrand, deleteBrand } from "./actions";

interface StateProps {
  status: Status;
  update: boolean;
  errors: any;
  items: Brand[] | null;
  count: number;
}

const initialState: StateProps = {
  status: {
    loading: false,
    success: false,
    failure: false,
    lastAction: null,
  },
  update: false,
  errors: null,
  items: null,
  count: 0,
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    resetState: (state) => {
      state.status = { ...initialState.status };
      state.update = initialState.update;
      state.errors = initialState.errors;
      state.items = initialState.items;
      state.count = initialState.count;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.status = { ...LOADING, lastAction: getBrands.typePrefix };
        state.errors = null;
      })
      .addCase(getBrands.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getBrands.typePrefix };
        state.items = payload.results;
        state.count = payload.count;
        state.update = false;
      })
      .addCase(getBrands.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getBrands.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(createBrand.pending, (state) => {
        state.status = { ...LOADING, lastAction: createBrand.typePrefix };
        state.errors = null;
      })
      .addCase(createBrand.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: createBrand.typePrefix };
        state.update = true;
      })
      .addCase(createBrand.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: createBrand.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(updateBrand.pending, (state) => {
        state.status = { ...LOADING, lastAction: updateBrand.typePrefix };
        state.errors = null;
      })
      .addCase(updateBrand.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: updateBrand.typePrefix };
        state.update = true;
      })
      .addCase(updateBrand.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: updateBrand.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(deleteBrand.pending, (state) => {
        state.status = { ...LOADING, lastAction: deleteBrand.typePrefix };
        state.errors = null;
      })
      .addCase(deleteBrand.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: deleteBrand.typePrefix };
        state.update = true;
      })
      .addCase(deleteBrand.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: deleteBrand.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = brandSlice.actions;

export default brandSlice.reducer;
