

function filterDocsByTitle(documents, searchWords, filters) {
  return documents.filter(
    (doc) =>
      searchWords.some((word) => doc.titulo.toLowerCase().includes(word)) &&
      (!filters.vid || ["avi", "mp4"].includes(doc.formato)) &&
      (!filters.img || ["png", "jpeg", "jpg"].includes(doc.formato)) &&
      (!filters.doc || ["txt", "docx", "pdf"].includes(doc.formato)) &&
      (!filters.startDate ||
        new Date(doc.fecha) >= new Date(filters.startDate)) &&
      (!filters.endDate || new Date(doc.fecha) <= new Date(filters.endDate))
  );
}

function filterUsersByName(users, searchWords) {
  return users.filter((user) =>
    searchWords.some((word) => user.nombre.toLowerCase().includes(word))
  );
}

function getDocsByUsers(documents, users, filters) {
  return documents.filter(
    (doc) =>
      users.some((user) => user.id === doc.idusuario) &&
      (!filters.vid || ["avi", "mp4"].includes(doc.formato)) &&
      (!filters.img || ["png", "jpeg", "jpg"].includes(doc.formato)) &&
      (!filters.doc || ["txt", "docx", "pdf"].includes(doc.formato)) &&
      (!filters.startDate ||
        new Date(doc.fecha) >= new Date(filters.startDate)) &&
      (!filters.endDate || new Date(doc.fecha) <= new Date(filters.endDate))
  );
}

function docApartheid(docs) {
  let vidDocs = [];
  let docDocs = [];
  let imgDocs = [];
  docs.forEach((doc) => {
    if (["avi", "mp4"].includes(doc.formato)) {
      vidDocs.push(doc);
    } else if (["png", "jpeg", "jpg"].includes(doc.formato)) {
      imgDocs.push(doc);
    } else if (["txt", "docx", "pdf"].includes(doc.formato)) {
      docDocs.push(doc);
    }
  });
  return { vidDocs, docDocs, imgDocs };
}


/**
 * Retrieves filtered documents based on the provided filters.
 *
 * @param {Object} filters - The filters to apply on the documents.
 * @param {string} filters.search - The search query to filter documents by title.
 * @param {boolean} filters.vid - Indicates whether to filter documents by video format.
 * @param {boolean} filters.img - Indicates whether to filter documents by image format.
 * @param {boolean} filters.doc - Indicates whether to filter documents by document format.
 * @param {Date} filters.startDate - The start date to filter documents by.
 * @param {Date} filters.endDate - The end date to filter documents by.
 * @param {string} filters.career - The career to filter documents by.
 * @param {string} filters.class - The class to filter documents by.
 * @returns {Array} - The filtered documents.
 */
export async function getDocs(filters) {
  try {
    const documentData = await fetchDocuments();
    const usersData = await fetchUser();

    let filteredDocs = documentData;

    if (filters.search && filters.search !== "") {
      const searchWords = filters.search.toLowerCase().split(" ");
      const filteredDocsBySearch = filterDocsByTitle(documentData, searchWords, filters);
      const filteredUsersBySearch = filterUsersByName(usersData, searchWords);
      const docsByUsers = getDocsByUsers(documentData, filteredUsersBySearch, filters);

      filteredDocs = [...new Set([...filteredDocsBySearch, ...docsByUsers])];
    }

    let filtersKW = [];
    if (filters.vid) filtersKW = [...filtersKW, "avi", "mp4"];
    if (filters.img) filtersKW = [...filtersKW, "png", "jpeg", "jpg"];
    if (filters.doc) filtersKW = [...filtersKW, "txt", "docx", "pdf"];
    
    filteredDocs = filteredDocs.filter((doc) => filtersKW.includes(doc.formato));

    if (filters.startDate) {
      filteredDocs = filteredDocs.filter((doc) => new Date(doc.fecha) >= new Date(filters.startDate));
    }

    if (filters.endDate) {
      filteredDocs = filteredDocs.filter((doc) => new Date(doc.fecha) <= new Date(filters.endDate));
    }

    if (filters.career) {
      filteredDocs = filteredDocs.filter((doc) => doc.carrera.toLowerCase() === filters.career.toLowerCase());
    }

    if (filters.class) {
      filteredDocs = filteredDocs.filter((doc) => doc.asignatura.toLowerCase() === filters.class.toLowerCase());
    }
    const { vidDocs, docDocs, imgDocs } = docApartheid(filteredDocs);
    return { vidDocs, docDocs, imgDocs };
  } catch (error) {
    console.error("Error al obtener los documentos:", error);
    throw error;
  }
}


async function fetchDocuments() {
  try {
    const response = await fetch('https://studlab.marcosruizrubio.com/documento');
    if (!response.ok) {
      throw new Error('Error al recuperar los documentos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al recuperar los documentos:", error);
    throw error;
  }
}

async function fetchUser() {
  try {
    const response = await fetch('https://studlab.marcosruizrubio.com/user');
    if (!response.ok) {
      throw new Error('Error al recuperar los usuarios');
    }
    return await response.json();
  } catch (error) {
    console.error("Error al recuperar los usuarios:", error);
    throw error;
  }
}


/**
 * Retrieves information about the creators of the filtered documents.
 *
 * @param {Object} vidDocs - Video documents.
 * @param {Object} docDocs - Document documents.
 * @param {Object} imgDocs - Image documents.
 * @returns {Array} - An array of creator information.
 */
export async function getRelatedProfiles(videos, documentos, archivos) {

  const usersData = await fetchUser();
  const allDocs = [
    ...videos,
    ...documentos,
    ...archivos,
  ];
  const creators = allDocs.map((doc) => doc.idusuario);
  return creators;
}
