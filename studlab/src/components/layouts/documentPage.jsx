import React from "react";
import NavigationBar from "../partials/navigation-bar";
import DocumentVisualizer from "../partials/document-visualizer";
function DocumentPage(docData) {
    console.log(docData.data);

    return (
        <div className="document-page">
            <DocumentVisualizer data={docData.data}></DocumentVisualizer>
            <NavigationBar></NavigationBar>
        </div>
    )
}
export default DocumentPage;