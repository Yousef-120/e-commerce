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
