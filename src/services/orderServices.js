import apiClient from "../utils/api-client";

export function checoutAPI() {
    return apiClient.post("order/checkout")
}