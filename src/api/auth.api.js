import { post } from "./client";

export const registerUser = (formData) => post("/auth/register_user", formData);


export const verifiedEmail = (formData) => post("/auth/verified_email", formData);



export const resendOtp = (formData) => post("/auth/resend_otp", formData);

export const userLogin = (formData) => post("/auth/user_login", formData);
