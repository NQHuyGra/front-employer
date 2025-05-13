export type ApiResponse<T> = {
    status: number
    message: string
    result: T
}

export type Meta = {
    currentPage: number
    totalPages: number
    totalItems: number
    hasNext: boolean
    hasPrevious: boolean
}