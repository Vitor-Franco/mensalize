export function getPrice(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function getValueFromBRL(value: string) {
  return Number(value.replace(',', '.').slice(3))
}
