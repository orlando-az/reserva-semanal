import api from "./api";
import { Socio } from "../types/models";

export const getSocios = () => api.get<Socio[]>("/socio");

export const postSocio = (socio: Omit<Socio, "id" | "fechaRegistro">) =>
  api.post<Socio>("/socio", socio);

export const putSocio = (id: number, socio: Socio) =>
  api.put(`/socio/${id}`, socio);

export const deleteSocio = (id: number) => api.delete(`/socio/${id}`);
