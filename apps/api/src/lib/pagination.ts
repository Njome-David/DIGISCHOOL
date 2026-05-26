export function paginate(page = 1, pageSize = 20) {
  const limit = pageSize;
  const offset = (page - 1) * pageSize;
  return { limit, offset };
}

export function paginatedResponse<T>(data: T[], total: number, page: number, pageSize: number) {
  return {
    data,
    meta: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize) || 1,
    },
  };
}
