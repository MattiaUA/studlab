import UsersData from "../exampledata/Users.json";
import DocumentData from "../exampledata/Documents.json";

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

function docApartheid(filteredDocs) {
  let vidDocs = { documentos: [] };
  let docDocs = { documentos: [] };
  let imgDocs = { documentos: [] };
  filteredDocs.forEach((doc) => {
    if (["avi", "mp4"].includes(doc.formato)) {
      vidDocs.documentos.push(doc);
    } else if (["png", "jpeg", "jpg"].includes(doc.formato)) {
      imgDocs.documentos.push(doc);
    } else if (["txt", "docx", "pdf"].includes(doc.formato)) {
      docDocs.documentos.push(doc);
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
export function getDocs(filters) {
  let filteredDocs = DocumentData.documentos;
  if (filters.search !== "" && filters.search !== undefined) {
    const searchWords = filters.search.toLowerCase().split(" ");

    const filteredDocsBySearch = filterDocsByTitle(
      DocumentData.documentos,
      searchWords,
      filters
    );
    const filteredUsersBySearch = filterUsersByName(UsersData, searchWords);
    const docsByUsers = getDocsByUsers(
      DocumentData.documentos,
      filteredUsersBySearch,
      filters
    );

    filteredDocs = [...new Set([...filteredDocsBySearch, ...docsByUsers])];
  }
  if (filters.vid) {
    filteredDocs = DocumentData.documentos.filter((doc) =>
      ["avi", "mp4"].includes(doc.formato)
    );
  }
  if (filters.img) {
    filteredDocs = DocumentData.documentos.filter((doc) =>
      ["png", "jpeg", "jpg"].includes(doc.formato)
    );
  }
  if (filters.doc) {
    filteredDocs = DocumentData.documentos.filter((doc) =>
      ["txt", "docx", "pdf"].includes(doc.formato)
    );
  }
  if (filters.startDate) {
    filteredDocs = filteredDocs.filter(
      (doc) => new Date(doc.fecha) >= new Date(filters.startDate)
    );
  }
  if (filters.endDate) {
    filteredDocs = filteredDocs.filter(
      (doc) => new Date(doc.fecha) <= new Date(filters.endDate)
    );
  }
  if (filters.career) {
    filteredDocs = filteredDocs.filter(
      (doc) => doc.carrera.toLowerCase() === filters.career.toLowerCase()
    );
  }
  if (filters.class) {
    filteredDocs = filteredDocs.filter(
      (doc) => doc.asignatura.toLowerCase() === filters.class.toLowerCase()
    );
  }
  const { vidDocs, docDocs, imgDocs } = docApartheid(filteredDocs);
  return { vidDocs, docDocs, imgDocs };
}

/**
 * Retrieves information about the creators of the filtered documents.
 *
 * @param {Object} vidDocs - Video documents.
 * @param {Object} docDocs - Document documents.
 * @param {Object} imgDocs - Image documents.
 * @returns {Array} - An array of creator information.
 */
export function getRelatedProfiles(vidDocs, docDocs, imgDocs) {
  const allDocs = [
    ...vidDocs.documentos,
    ...docDocs.documentos,
    ...imgDocs.documentos,
  ];
  const creatorsIDs = allDocs.map((doc) => doc.idusuario);
  const creatorsInfo = UsersData.filter(user => creatorsIDs.includes(user.id));
  return creatorsInfo;
}
