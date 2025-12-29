import { isEmpty } from ".";

export const notEmpty = <T>(
  value:
    | T
    | null
    | undefined
    | void
    | ""
    | never
    | never[]
    | { [key: string]: never }
): value is T => {
  return !isEmpty(value);
};
