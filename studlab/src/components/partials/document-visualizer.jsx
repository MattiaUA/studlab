import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

import DocumentArchive from "./document-archive";
import DocumentInfo from "./document-info";
import DocumentReelComments from "./document-reelcomments";

function DocumentVisualizer({ data }) {

    const [selectedNavItem, setSelectedNavItem] = useState("info");

    const { ref: swipeHandler } = useSwipeable({
        onSwipedLeft: () => {
            if (selectedNavItem === "comments") setSelectedNavItem("archive");
            else if (selectedNavItem === "archive") setSelectedNavItem("info");
        },
        onSwipedRight: () => {
            if (selectedNavItem === "info") setSelectedNavItem("archive");
            else if (selectedNavItem === "archive") setSelectedNavItem("comments");
        }
    });

    useEffect(() => {
        swipeHandler(document);
        return () => swipeHandler({});
    }, [swipeHandler]);

    const handleNavClick = (navItem) => {
        setSelectedNavItem(navItem);
    };

    return (
        <div className="document-visualizer">
            <div className="visualizer">
                {data.formato === "mp4" && (
                    <iframe 
                        src={data.documentourl}
                        allow="autoplay"
                        frameBorder="0"
                        title="Video Preview"
                    ></iframe>
                )}
                {data.formato === "pdf" && (
                    <iframe 
                        src={data.documentourl}
                        frameBorder="0"
                        title="PDF Preview"
                    ></iframe>
                )}
                {(data.formato === "jpeg" || data.formato === "png") && (
                    <img 
                        src={data.documentourl}
                        alt="Image Preview"
                    />
                )}
            </div>
            <ul className="document-nav">
                <li>
                    <button onClick={() => handleNavClick("comments")} className={selectedNavItem === "comments" ? "active-document-nav" : ""}>
                        Comentarios{"(" + Object.keys(data.comentarios).length + ")"}
                    </button>
                </li>
                <li>
                    <button onClick={() => handleNavClick("archive")} className={selectedNavItem === "archive" ? "active-document-nav" : ""}>
                        Archivos{"(1)"}
                    </button>
                </li>
                <li>
                    <button onClick={() => handleNavClick("info")} className={selectedNavItem === "info" ? "active-document-nav" : ""}>
                        Información
                    </button>
                </li>
            </ul>
            <div className="document-visualizer-carrousel">
                {selectedNavItem === "comments" && <DocumentReelComments data={data} />}
                {selectedNavItem === "archive" && <DocumentArchive data={data} />}
                {selectedNavItem === "info" && <DocumentInfo data={data} />}
            </div>
        </div>
    );
}

export default DocumentVisualizer;
