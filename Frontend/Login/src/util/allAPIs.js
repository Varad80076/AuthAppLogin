const host = import.meta.env.VITE_API_KEY;
export const signup = `${host}auth/signup`;
export const login = `${host}auth/login`;
export const varad = `${host}auth/varad`;
export const verifyOtp = `${host}auth/verifyotp`;
export const resendOtpUrl = `${host}auth/resendotp`;
export const ForgetID = `${host}auth/forget`;
export const ForgetPASS = `${host}auth/reset`;
