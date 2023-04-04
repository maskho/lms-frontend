import { FormattedNumber } from "react-intl";

export const rupiah = (number) => {
  return <FormattedNumber value={number} style="currency" currency="IDR" />;
};
