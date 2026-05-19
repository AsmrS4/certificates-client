export interface CertificateOrder {
    id: number;
    student_id: number;
    application_status: string;
    certificate_type: string;
    obtain_method: string;
    rejection_reason: string;
    created_at: string;
}

export interface Certificates {
    data: CertificateOrder[];
    pagination: Pagination;
}

export interface Pagination {
    limit: number;
    offset: number;
    total: number;
}

export interface Params {
    limit: number;
    offset: number;
    status: string;
    type: string;
    user_id: number;
}
