USE studlab;

DROP TABLE IF EXISTS Comentarios;
DROP TABLE IF EXISTS Documentos;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    id INT PRIMARY KEY,
    nombre VARCHAR(255),
    email VARCHAR(255),
    telefono VARCHAR(20),
    pwd VARCHAR(255),
    carrera VARCHAR(255),
    fotourl VARCHAR(255)
);

CREATE TABLE Documentos (
    id INT PRIMARY KEY,
    titulo VARCHAR(255),
    idusuario INT,
    descripcion TEXT,
    imagendeportada VARCHAR(255),
    visualizaciones INT,
    documentourl VARCHAR(255),
    formato VARCHAR(50),
    carrera VARCHAR(255),
    tema VARCHAR(255),
    asignatura VARCHAR(255),
    fecha DATE,
    CONSTRAINT FK_Documents_Usuario FOREIGN KEY (idusuario) REFERENCES Users(id)
);

CREATE TABLE Comentarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idusuario INT,
    iddocumento INT,
    comentario TEXT,
    fecha DATE,
    CONSTRAINT FK_Comentarios_Usuario FOREIGN KEY (idusuario) REFERENCES Users(id),
    CONSTRAINT FK_Comentarios_Documentos FOREIGN KEY (iddocumento) REFERENCES Documentos(id)
);

-- ------------------------------------INSERT----------------------------------------------------------------
INSERT INTO Users (id, nombre, email, telefono, pwd, carrera, fotourl) VALUES
(1, 'Ana García', 'ana@example.com', '+1234567890', 'contraseña123', 'Ingeniería Civil', 'https://picsum.photos/id/1/150/150'),
(2, 'Juan Martínez', 'juan@example.com', '+1987654321', 'segura456', 'Medicina', 'https://picsum.photos/id/2/150/150'),
(3, 'María López', 'maria@example.com', '+1112233445', 'maria1234', 'Psicología', 'https://picsum.photos/id/3/150/150'),
(4, 'Pedro Rodríguez', 'pedro@example.com', '+1555666777', 'pedro567', 'Administración de Empresas', 'https://picsum.photos/id/4/150/150'),
(5, 'Laura Sánchez', 'laura@example.com', '+1222333444', 'laura789', 'Derecho', 'https://picsum.photos/id/50/150/150'),
(6, 'Carlos Martínez', 'carlos@example.com', '+1777888999', 'carlos456', 'Ingeniería Eléctrica', 'https://picsum.photos/id/6/150/150'),
(7, 'Sofía Gómez', 'sofia@example.com', '+1999888777', 'sofia123', 'Arquitectura', 'https://picsum.photos/id/7/150/150'),
(8, 'Daniel Pérez', 'daniel@example.com', '+1666777888', 'daniel789', 'Biología', 'https://picsum.photos/id/8/150/150'),
(9, 'Lucía Fernández', 'lucia@example.com', '+1888777666', 'lucia456', 'Economía', 'https://picsum.photos/id/9/150/150'),
(10, 'Javier Ruiz', 'javier@example.com', '+1777666555', 'javier123', 'Informática', 'https://picsum.photos/id/10/150/150');

INSERT INTO Documentos (id, titulo, idusuario, descripcion, imagendeportada, visualizaciones, documentourl, formato, carrera, tema,
                        asignatura, fecha) VALUES
(1, 'Proyecto IA', 6, 'Proyecto de investigación sobre inteligencia artificial. Este proyecto busca explorar diferentes enfoques en el campo de la inteligencia artificial para mejorar la comprensión de sistemas inteligentes y su aplicación en diversas áreas.',
'https://picsum.photos/id/478/200/300', 1500, '/pdf_demo.pdf', 'pdf', 'Ingeniería Informática', 'Introducción a la Inteligencia Artificial',
'Inteligencia Artificial', '2023-03-15'),
(2, 'Informe Química', 7, 'Informe de prácticas de laboratorio de química. Este informe detalla los experimentos realizados en el laboratorio de química orgánica, incluyendo los procedimientos, resultados y análisis de los datos recopilados.',
'https://picsum.photos/id/234/200/300', 800, '/video_demo.mp4', 'mp4', 'Química', 'Química Orgánica', 'Laboratorio de Química Orgánica',
'2024-05-20'),
(3, 'Presentación Energía', 8, 'Presentación sobre energías renovables. Esta presentación ofrece una visión general de las diferentes fuentes de energía renovable, incluyendo sus beneficios, desafíos y aplicaciones prácticas en el campo de la ingeniería energética.',
'https://picsum.photos/id/876/200/300', 0, '/imagen.png', 'png', 'Ingeniería Energética', 'Energías Renovables',
'Gestión de Energías Renovables', '2022-11-10');

INSERT INTO Comentarios (idusuario, iddocumento, comentario, fecha) VALUES
(2, 1, '¡Interesante proyecto! ¿Cuál es el enfoque principal de la investigación? Me gustaría saber más sobre las metodologías utilizadas.',
'2023-03-20'),
(4, 2, '¿Cómo se llevó a cabo la experimentación? Me gustaría conocer más detalles sobre los procedimientos utilizados.',
'2024-05-22'),
(3, 3, '¿Qué fuentes de energía renovable se presentaron? Me gustaría profundizar en la discusión sobre energía solar y eólica.',
'2022-11-12');
