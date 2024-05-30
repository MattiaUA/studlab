import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import NavigationBar from "../partials/navigation-bar";
import DocumentVisualizer from "../partials/document-visualizer";
import { Preferences } from '@capacitor/preferences';

function DocumentPage({docData,selfData}) {

    const [docs, setDocs] = useState(docData);
    const { id } = useParams();
    const [doc, setDoc] = useState("");

    useEffect(() => {
        const loadDocumentData = async () => {
          const { value } = await Preferences.get({ key: 'DocumentData' });
          if (value) {
            setDocs(JSON.parse(value));
            console.log("DOCS",docs)
            const tmpDoc = docs.documentos.find(doc => doc.id.toString() === id.toString());
            console.log("DOC",tmpDoc)
            setDoc(tmpDoc);
          }
        };
        loadDocumentData();
    },[docData]);

    if (!doc) {
        return <div>No se encontró el documento.</div>;
    }

    return (
        <div className="document-page">
            { doc && <DocumentVisualizer data={doc} selfData={selfData}/>}
            <NavigationBar />
        </div>
    );
}

export default DocumentPage;
