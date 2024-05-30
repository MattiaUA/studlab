import React, { useState, useEffect } from 'react';
import Preview from '../partials/preview';
import UsuariosReel from '../partials/usuarios-reel';
import NavigationBar from '../partials/navigation-bar';

export default function Home() {
    
    const [selectedNavItem, setSelectedNavItem] = useState("todos");
    const [docsRaw,setDocuments] = useState({});
    const [docsRender,setRenders] = useState({});

    useEffect(() => {
        async function fetchDocuments() {
            try {
                const response = await fetch('https://studlab.marcosruizrubio.com/documento');
                if (!response.ok) {
                    throw new Error('Error al recuperar los documentos');
                }
                const data = await response.json();
                setDocuments(data);
                setRenders(data);
            } catch (error) {
                setError(error.message);
            } 
        }
        fetchDocuments();
    }, []);

    const handleNavClick = (navItem) => {
        setSelectedNavItem(navItem);
        if (navItem !== "todos") {
            setRenders(docsRaw.filter(doc => doc.carrera.toLowerCase().includes(navItem)));
        } else {
            setRenders(docsRaw);
        }
    };

    return (
        <div className='relevan-files-container'>
            <ul className='categorias'>
                <li><button onClick={() => handleNavClick("todos")} className={selectedNavItem === "todos" ? "active-home-nav" : ""}>Todos</button></li>
                <li><button onClick={() => handleNavClick("ciencia")} className={selectedNavItem === "ciencia" ? "active-home-nav" : ""}>Ciencia</button></li>
                <li><button onClick={() => handleNavClick("economía")} className={selectedNavItem === "economía" ? "active-home-nav" : ""}>Economía</button></li>
                <li><button onClick={() => handleNavClick("ingeniería")} className={selectedNavItem === "ingeniería" ? "active-home-nav" : ""}>Ingeniería</button></li>
                <li><button onClick={() => handleNavClick("biología")} className={selectedNavItem === "biología" ? "active-home-nav" : ""}>Biología</button></li>
                <li><button onClick={() => handleNavClick("química")} className={selectedNavItem === "química" ? "active-home-nav" : ""}>Química</button></li>
                <li><button onClick={() => handleNavClick("psicología")} className={selectedNavItem === "psicología" ? "active-home-nav" : ""}>Psicología</button></li>
            </ul>
            <UsuariosReel/>
            <div className='previews'>
                {Array.isArray(docsRender) && docsRender.map((prev, index) => (
                    <Preview key={index} data={prev} />
                ))}
                <NavigationBar />
            </div>
        </div>
    );
}
