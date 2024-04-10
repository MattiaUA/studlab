import React, { useState } from "react";


import DocumentArchive from "./document-archive";
import DocumentInfo from "./document-info";
import DocumentReelComments from "./document-reelcomments";


function DocumentVisualizer({ data }) {
    const [selectedNavItem, setSelectedNavItem] = useState("info");

    const handleNavClick = (navItem) => {
        setSelectedNavItem(navItem);
    };
    return (
        <div className="document-visualizer">
            <div></div>
            <ul className="document-nav">
                <li>
                    <button onClick={() => handleNavClick("comments")} className={selectedNavItem === "comments"?"active-document-nav":""}>Comentarios{"(" + Object.keys(data.comentarios).length + ")"}</button>
                </li>
                <li>
                    <button onClick={() => handleNavClick("archive")} className={selectedNavItem === "archive"?"active-document-nav":""}>Archivos{"(1)"}</button>
                </li>
                <li>
                    <button onClick={() => handleNavClick("info")} className={selectedNavItem === "info"?"active-document-nav":""}>Información</button>
                </li>
            </ul>
            <div className="document-visualizer-carrousel">
                {selectedNavItem === "comments" && <DocumentReelComments data={data} />}
                {selectedNavItem === "archive" && <DocumentArchive data={data} />}
                {selectedNavItem === "info" && <DocumentInfo data={data} />}
            </div>
        </div>
    )

}
export default DocumentVisualizer;