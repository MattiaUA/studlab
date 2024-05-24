import { useMemo } from "react";

/**
 * Personalized hook that parses the data from docs and users.
 * Puts it together looking at both id.
 * @param {*} docs The JSON document that has the documents of the page
 * @param {*} users The JSON document that has the users of the page
 * @returns The necessary data from the previsualization. Taking out the undefined
 */
export default function parsePrev(docs, users) {
  const prevData = useMemo(() => {
    if (!docs || !docs.documentos || !Array.isArray(docs.documentos)) {
      // Si docs es null, o docs.documentos no está definido o no es un array,
      // retorna un array vacío
      return [];
    }
    const combinedData = docs.documentos
      .map((doc) => {
        const foundUser = users.find((user) => user.id === doc.idusuario);
        if (foundUser) {
          return {
            DocId: doc.id,
            userId: foundUser.id,
            title: doc.titulo,
            docImg: doc.imagendeportada,
            theme: doc.tema,
            userName: foundUser.nombre,
            userPicture: foundUser.fotourl,
            format: doc.formato,
          };
        }
      })
      .filter((item) => item !== undefined);

    return combinedData;
  }, [docs, users]);

  return prevData;
}
