import { get, patch, post } from "../utils";

export const login = (data) => post(`companys/auth/login`, data );

export const logout = () => post(`companys/auth/logout`);

export const register = (data) => post(`companys/auth/register`, data);

export const cancelRegister = (data) => post(`companys/auth/register/cancel-register`, data);

export const checkEmailOtp = (data) => post(`companys/auth/register/checkEmailOtp`, data);

export const resendCheckEmailOtp = (data) => post(`companys/auth/register/resendCheckEmailOtp`, data);

export const forgotPassword = (data) => post(`companys/password/forgot`, data);

export const otpPassword = (data) => post(`companys/password/otp`, data);

export const resendOtpPassword = (data) => post(`companys/password/resendOtp`, data);

export const resetPassword = (data) => post(`companys/password/reset`, data);

export const changePassword = (data) => patch(`companys/me/change-password`, data);

export const getProfile = () => get(`companys/me`);