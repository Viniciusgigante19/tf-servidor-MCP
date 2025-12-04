import { baseAxios } from "./axiosApi.js";
import catchError from "./catchError.js";
export default async function productListApi(limit = 15, orderBy = "id,desc") {
    const query = new URLSearchParams({
        "orderBy": orderBy,
        "limit": limit.toString()
    });
    try {
        const { data } = await baseAxios.get(`api/products?${query}`);
        return data;
    }
    catch (error) {
        return catchError(error);
    }
}
