import React from "react";
import NavigationBar from "../partials/navigation-bar";
import DocumentVisualizer from "../partials/document-visualizer";
function DocumentPage(props) {
    const { docData, userData } = props;

    return (
        <div className="document-page">
            <DocumentVisualizer data={docData}></DocumentVisualizer>
            <NavigationBar></NavigationBar>
        </div>
    )
}
export default DocumentPage;