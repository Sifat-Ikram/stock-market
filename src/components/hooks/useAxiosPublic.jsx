import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://stock-market-server-olive.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;