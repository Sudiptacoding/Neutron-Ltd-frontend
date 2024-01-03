import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://neutrobackend.vercel.app',
});

const useAxios = () => {
    return instance;
};

export default useAxios;