import axios from "axios";
import { domain } from "../../core/index";
import { cartStore } from "../store/cartStore";

export const getAllProducts = async () => {
  try {
    const res = await axios.get(domain + "/api/products?populate=*");
    return res.data.data;
  } catch (err) {
    console.error("Problem With Get All Products", err);
  }
};

export const getOneProduct = async (productId) => {
  try {
    const res = await axios.get(
      domain + `/api/products/${productId}?populate=*`,
    );
    return res.data.data;
  } catch (err) {
    console.error("Problem With Get The Product", err);
  }
};

export const getAllSizes = async () => {
  try {
    const res = await axios.get(domain + `/api/sizes`);
    return res.data.data;
  } catch (err) {
    console.error("Problem With Get Sizes", err);
  }
};

const authHeaders = (token) =>
  token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};

export const getCart = async ({ token, userId } = {}) => {
  try {
    if (!token || !userId) return [];

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
    if (!Array.isArray(data)) return [];

    const normalize = (p) =>
      p?.attributes ? { id: p.id, ...p.attributes } : p;

    return data
      .flatMap((item) => {
        const rel =
          item?.product ??
          item?.attributes?.product?.data ??
          item?.product?.data;

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
export const getProductInCartId = async ({ token, userId, productId } = {}) => {
  try {
    if (!token || !userId) return [];

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

    const cartProducts = res.data?.data;

    const productInCart = cartProducts.find(
      (cartProduct) => cartProduct.product.documentId === productId,
    );
    const productInCartId = productInCart?.documentId;

    return productInCartId;
  } catch {
  }
};

export const removeFromCartApi = async ({ token, userId, productId }) => {
  try {
    const id = await getProductInCartId({ token, userId, productId });

    if (!id) {
      return;
    }

    const res = await axios.delete(domain + `/api/cart-items/${id}`, {
      headers: authHeaders(token),
    });

    if (res) {
      const setCartLength = cartStore.getState().setCartLength;

      const numberOfProductsInCart = await getNumberOfProductsInCart({
        token,
        userId,
      });

      setCartLength(numberOfProductsInCart);
    }

    return res.data;
  } catch (err) {
    console.error("Problem With Remove From Cart API", err);
    console.error("ERROR DETAILS:", err?.response?.data?.error);
    throw err;
  }
};

export const addToCartApi = async ({
  token,
  userId,
  productId,
  color,
  size,
  qty,
}) => {
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

    const res = await axios.post(domain + "/api/cart-items", payload, {
      headers: authHeaders(token),
    });
    if (res) {
      const setCartLength = cartStore.getState().setCartLength;

      const numberOfProductsInCart = await getNumberOfProductsInCart({
        token,
        userId,
      });
      setCartLength(numberOfProductsInCart);
    }
    return res.data;
  } catch (err) {
    console.error("Problem With Add To Cart API", err);
    console.error("ERROR DETAILS:", err?.response?.data?.error);
    throw err;
  }
};

export const isProductInCart = async ({ token, userId, productId }) => {
  try {
    const response = await axios.get(
      `${domain}/api/cart-items?filters[product][documentId][$eq]=${productId}`,
      {
        headers: authHeaders(token),
      },
    );

    return response.data.data.length > 0;
  } catch (error) {}
};

export const getProductInCartOptions = async ({ token, productId }) => {
  try {
    if (!token || !productId) return;

    const res = await axios.get(`${domain}/api/cart-items`, {
      headers: authHeaders(token),
      params: {
        populate: {
          product: {
            populate: "*",
          },
        },
        "filters[product][documentId][$eq]": productId,
      },
    });

    if (!res) return;

    const productInCart = res.data.data[0];

    const options = {
      color: productInCart.color,
      size: productInCart.size,
      qty: productInCart.qty,
    };

    return options;
  } catch {
  }
};

export const getPromoCodes = async ({ token }) => {
  try {
    const res = await axios.get(`${domain}/api/promo-codes`, {
      headers: authHeaders(token),
    });

    if (!res) return;
    const promoCode = res.data.data;

    return promoCode;
  } catch {
  }
};

export const getNumberOfProductsInCart = async ({ token, userId }) => {
  try {
    const cartProducts = await getCart({ token, userId });

    const numberOfProductsInCart = cartProducts.length;

    return numberOfProductsInCart;
  } catch {
    return 0;
  }
};

export const applyPromoCode = async ({ token, userId, promoCodeId }) => {
  if (!token || !userId) return [];

  try {
    const payload = { data: { user: userId, promoCode: promoCodeId } };

    await axios.post(domain + "/api/promo-code-applieds", payload, {
      headers: authHeaders(token),
    });
  } catch {
  }
};

export const getAppliedPromoCode = async ({ token, userId }) => {
  if (!token || !userId) return [];

  try {
    const res = await axios.get(
      `${domain}/api/promo-code-applieds?filters[user][id][$eq]=${userId}&populate=promoCode`,
      {
        headers: authHeaders(token),
      },
    );

    return res.data.data;
  } catch {
  }
};

export const deleteAppliedPromoCode = async ({token , promoDocumentId}) =>
{
  if (!token || !promoDocumentId) return [];
  
  try {
    const res = await axios.delete(`${domain}/api/promo-code-applieds/${promoDocumentId}` , {
      headers: authHeaders(token)
    })
    return res.data
  } catch {
  }
}

export const searchProducts = async ({token , search}) =>
{
  try {
    const res = await axios.get(`${domain}/api/products?filters[name][$containsi]=${search}&populate=*`,{
      headers: authHeaders(token)
    })
    return res.data.data;
  } catch {
  }
}

export const increaseQty = async ({ token, userId, productId }) => {
  if (!token || !userId || !productId) return;

  try {
    const res = await axios.get(
      `${domain}/api/cart-items?filters[users_permissions_user][id][$eq]=${userId}&filters[product][documentId][$eq]=${productId}`,
      {
        headers: authHeaders(token),
      }
    );

    const item = res.data.data[0];

    if (!item) return;

    await axios.put(
      `${domain}/api/cart-items/${item.documentId}`,
      {
        data: {
          qty: item.qty + 1,
        },
      },
      {
        headers: authHeaders(token),
      }
    );
  } catch {
  }
};

export const decreaseQty = async ({ token, userId, productId }) => {
  if (!token || !userId || !productId) return;

  try {
    const res = await axios.get(
      `${domain}/api/cart-items?filters[users_permissions_user][id][$eq]=${userId}&filters[product][documentId][$eq]=${productId}`,
      {
        headers: authHeaders(token),
      }
    );

    const item = res.data.data[0];
    if (!item) return;

    await axios.put(
      `${domain}/api/cart-items/${item.documentId}`,
      {
        data: {
          qty: item.qty - 1,
        },
      },
      {
        headers: authHeaders(token),
      }
    );
  } catch {
  }
};