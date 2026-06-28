export interface CertificateAttachment {
    id: number;
    file_id: string;
    file_name: string;
    mime_type: string;
    file_type: string;
    file_url?: string;
    uploaded_at: string;
}

export interface CertificateFile {
    id: number;
    file_id: string;
    file_name: string;
    storage_url: string;
    uploaded_at: string;
}

export interface CertificateDetails {
    id: number;
    student_id: number;
    application_status: string;
    certificate_type: string;
    obtain_method: string;
    comment?: string;
    rejection_reason?: string;
    created_at: string;
    form_data?: Record<string, unknown>;
    full_name: string;
    nationality_type: 'domestic' | 'foreign';
    faculty_name: string;
    group_code: string;
    funding_type: 'contract' | 'budget';
    education_form: 'full_time' | 'part_time' | 'remote';
    stream_name: string;
    position_status: 'active' | 'suspended' | 'ended' | string;
    attachments?: CertificateAttachment[];
    certificate_file?: CertificateFile | null;
}

export interface CertificateOrder {
    id: number;
    student_id: number;
    status: 'Pending' | 'Rejected' | 'Cancelled' | 'Prepare' | 'Done' | string;
    type: string;
    obtain_method: 'Paper' | 'Electronic';
    created_at: string;
    full_name: string;
    nationality_type: 'domestic' | 'foreign';
    faculty_name: string;
    group_code: string;
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
    nationality_type?: 'domestic' | 'foreign';
    faculty_name?: string;
    group_code?: string;
    full_name: string;
    user_id: number | null;
}
