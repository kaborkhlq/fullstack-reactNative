import { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { object } from 'yup';


const useRepositoriesThroughREST = () => {
    const [repositories, setRepositories] = useState();
    const [loading, setLoading] = useState(false);

    const fetchRepositories = async () => {
        setLoading(true);
        const response = await fetch('http://192.168.86.27:5000/api/repositories');
        const json = await response.json();
        setLoading(false);
        setRepositories(json);
    }

    useEffect(() => {
        fetchRepositories();
    }, []);

    return { repositories, loading, refetch: fetchRepositories };
};


const useRepositoriesThroughGraphQl = () => {
    const { loading, error, data} = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
    })

    const repositories = loading ? undefined : data.repositories
    return { repositories, loading };
};



export default useRepositoriesThroughGraphQl;