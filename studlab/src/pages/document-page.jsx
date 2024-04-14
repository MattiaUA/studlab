import React from "react";
import DocumentVisualizer from "../components/document-visualizer";
import NavigationBar from "../components/navigation-bar";

function DocumentPage({data}){
    return(
        <div>
            <DocumentVisualizer data={data}></DocumentVisualizer>
            <NavigationBar></NavigationBar>
        </div>
    )
}
export default DocumentPage;