import axios from "axios";
import { domain } from "../../core/index";
import { cartStore } from "../store/cartStore";

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
    const res = await axios.get(
      domain + `/api/products/${productId}?populate=*`,
    );
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
    console.log("Cart-items from API:", data);

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
    console.log(cartProducts);

    const productInCart = cartProducts.find(
      (cartProduct) => cartProduct.product.documentId === productId,
    );
    const productInCartId = productInCart?.documentId;

    return productInCartId;
  } catch (err) {
    console.log(err);
  }
};

export const removeFromCartApi = async ({ token, userId, productId }) => {
  try {
    const id = await getProductInCartId({ token, userId, productId });

    if (!id) {
      console.log("Product not found in cart");
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

    console.log("Removed From cart API:", res);
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

    console.log("PAYLOAD =>", payload);

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
    console.log("Added to cart API:", res.data);
    return res.data;
  } catch (err) {
    console.error("Problem With Add To Cart API", err);
    console.error("ERROR DETAILS:", err?.response?.data?.error);
    throw err;
  }
};

export const isProductInCart = async ({ token, userId, productId }) => {
  try {
    if (!token || !userId) console.log("Not authenticated");

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

    console.log(productInCart);
    console.log(options);

    return options;
  } catch (error) {
    console.log(error);
  }
};

export const getPromoCodes = async ({ token }) => {
  try {
    const res = await axios.get(`${domain}/api/promo-codes`, {
      headers: authHeaders(token),
    });

    if (!res) return;
    const promoCode = res.data.data;

    console.log(res.data.data);
    return promoCode;

    return;
  } catch (error) {
    console.log(error.response?.data);
  }
};

export const getNumberOfProductsInCart = async ({ token, userId }) => {
  try {
    const cartProducts = await getCart({ token, userId });

    const numberOfProductsInCart = cartProducts.length;
    console.log(numberOfProductsInCart);

    return numberOfProductsInCart;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export const applyPromoCode = async ({ token, userId, promoCodeId }) => {
  if (!token || !userId) return [];

  try {
    const payload = { data: { user: userId, promoCode: promoCodeId } };

    const res = await axios.post(domain + "/api/promo-code-applieds", payload, {
      headers: authHeaders(token),
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
    console.log(error.response);
    console.log(error.response?.data);
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
    
  } catch (error) {
    console.log(error.response?.data);
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
  } catch (error) {
    console.log(error.response?.data)
  }
}

export const searchProducts = async ({token , search}) =>
{
  try {
    const res = await axios.get(`${domain}/api/products?filters[name][$containsi]=${search}&populate=*`,{
      headers: authHeaders(token)
    })
    return res.data.data;
  } catch (error) {
    console.log(error.response?.data)
  }
}