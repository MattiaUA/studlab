import { useMemo } from "react";

/**
 * Personalized hook that parses the data from docs and users.
 * Puts it togheter looking at boths id.
 * @param {*} docs The JSON document that has the documents of the page
 * @param {*} users The JSON document that has the users of the page
 * @returns The necessary data from the previsualization. Taking out the undefined
 */
export default function parsePrev(docs, users) {
  const prevData = useMemo(() => {
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
