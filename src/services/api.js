import axios from "axios";

export const inicioSesion = (data) => {
  return axios.post("http://localhost:8080/api/auth/login", data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
};
