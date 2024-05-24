import React, { useEffect, useState } from "react";

function DocumentArchive({ data }) {
    const [fileSize, setFileSize] = useState(null);

    useEffect(() => {
        const fetchFileSize = async () => {
            try {
                const response = await fetch(data.documentourl, { method: 'HEAD' });
                const contentLength = response.headers.get('Content-Length');
                if (contentLength) {
                    setFileSize(Number(contentLength));
                }
            } catch (error) {
                console.error("Error fetching file size:", error);
            }
        };

        fetchFileSize();
    }, [data.documentourl]);

    const formatBytes = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileNameFromUrl = (url) => {
        return url.split('/').pop();
    };

    return (
        <div className="document-archive">
            <div className="archive-info">
                <p><strong>Nombre: </strong>{data.titulo}</p>
                <p><strong>Tipo: </strong>{data.formato}</p>
                <p><strong>Nombre del archivo: </strong>{getFileNameFromUrl(data.documentourl)}</p>
                {fileSize !== null && <p><strong>Tamaño: </strong>{formatBytes(fileSize)}</p>}
            </div>
            <div className="archive-input">
                <a href={data.documentourl} download={getFileNameFromUrl(data.documentourl)}>
                    <img src="/download.png" alt="Download" />
                </a>
            </div>
        </div>
    );
}

export default DocumentArchive;
