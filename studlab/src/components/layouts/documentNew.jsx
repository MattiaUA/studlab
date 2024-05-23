import React, { useState, useEffect } from "react";
import NavigationBar from "../partials/navigation-bar";
import DocumentRegister from "../partials/document-register";

function NewDocumentPage({ userData }) {
    const [documentData, setDocumentData] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem("documentos");
        if (storedData) {
            setDocumentData(JSON.parse(storedData));
        } else {
            setDocumentData(require('../../exampledata/Documents.json'));
        }
    }, []);

    return (
        <div className="document-page">
            {documentData && <DocumentRegister userData={userData} documentData={documentData} setDocumentData={setDocumentData} />}
            <NavigationBar />
        </div>
    );
}

export default NewDocumentPage;
