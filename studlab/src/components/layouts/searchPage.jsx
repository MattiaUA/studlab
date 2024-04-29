import { useState } from "react";
import SearchBar from "../partials/searchBar";
import NavigationBar from "../partials/navigation-bar";

export default function SearchPage({ docData, userData }) {
  const docs = docData["documentos"];
  const careers = [...new Set(docs.map((doc) => doc.carrera))];
  const [selectedCareer, setSelectedCareer] = useState("");
  const [classes, setClasses] = useState([]);
  const [filters, setFilters] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const [isVideoClicked, setIsVideoClicked] = useState(false);
  const [isDocClicked, setIsDocClicked] = useState(false);

  const handleCareerChange = (evt) => {
    const selected = evt.target.value;
    setSelectedCareer(selected);
    const classesOfCareer = getClasses(docData, selected);
    setClasses(classesOfCareer);
  };

  const handleStartDateChange = (evt) => {
    setStartDate(evt.target.value);
  };

  const handleEndDateChange = (evt) => {
    setEndDate(evt.target.value);
  };

  const handleClick = () => {
    setIsClicked(true);
  };

  const handleVideoClick = () => {
    setIsVideoClicked(true);
  };

  const handleDocClick = () => {
    setIsDocClicked(true);
  };

  return (
    <>
      <div className="banner-container">
        <img src="banner.jpeg" alt="background banner for most headers" />
        <h2 className="banner-txt">¿Buscas algo?</h2>
      </div>
      <SearchBar />
      <strong style={{ margin: "0 0 0 10px" }}>Filtrar por formato</strong>
      <div>
        <button
          onClick={handleVideoClick}
          className={isVideoClicked ? "clicked-button" : "format-button"}
        >
          <img src="video-icon.png" alt="icon for videos" />
          <span className="button-text">Vídeos</span>
        </button>
        <button
          onClick={handleDocClick}
          className={isDocClicked ? "clicked-button" : "format-button"}
        >
          <img src="doc-icon.png" alt="icon for documents" />
          <span className="button-text">Docum...</span>
        </button>
        <button
          onClick={handleClick}
          className={isClicked ? "clicked-button" : "format-button"}
        >
          <img src="image-icon.png" alt="icon for images" />
          <span className="button-text">Imág...</span>
        </button>
      </div>
      <div className="dropdown-container">
        <select className="dropdown" onChange={handleCareerChange}>
          <option value="">Filtrar por carrera (Todas)</option>
          {careers.map((career, idx) => (
            <option key={idx} value={career} style={{color:"white"}}>
              {career}
            </option>
          ))}
        </select>
        <select className="dropdown" disabled={!selectedCareer}>
          <option value="">Filtrar por asignatura (escoge primero una carrera)</option>
          {classes.map((clase, idx) => (
            <option key={idx} value={clase}>
              {clase}
            </option>
          ))}
        </select>
      </div>
      <div className="date-container">
        <strong>Filtrar por fecha</strong>
        <div className="date-inputs">
          <input
            type="date"
            onChange={handleStartDateChange}
          />
          <input
            type="date"
            onChange={handleEndDateChange}
          />
        </div>
      </div>
      <div className="">

      </div>
      <NavigationBar user = {userData[0]} />
    </>
  );
}

function getClasses(data, career) {
  const classes = data["documentos"]
    .filter((item) => item.carrera === career)
    .map((item) => item.asignatura);
  return classes;
}
