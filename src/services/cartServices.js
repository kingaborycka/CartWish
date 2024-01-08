import apiClient from "../utils/api-client";

export function addToCartAPI(id, quantity) {
    apiClient.post(`/cart/${id}`, {quantity})
}

export function getCartAPI() {
    return apiClient.get(`/cart`)
}

export function removeFromCartAPI(id) {
    apiClient.patch(`/cart/remove/${id}`)
}

export function increaseProductAPI(id) {
    apiClient.patch(`/cart/increase/${id}`)
}

export function decreaseProductAPI(id) {
    apiClient.patch(`/cart/decrease/${id}`)
}