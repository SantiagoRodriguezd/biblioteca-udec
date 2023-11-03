import axios from "axios";

export const inicioSesion = (data) => {
  return axios.post("http://localhost:8080/api/auth/login", data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
};

// Función para convertir bytes en PDF y descargar el archivo
// function bytesToPDF(bytes, fileName) {
//   const blob = new Blob([bytes], { type: "application/pdf" });
//   const link = document.createElement("a");
//   link.href = window.URL.createObjectURL(blob);
//   link.download = fileName;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }

// // Función para obtener archivos y convertir a PDF
// export const verArchivos = () => {
//   let config = {
//     method: "get",
//     maxBodyLength: Infinity,
//     url: "http://localhost:8080/archivos/all",
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIkMmEkMTIkc05ZaU1vcTV3SlFjTHpZZEpIbHkzZTFta2c0SHJzLm9PdER0UXlwN2lTeTA3Znk3emY1S0siLCJleHAiOjE2OTkwNDM5ODN9.OD650QQFq--CB-O9T_LG2l5wVkoCFAehnjUiJPeFXcw",
//     },
//   };

//   axios
//     .request(config)
//     .then((response) => {
//       console.log(JSON.stringify(response.data));
//       const archivo = response.data[0]; // Obtener el primer archivo de la respuesta
//       const { nombre, archivo: bytes } = archivo;
//       bytesToPDF(bytes, nombre + ".pdf"); // Convertir los bytes en un archivo PDF descargable
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
