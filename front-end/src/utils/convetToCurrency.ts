export const convertToBrl = (number: number) => {
  const BRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return BRL.format(number)
}