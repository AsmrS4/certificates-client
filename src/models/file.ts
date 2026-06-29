export interface UploadFileOptions {
    orderId: number;
    pluginId: string;
    file: File;
    fileType?: string; // 'document', 'avatar', 'photo', 'video', 'audio'
}

export interface UploadedFile {
    id: string;
    name: string;
    mimeType: string;
    size: number;
    fileType: string;
}
