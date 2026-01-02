import { create } from "zustand";
import { signInPost, signUpPost, verifyToken } from "../api/auth";

export const useUserStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,

  signIn: async (values) => {
    try {
      set({ loading: true, error: null });
      const res = await signInPost(values);
      if (res.jwt) {
        localStorage.setItem("token", res.jwt);
        set({ user: res.user, loading: false, error: null, token: res.jwt });
        return { success: true };
      } else {
        set({ loading: false, error: res });
        return { sucess: false, error: res };
      }
    } catch (err) {
      set({ loading: false, error: err });
      return { success: false, error: err };
    }
  },
  signUp: async (values) => {
    try {
      set({ loading: true });
      const res = await signUpPost(values);
      if (res.jwt) {
        localStorage.setItem("token", res.jwt);
        set({ user: res.user, token: res.jwt, loading: false, error: null });
        return { success: true, error: null };
      } else {
        set({ loading: false, error: res.error });
        return { success: false, error: res.error };
      }
    } catch (err) {
      set({ loading: false, error: err });
      return { success: false, error: err };
    }
  },
  checkTokenServer: async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const result = await verifyToken(token);

    if (result.valid) {
      set({ user: result.user, token });
      return true;
    } else {
      localStorage.removeItem("token");
      set({ user: null, token: null });
      return false;
    }
  },
}));
