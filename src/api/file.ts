import type { UploadedFile, UploadFileOptions } from '@/models/file';
import axios from 'axios';

export const uploadFile = async ({
    pluginId,
    file,
    fileType = 'document',
    onProgress,
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

    await axios({
        method: init.upload_method,
        url: init.upload_url,
        headers: init.upload_headers,
        data: file,
        onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total,
                );
                onProgress(percentCompleted);
            }
        },
    });

    const completeRes = await axios.post<UploadedFile>(
        `/api/files/${init.file_id}/complete`,
        {},
        {
            withCredentials: true,
        },
    );
    const res = await axios.post(
        `/api/triggers/http/certificates/import`,
        {
            fileIds: [completeRes.data.id],
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        },
    );
    console.log(res);
    return completeRes.data;
};
