import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { useContext } from 'react';
import { UserProvider } from '../context/AuthContext';

const useAllData = () => {
    const axiosData = useAxios();
    const { user, loader } = useContext(UserProvider)
    const { isPending, error, data: users, refetch } = useQuery({
        queryKey: ['repoData'],
        enabled: !loader,
        queryFn: () =>
            axiosData.get(`/users?email=${user?.email}`)
                .then(res => {
                    return res.data
                })
    })
    return { isPending, error, users, refetch }
};

export default useAllData;