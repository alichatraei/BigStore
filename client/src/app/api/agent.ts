import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5000/api/";

const responseBody = (response: AxiosResponse) => response.data;
axios.interceptors.response.use(response => response, (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
        case 404:
            toast.error(data?.title);
            break;
        case 500:
            console.log(data)
            break;
    }
    // toast.error(error.response?.data)
    return Promise.reject(error.response?.data);
})
const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Product = {
    allProducts: () => requests.get('products'),
    customProduct: (id: number) => requests.get(`products/${id}`)
}

const agent = {
    Product
}

export default agent;