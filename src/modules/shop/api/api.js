import axios from "axios";
import { domain } from "../../core/index";

export const getAllProducts = async () => {
  try {
    const res = await axios.get(domain + "/api/products?populate=*");
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    console.error("Problem With Get All Products", err);
  }
};

export const getOneProduct = async (productId) => {
  try {
    const res = await axios.get(domain + `/api/products/${productId}?populate=*`);
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    console.error("Problem With Get The Product", err);
  }
};

export const getAllSizes = async () => {
  try {
    const res = await axios.get(domain + `/api/sizes`);
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    console.error("Problem With Get Sizes", err);
  }
};

// ================= Cart API (Strapi) =================
// NOTE: عدّل مسارات الـ API و الـ fields هنا حسب الـ cart model في Strapi عندك.

const authHeaders = (token) =>
  token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};

// جلب منتجات الكارت من Strapi
export const getCart = async ({ token, userId } = {}) => {
  try {
    if (!token || !userId) return [];

    // حسب الـ Content-Type Builder عندك:
    // - relation المستخدم اسمها users_permissions_user
    // - relation المنتج اسمها product
    const res = await axios.get(domain + "/api/cart-items", {
      headers: authHeaders(token),
      params: {
        populate: {
          product: {
            populate: "*",
          },
        },
        "filters[users_permissions_user][id][$eq]": userId,
      },
    });
    const data = res.data?.data;
    console.log("Cart-items from API:", data);

    // نحاول نرجّع array منتجات (عشان الـ UI الحالي متوقع منتجات)
    if (!Array.isArray(data)) return [];

    const normalize = (p) => (p?.attributes ? { id: p.id, ...p.attributes } : p);

    return data
      .flatMap((item) => {
        const rel = item?.product ?? item?.attributes?.product?.data ?? item?.product?.data;

        if (!rel) return [];
        if (Array.isArray(rel)) return rel.map(normalize);
        if (rel?.data) {
          if (Array.isArray(rel.data)) return rel.data.map(normalize);
          return [normalize(rel.data)];
        }
        return [normalize(rel)];
      })
      .filter(Boolean);
  } catch (err) {
    console.error("Problem With Get Cart", err);
    throw err;
  }
};

// إضافة منتج إلى الكارت في Strapi
export const addToCartApi = async ({ token, userId, productId, color, size, qty }) => {
  try {
    if (!token || !userId) throw new Error("Not authenticated");

    const payload = {
      data: {
        product: productId,
        users_permissions_user: userId,
        color,
        size,
        qty,
      },
    };

    console.log("PAYLOAD =>", payload);

    const res = await axios.post(domain + "/api/cart-items", payload, {
      headers: authHeaders(token),
    });

    console.log("Added to cart API:", res.data);
    return res.data;
  } catch (err) {
    console.error("Problem With Add To Cart API", err);
    console.error("ERROR DETAILS:", err?.response?.data?.error);
    throw err;
  }
};
