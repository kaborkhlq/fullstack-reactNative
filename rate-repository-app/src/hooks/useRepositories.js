import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES, GET_REPOSITORY, GET_REVIEWS } from '../graphql/queries';


export const useRepositoriesThroughGraphQl = () => {
    const { loading, error, data} = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
    })

    const repositories = loading ? undefined : data.repositories
    return { repositories, loading };
};

export const useRepository = (repositoryId) => {
    const params = {
        "repositoryId": repositoryId
    }   
    const { loading, error, data} =  useQuery(GET_REPOSITORY, {variables: params, fetchPolicy: 'cache-and-network',})
    const repository = loading ? undefined : data.repository
    return { repository, loading };
};

export const useReviews = (repositoryId) => {
    const params = {
        "repositoryId": repositoryId
    }   
    const { loading, error, data} = useQuery(GET_REVIEWS, {variables: params, fetchPolicy: 'cache-and-network',})

    const reviews = loading ? undefined : data.repository.reviews
    return { reviews, loading };
};

export default useRepositoriesThroughGraphQl;