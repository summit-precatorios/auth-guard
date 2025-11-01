export function transformToDecimal(value: string): string {
  if (!value) return value

  return value.replace(/\./g, '').replace(',', '.')
}
