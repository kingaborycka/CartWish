import apiClient from "../utils/api-client";

export function addToCartAPI(id, quantity) {
    apiClient.post(`/cart/${id}`, {quantity})
}

export function getCartAPI() {
    return apiClient.get(`/cart`)
}