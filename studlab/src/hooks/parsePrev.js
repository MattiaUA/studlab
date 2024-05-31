import { useMemo } from "react";

/**
 * Personalized hook that parses the data from docs and users.
 * Puts it together looking at both id.
 * @param {*} docs The JSON document that has the documents of the page
 * @param {*} users The JSON document that has the users of the page
 * @returns The necessary data from the previsualization. Taking out the undefined
 */
export default function parsePrev(docs, user) {
  const prevData = useMemo(() => {
    const combinedData = docs.documentos
      .map((doc) => {
        if (user) {
          return {
            DocId: doc.id,
            userId: user.id,
            title: doc.titulo,
            docImg: doc.imagendeportada,
            theme: doc.tema,
            userName: user.nombre,
            userPicture: user.fotourl,
            format: doc.formato,
          };
        }
        console.log("SIN USUARIO",doc.idusuario)
      })
      .filter((item) => item !== undefined);

    return combinedData;
  }, [docs, user]);

  return prevData;
}
