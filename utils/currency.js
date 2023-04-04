import { FormattedNumber } from "react-intl";

export const rupiah = (number) => {
  // return new Intl.NumberFormat("id-ID", {
  //   style: "currency",
  //   currency: "IDR",
  // }).format(number);
  return <FormattedNumber value={number} style="currency" currency="IDR" />;
};
