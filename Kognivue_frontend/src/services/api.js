import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/users";

export const fetchUsers = () => axios.get(`${API_BASE_URL}/all`);
export const createUser = (data) => axios.post(`${API_BASE_URL}/create`, data);
export const loginUser = (data) => axios.post(`${API_BASE_URL}/login`, data);
