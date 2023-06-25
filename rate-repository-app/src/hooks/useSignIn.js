import { SIGN_IN } from '../graphql/mutations'
import { useMutation } from '@apollo/client';
// import { useAuthStorage } from '../hooks/useAuthStorage';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useApolloClient } from '@apollo/client';

const credentials = {
    username: '',
    password: ''
}

const useSignIn = () => {
    const [mutate, result] = useMutation(SIGN_IN);
    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();
    // const authStorage = useAuthStorage();

    if (result.error) {
        console.log("ERROR:", result.error)
    }

    const signIn = async ({ username, password }) => {
        credentials.username = username
        credentials.password = password
        const { data } = await mutate({ variables: { credentials } })
        try {
            await authStorage.setAccessToken(data.authenticate.accessToken)
            apolloClient.resetStore();
        } catch(e) {
            console.log(e)
        }
        return data
    };
    
    return [signIn, result];
};

export default useSignIn;
