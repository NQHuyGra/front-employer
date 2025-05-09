export type ApiResponse<T> = {
    status: number
    message: string
    result: T
}

export type ApiResponseWithMeta<T> = ApiResponse<T> & {
    meta: Meta
}

export type Meta = {
    currentPage: number
    pageSize: number
    totalPages: number
    totalItems: number
}