export interface UploadFileOptions {
    pluginId: string;
    file: File;
    fileType?: string; // 'document', 'avatar', 'photo', 'video', 'audio'
    onProgress?: (progress: number) => void;
}

export interface UploadedFile {
    id: string;
    name: string;
    mimeType: string;
    size: number;
    fileType: string;
}
