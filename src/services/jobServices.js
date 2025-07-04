import { del, get, patch, post } from "../utils";

export const getAllJob = () => get("jobs");

export const  getDetailJob = (id) => get(`jobs/info/${id}`);

export const getListJobToCompany = () => get("jobs/me");

export const createJob = (data) => post("jobs/create", data);

export const deleteJob = (id) => del(`jobs/delete/${id}`);

export const updateJob = (id, data) => patch(`jobs/edit/${id}`, data);