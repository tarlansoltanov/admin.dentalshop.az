import { Default } from "./default";

export type Brand = Default & {
  name: string;
  photo: string;
  is_main: boolean;
};
