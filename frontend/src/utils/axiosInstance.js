import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
});

// Antes de cada petición agrega el token
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Si la petición falla con 401, renueva el token
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config;

        if (error.response.status === 401 && !original._retry) {
            original._retry = true;

            const refresh = localStorage.getItem("refresh");
            const res = await axios.post("http://localhost:8000/api/users/token/refresh/", {
                refresh: refresh
            });

            localStorage.setItem("access", res.data.access);
            original.headers.Authorization = `Bearer ${res.data.access}`;
            return axiosInstance(original);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;