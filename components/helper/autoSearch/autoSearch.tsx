export function autoSearch<T>(data: T[], search: string): T[] {
  const normalizedSearchTerm = search.toLowerCase();

  if (!data || data.length === 0) return [];

  return data.filter((item: any) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(normalizedSearchTerm)
    )
  );
}
