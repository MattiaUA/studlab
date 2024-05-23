import React, { useState } from 'react';
import parsePrev from '../../hooks/parsePrev'
import Preview from '../partials/preview'
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
            <div className='previews'>
                <Preview data={prevData[0]} />
                <Preview data={prevData[1]} />
                <Preview data={prevData[2]} />
                <Preview data={prevData[3]} />
                <Preview data={prevData[4]} />
                <Preview data={prevData[5]} />
                <Preview data={prevData[6]} />
                <NavigationBar />
            </div>
        </>
    )
}
