import { DefaultFilter } from "./default";

export type BrandFilter = DefaultFilter & {
  name?: string;
  is_main?: boolean;
};
