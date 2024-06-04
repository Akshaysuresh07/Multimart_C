import { apiConfig } from "./apiConfig";
import { apiUrl } from "./apiUrl";

export const registerApi = async(reqBody)=>{
    return await apiConfig('POST',`${apiUrl}/register`,reqBody)

}
export const loginApi=async(reqBody)=>{
    return await apiConfig('POST',`${apiUrl}/login`,reqBody)
}

//product
export const getAllProductsApi = async(page,category) => {
    return await apiConfig('GET', `${apiUrl}/getProducts?page=${page}&limit=8&category=${category}`, "")
}
export const getHomeProductsApi = async () => {
    return await apiConfig('GET', `${apiUrl}/gethomeProduct`, "")
}
export const getSliderProductsApi = async () => {
    return await apiConfig('GET', `${apiUrl}/getSliderProduct`, "")
}

export const getSingleProductsApi = async (id) => {
    return await apiConfig('GET', `${apiUrl}/getProducts/${id}`, '','')
}

//cart
export const addToCartApi= async (reqBody,reqHeaders) => {
    return await apiConfig('POST', `${apiUrl}/addtocart`,reqBody,reqHeaders)
}
export const getCartApi= async (reqHeaders) => {
    return await apiConfig('GET', `${apiUrl}/getcart`,'',reqHeaders)
}
export const clearCartApi = async (id,reqHeaders) => {
    return await apiConfig('DELETE', `${apiUrl}/clearCart/${id}`,'',reqHeaders)
}

export const paymentCheckout = async (data,reqHeader) => {
    return await apiConfig('post', `${apiUrl}/checkout`, data,reqHeader)
}
export const addOrderApi = async (data,reqHeader) => {
    return await apiConfig('post', `${apiUrl}/addOrder`, data,reqHeader)
}
export const removeItemFromCartApi = async (productId,reqHeaders) => {
    return await apiConfig('DELETE', `${apiUrl}/removefromcart/${productId}`,'',reqHeaders)

}


//admin register
export const registerAdminApi = async(reqBody)=>{
    return await apiConfig('POST',`${apiUrl}/registeradmin`,reqBody)

}
export const adminLoginApi=async(reqBody)=>{
    return await apiConfig('POST',`${apiUrl}/loginAdmin`,reqBody)
}