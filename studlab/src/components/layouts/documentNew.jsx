import React, { useState, useEffect } from "react";
import NavigationBar from "../partials/navigation-bar";
import DocumentRegister from "../partials/document-register";
import DocumentData from '../../exampledata/Documents.json'

function NewDocumentPage(props) {
    const { userData,documentData } = props;

    return (
        <div className="document-page">
            <DocumentRegister userData={userData} documentData={documentData} />
            <NavigationBar />
        </div>
    );
}

export default NewDocumentPage;
