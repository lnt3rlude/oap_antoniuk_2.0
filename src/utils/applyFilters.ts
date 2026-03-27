export type Filters = Record<string, string | number | boolean | undefined>;

export function applyFilters<T>(data: T[], filters: Filters): T[] {
  return data.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        return true;
      }

      const itemValue = (item as any)[key];

      return itemValue === value;
    });
  });
}