export interface PaginationParams {
  page?: number;
  pageSize?: number;
  skip?: number;
  take?: number;
}

export function paginate<T>(data: T[], params: PaginationParams) {
  let { page, pageSize, skip, take } = params;

  // якщо page/pageSize → конвертуємо в skip/take
  if (page !== undefined && pageSize !== undefined) {
    skip = (page - 1) * pageSize;
    take = pageSize;
  }

  // дефолти
  skip = skip ?? 0;
  take = take ?? data.length;

  const total = data.length;

  const paginatedData = data.slice(skip, skip + take);

  return {
    data: paginatedData,
    total,
    page: page ?? null,
    pageSize: pageSize ?? null,
    skip,
    take
  };
}