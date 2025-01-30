type CalculatePaginationProps = {
  page: number
  limit: number
}

export function calculatePagination({ page, limit }: CalculatePaginationProps) {
  return {
    skip: (page - 1) * limit,
  }
}
