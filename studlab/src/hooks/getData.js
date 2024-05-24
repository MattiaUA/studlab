import { useState, useEffect } from 'react';
import DocumentData from '../exampledata/Documents.json';

export function useDocumentData() {
  const [documentData, setDocumentData] = useState(null);

  useEffect(() => {
    const localStorageData = localStorage.getItem('DocumentData');
    if (localStorageData) {
      setDocumentData(JSON.parse(localStorageData));
    } else {
      setDocumentData(DocumentData);
      localStorage.setItem('DocumentData', JSON.stringify(DocumentData));
    }
  }, []);

  return documentData;
}