import axios from "axios";

export const inicioSesion = (data) => {
  return axios.post("http://localhost:8000/api/auth/login/", data);
};
