import Preview from './preview';
import parsePrev from '../../hooks/parsePrev'
import { useState, useEffect } from 'react';

export default function RelevantFiles(props) {
    const [selectedNavItem, setSelectedNavItem] = useState("todos");
    const [docsRaw,setDocuments] = useState({});
    const [docsRender,setRenders] = useState({});

    useEffect(() => {
        async function fetchDocuments() {
            try {
                const response = await fetch('https://studlab.marcosruizrubio.com/documento');
                if (!response.ok) {
                    throw new Error('Error al recuperar los documentos');
                }
                const data = await response.json();
                setDocuments(data);
                setRenders(data);
            } catch (error) {
                setError(error.message);
            } 
        }
        fetchDocuments();
    }, []);

    return (
        <div className='relevan-files-container'>
            <div className='previews'>
                {Array.isArray(docsRender) && docsRender.map((prev, index) => (
                    <Preview key={index} data={prev} />
                ))}
            </div>
        </div>
    );

}