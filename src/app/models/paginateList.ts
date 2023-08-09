export interface PaginationLinks {
    first: string;
    last: string;
    prev: string;
    next: string;
}

export interface PaginationMeta {
    current_page: number;
    from: number;
    path: string;
    per_page: number;
    to: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    links: PaginationLinks;
    meta: PaginationMeta;
}
