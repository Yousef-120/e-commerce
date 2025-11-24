import axios from "axios";
import { domain } from "../../core/index";

export const getAllProducts = async () => {
  try {
    const res = await axios.get(domain + "/api/products?populate=*");
    console.log(res.data.data)
    return res.data.data;
  } catch(err) {
    console.error("Problem With Get All Products" , err)
  }
};
export const getOneProduct = async (productId) => {
  try {
    const res = await axios.get(domain + `/api/products/${productId}?populate=*`);
    console.log(res.data.data)
    return res.data.data;
  } catch(err) {
    console.error("Problem With Get The Product" , err)
  }
};
export const getAllSizes = async () => {
  try {
    const res = await axios.get(domain + `/api/sizes`);
    console.log(res.data.data)
    return res.data.data;
  } catch(err) {
    console.error("Problem With Get Sizes" , err)
  }
};
