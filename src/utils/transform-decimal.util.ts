export function transformToDecimal(value: string): string {
  if (!value) return value;

  console.log(value.replace(/\./g, '').replace(',', '.'));

  return value.replace(/\./g, '').replace(',', '.');
}
