import React, { useState } from 'react';
import parsePrev from '../../hooks/parsePrev'
import Preview from '../partials/preview'
import PreviewCarrousel from '../partials/previewCarousel'
import SearchBar from '../partials/searchBar'
import UsuariosReel from '../partials/usuarios-reel'
import NavigationBar from '../partials/navigation-bar';

export default function Home(props) {
    const { docData, userData } = props
    const [selectedNavItem, setSelectedNavItem] = useState("todos");

    const handleNavClick = (navItem) => {
        setSelectedNavItem(navItem);
    };

    const prevData = parsePrev(docData, userData)
    return (
        <>
            <ul className='categorias'>
                <li><button onClick={() => handleNavClick("todos")} className={selectedNavItem === "todos" ? "active-home-nav" : ""}>Todos</button></li>
                <li><button onClick={() => handleNavClick("sociales")} className={selectedNavItem === "sociales" ? "active-home-nav" : ""}>Ciencias sociales</button></li>
                <li><button onClick={() => handleNavClick("artes")} className={selectedNavItem === "artes" ? "active-home-nav" : ""}>Artes y humanidades</button></li>
                <li><button onClick={() => handleNavClick("ingenieria")} className={selectedNavItem === "ingenieria" ? "active-home-nav" : ""}>Ingenierías</button></li>
                <li><button onClick={() => handleNavClick("educacion")} className={selectedNavItem === "educacion" ? "active-home-nav" : ""}>Educación</button></li>
            </ul>
            <UsuariosReel users={userData} />
            <Preview data={prevData[0]} />
            <NavigationBar />
        </>
    )
}
