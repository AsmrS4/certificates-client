import type { UploadedFile, UploadFileOptions } from '@/models/file';
import axios from 'axios';

export const uploadFile = async ({
    orderId,
    pluginId,
    file,
    fileType = 'document',
}: UploadFileOptions): Promise<UploadedFile> => {
    const initRes = await axios.post(
        `/api/files/init`,
        {
            plugin_id: pluginId,
            name: file.name,
            mime_type: file.type || 'application/octet-stream',
            size: file.size,
            file_type: fileType,
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
        `/api/triggers/http/certificates/api/certificates/upload?id=${orderId}`,
        {
            file_id: completeRes.data.id,
            file_name: completeRes.data.name,
        },
        {
            withCredentials: true,
        },
    );

    return completeRes.data;
};
