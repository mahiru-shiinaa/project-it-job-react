import { get, patch } from "../utils";

export const getAllCompany = () => get("companys");

export const getDetailCompany = (id) => get(`companys/info/${id}`);


export const editCompany = (data) => patch(`companys/me/edit`, data);

