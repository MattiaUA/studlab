import React from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "../partials/navigation-bar";
import DocumentVisualizer from "../partials/document-visualizer";

function DocumentPage({docData}) {

    const { id } = useParams();
    console.log(docData)
    const document = docData.documentos.find(doc => doc.id.toString() === id.toString());

    if (!document) {
        return <div>No se encontró el documento.</div>;
    }

    return (
        <div className="document-page">
            <DocumentVisualizer data={document} />
            <NavigationBar />
        </div>
    );
}

export default DocumentPage;
