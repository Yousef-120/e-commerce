import axios from "axios";
import { domain } from "../../core/index";

export const signInPost = async (values) => {
  const endPoint = "/api/auth/local";
  const url = domain + endPoint;
  const data = {
    identifier: values.email,
    password: values.password,
  };

  try {
    const res = await axios.post(url, data);
    return res.data;
  } catch (err) {
    return { error: err.response?.data?.error?.message || "Something went wrong" };
  }
};
export const signUpPost = async (values) => {
  const endPoint = "/api/auth/local/register";
  const url = domain + endPoint;
  const data = {
    username: values.username,
    email: values.email,
    password: values.password,
  };
  try {
    const res = await axios.post(url, data);
    return res.data;
  } catch (err) {
    return { error: err.response?.data?.error?.message || "Something went wrong" };
  }
};
export const verifyToken = async (token) => {
  if (!token) return false;

  try {
    const res = await axios.get(`${domain}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { valid: true, user: res.data };
  } catch (err) {
    return { valid: false };
  }
};