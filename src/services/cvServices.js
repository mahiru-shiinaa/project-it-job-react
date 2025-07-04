import { del, get, patch, post } from "../utils";

export const createCV = (data) => post(`cv/create`, data);

export const getListCVToCompany = () => get(`cv`);

export const deleteOnCV = (id) => del(`cv/delete/${id}`);

export const getDetailCV = (id) => get(`cv/detail/${id}`);

export const changeStatusCV = (id) => patch(`cv/change-status/${id}`);
    
