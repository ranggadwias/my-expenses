export const formatRupiah = (amount) => {
  if (typeof amount !== "number" || isNaN(amount)) {
    return "Rp 0";
  }
  return `Rp ${amount.toLocaleString("id-ID")}`;
};
