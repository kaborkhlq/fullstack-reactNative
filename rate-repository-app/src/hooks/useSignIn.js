import { SIGN_IN } from '../graphql/mutations'
import { useMutation } from '@apollo/client';


const credentials = {
    username: '',
    password: ''
}

const useSignIn = () => {
    const [mutate, result] = useMutation(SIGN_IN);

    if (result.error) {
        console.log("ERROR:", result.error)
    }

    const signIn = async ({ username, password }) => {
        credentials.username = username
        credentials.password = password
        return mutate({ variables: { credentials } })
    };
    
    return [signIn, result];
};

export default useSignIn;
