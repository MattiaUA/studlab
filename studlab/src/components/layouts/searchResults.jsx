import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import NavigationBar from "../partials/navigation-bar";
import SearchBar from "../partials/searchBar";
import ProfilePic from "../partials/profile-pic";
import PreviewCarousel from "../partials/previewCarousel";

import * as searchHelpers from '../../hooks/searchHelpers'

export default function SearchResults() {

  const [docsRaw, setDocuments] = useState({});
  const [relatedProfiles, setRelatedProfiles] = useState([]);
  const [vidDocsR, setVids] = useState([]);
  const [docDocsR, setDocs] = useState([]);
  const [imgDocsR, setimgDocs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://studlab.marcosruizrubio.com/documento');
        if (!response.ok) {
          throw new Error('Error al recuperar los documentos');
        }
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const location = useLocation();
  const incomingFilters = location.state?.filters;

  useEffect(() => {
    async function getProfiles() {
      try {
        const { vidDocs, docDocs, imgDocs } = await searchHelpers.getDocs(incomingFilters);
        setDocs(docDocs);
        setVids(vidDocs);
        setimgDocs(imgDocs);

        const creators  = await searchHelpers.getRelatedProfiles(vidDocs, docDocs, imgDocs);
        setRelatedProfiles(creators);
      } catch (error) {
        console.error(error);
      }
    }
    getProfiles();
  }, []);

  const [filters, setFilters] = useState({
    search: "",
    career: "",
    class: "",
    startDate: "",
    endDate: "",
    img: false,
    doc: false,
    vid: false
  });

  return (
    <div className="search-container">
      <div className="banner-container">
        <img src="banner.jpeg" alt="background banner for most headers" />
        <h2 className="banner-txt">Resultados de tu búsqueda</h2>
      </div>

      <SearchBar filters={filters} setFilters={setFilters} />
      <strong style={{ margin: '0 0 2% 4%' }}>Perfiles relacionados</strong>
      <div className="related-profiles-container">
        {relatedProfiles.map((userData, idx) =>
          <ProfilePic userid={userData.id} key={idx}></ProfilePic>
        )}
      </div>

      <strong style={{ margin: '5% 0 0 4%' }}>Resultados</strong>
      <p style={{ margin: '0 0 0 4%' }}>Videos</p>
      {vidDocsR.length > 0 ? (
        <>
          <PreviewCarousel data={vidDocsR}></PreviewCarousel>
          <button className="view-all-btn">Ver todos los videos</button>
        </>
      ) : (
        <p style={{ margin: '0 0 0 4%', color: '#4966FF' }} >Ups, o hay vídeos</p>
      )}

      {docDocsR.length > 0 ? (
        <>
          <p style={{ margin: '3% 0 0 4%' }}>Documentos</p>
          <PreviewCarousel data={docDocsR}></PreviewCarousel>
          <button className="view-all-btn">Ver todos los documentos</button>
        </>
      ) : (
        <p style={{ margin: '0 0 0 4%', color: '#4966FF' }} >Ups, no hay documentos</p>
      )}

      {imgDocsR.length > 0 ? (
        <>
          <p style={{ margin: '3% 0 0 4%' }}>Imágenes</p>
          <PreviewCarousel data={imgDocsR}></PreviewCarousel>
          <button className="view-all-btn">Ver todas las imágenes</button>
        </>
      ) : (
        <p style={{ margin: '4% 0 0 4%', color: '#4966FF' }} >Ups, no hay imágenes</p>
      )}
      <NavigationBar />
    </div>
  )
}