import React, { useState, useEffect } from 'react';
import parsePrev from '../../hooks/parsePrev';
import Preview from '../partials/preview';
import UsuariosReel from '../partials/usuarios-reel';
import NavigationBar from '../partials/navigation-bar';
import { Preferences } from '@capacitor/preferences';

export default function Home({ docData, userData }) {
    
    const [filterDoc, setFilterDoc] = useState(docData);
    const [selectedNavItem, setSelectedNavItem] = useState("todos");

    const handleNavClick = (navItem) => {
        setSelectedNavItem(navItem);
        if (navItem !== "todos") {
            setFilterDoc({ 'documentos': docData["documentos"].filter(doc => doc.carrera.toLowerCase().includes(navItem)) });
        } else {
            setFilterDoc(docData);
        }
    };
    console.log("RENDERIZAR",docData)
    const prevData = parsePrev(filterDoc, userData);

    return (
        <>
            <ul className='categorias'>
                <li><button onClick={() => handleNavClick("todos")} className={selectedNavItem === "todos" ? "active-home-nav" : ""}>Todos</button></li>
                <li><button onClick={() => handleNavClick("ciencia")} className={selectedNavItem === "ciencia" ? "active-home-nav" : ""}>Ciencia</button></li>
                <li><button onClick={() => handleNavClick("economía")} className={selectedNavItem === "economía" ? "active-home-nav" : ""}>Economía</button></li>
                <li><button onClick={() => handleNavClick("ingeniería")} className={selectedNavItem === "ingeniería" ? "active-home-nav" : ""}>Ingeniería</button></li>
                <li><button onClick={() => handleNavClick("biología")} className={selectedNavItem === "biología" ? "active-home-nav" : ""}>Biología</button></li>
                <li><button onClick={() => handleNavClick("química")} className={selectedNavItem === "química" ? "active-home-nav" : ""}>Química</button></li>
                <li><button onClick={() => handleNavClick("psicología")} className={selectedNavItem === "psicología" ? "active-home-nav" : ""}>Psicología</button></li>
            </ul>
            <UsuariosReel users={userData} />
            <div className='previews'>
                {prevData.map((prev, index) => (
                    <Preview key={index} data={prev} />
                ))}
                <NavigationBar />
            </div>
        </>
    );
}
