export function chunkArray(array: any, chunkSize: any) {
  if (!array) return [];
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}
