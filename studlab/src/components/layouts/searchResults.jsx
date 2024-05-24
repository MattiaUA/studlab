import { useLocation } from "react-router-dom";
import { useState } from "react";
import NavigationBar from "../partials/navigation-bar";
import SearchBar from "../partials/searchBar";
import parsePrev from "../../hooks/parsePrev";
import ProfilePic from "../partials/profile-pic";
import PreviewCarousel from "../partials/previewCarousel";

import * as searchHelpers from '../../hooks/searchHelpers'

export default function SearchResults({ docData, userData }) {
  const location = useLocation();
  const incomingFilters = location.state?.filters;

  // APPLYING FILTERS
  const { vidDocs, docDocs, imgDocs } = searchHelpers.getDocs(incomingFilters, docData);

  // Creating the carousels
  const videoPrevData = parsePrev(vidDocs, userData);
  const docPrevData = parsePrev(docDocs, userData);
  const imgPrevData = parsePrev(imgDocs, userData);

  // Getting relared profiles
  const relatedProfiles = searchHelpers.getRelatedProfiles(vidDocs, docDocs, imgDocs);
  console.log("La info de los creadores: ", relatedProfiles)

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
          <ProfilePic user={userData} key={idx}></ProfilePic>
        )}
      </div>

      <strong style={{ margin: '5% 0 0 4%' }}>Resultados</strong>
      <p style={{ margin: '0 0 0 4%' }}>Videos</p>
      {videoPrevData.length > 0 ? (
        <>
          <PreviewCarousel data={videoPrevData}></PreviewCarousel>
          <button className="view-all-btn">Ver todos los videos</button>
        </>
      ) : (
        <p style={{ margin: '0 0 0 4%', color:'#4966FF'}} >Ups, o hay vídeos</p>
      )}

      {docPrevData.length > 0 ? (
        <>
          <p style={{ margin: '3% 0 0 4%' }}>Documentos</p>
          <PreviewCarousel data={docPrevData}></PreviewCarousel>
          <button className="view-all-btn">Ver todos los documentos</button>
        </>
      ) : (
        <p style={{ margin: '0 0 0 4%', color:'#4966FF'}} >Ups, no hay documentos</p>
      )}

      {imgPrevData.length > 0 ? (
        <>
          <p style={{ margin: '3% 0 0 4%' }}>Imágenes</p>
          <PreviewCarousel data={imgPrevData}></PreviewCarousel>
          <button className="view-all-btn">Ver todas las imágenes</button>
        </>
      ) : (
        <p style={{ margin: '4% 0 0 4%', color:'#4966FF'}} >Ups, no hay imágenes</p>
      )}
      <NavigationBar />
    </div>
  )
}