import axios from "@/api";

// Helpers
import { getUrlWithFilter } from "@/helpers";

// Types
import { Brand } from "@/types";
import { BrandFilter } from "@/types/filters";
import { PaginationResult } from "@/types/result";

// URLs
import * as URL from "./urls";

export const getBrands = async (filter: BrandFilter): Promise<PaginationResult<Brand>> => {
  const { data } = await axios.get(getUrlWithFilter(URL.BRAND_LIST_URL, filter));
  return data;
};

export const createBrand = async (brand: FormData): Promise<Brand> => {
  const { data } = await axios.post(URL.BRAND_LIST_URL, brand);
  return data;
};

export const updateBrand = async (slug: string, brand: FormData): Promise<Brand> => {
  const { data } = await axios.put(URL.BRAND_DETAIL_URL(slug), brand);
  return data;
};

export const deleteBrand = async (slug: string): Promise<void> => {
  await axios.delete(URL.BRAND_DETAIL_URL(slug));
};
