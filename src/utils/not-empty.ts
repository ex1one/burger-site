import { isEmpty } from ".";

export const notEmpty = (value: unknown) => {
  return !isEmpty(value);
};
