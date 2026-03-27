export function applyFilters<T extends Record<string, any>>(
  records: T[],
  filters: Partial<T>
): T[] {
  return records.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === undefined) return true;
      return item[key] === value;
    });
  });
}