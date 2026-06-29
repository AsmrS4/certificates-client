import type { UploadedFile, UploadFileOptions } from '@/models/file';
import axios from 'axios';

const BASE_URI = '/api/triggers/http/certificates_plugin/api/certificates';

export const uploadFile = async ({
    orderId,
    pluginId,
    file,
}: UploadFileOptions): Promise<UploadedFile> => {
    const getFileCategory = (file: File): string => {
        if (file.type.startsWith('image/')) return 'photo';
        if (
            file.type === 'application/pdf' ||
            file.type === 'application/msword' ||
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
            return 'document';
        }

        return 'document';
    };

    const initRes = await axios.post(
        `/api/files/init`,
        {
            plugin_id: pluginId,
            name: file.name,
            mime_type: file.type || 'application/octet-stream',
            size: file.size,
            file_type: getFileCategory(file),
        },
        { withCredentials: true },
    );

    const init = initRes.data;

    await axios(init.upload_url, {
        method: init.upload_method,
        headers: init.upload_headers,
        data: file,
    });

    const completeRes = await axios.post<UploadedFile>(
        `/api/files/${init.file_id}/complete`,
        {},
        {
            withCredentials: true,
        },
    );

    await axios.post(
        `${BASE_URI}/upload?id=${orderId}`,
        {
            file_id: completeRes.data.id,
            file_name: completeRes.data.name,
            file_type: completeRes.data.fileType,
            mime_type: completeRes.data.mimeType,
        },
        {
            withCredentials: true,
        },
    );

    return completeRes.data;
};
