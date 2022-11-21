export const formatPrice = (numero: number) => {
  const params = { maximumFractionDigits: 2, minimumFractionDigits: 2 };
  return new Intl.NumberFormat('pt', params).format(numero);
};
