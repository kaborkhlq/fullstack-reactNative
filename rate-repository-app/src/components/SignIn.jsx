import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { Formik, useField } from 'formik';
import theme from '../theme';
import * as yup from 'yup';


const styles = StyleSheet.create({
    errorText: {
        marginTop: 0,
        marginBottom: 10,
        marginLeft: 6,
        color: theme.colors.error,
        font: theme.fonts
    },
    inputField: {
        borderColor: theme.colors.textSecondary,
        borderWidth: 1,
        margin: 6,
        padding: 2,
        paddingLeft: 10,
        height: 50,
        borderRadius: 5,
        font: theme.fonts

    },
    signInButton: {
        backgroundColor: theme.colors.primary,
        color: 'white',
        padding: 3,
        margin: 6,
        borderRadius: 5,
        paddingLeft: 10,
        height: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: theme.fontSizes.subheading,
        font: theme.fonts
    },
    item: {
        backgroundColor: 'white',
        padding: 10,
        paddingRight: 60,
        paddingTop: 6,
        font: theme.fonts
    },
    flexContainerHorizontal: {
        flexDirection: 'row',
        display: 'flex',
        font: theme.fonts
    },
    flexContainerVertical: {
        flexDirection: 'column',
        display: 'flex',
        padding: 3,
        font: theme.fonts
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
        marginTop: 8,
        font: theme.fonts
    },
    flexItemA: {
        flexGrow: 0.2,
        textAlign: 'left',
        font: theme.fonts
    },
    flexItemB: {
        flexGrow: 0.2,
        font: theme.fonts
    }
});

const SignInForm = ({ onSubmit }) => {
    const [usernameField, usernameMeta, usernameHelpers] = useField('username');
    const [passwordField, passwordMeta, passwordHelpers] = useField('password');
    // Check if the field is touched and the error message is present
    const showUsernameError = usernameMeta.touched && usernameMeta.error;
    const showPasswordError = passwordMeta.touched && passwordMeta.error;
    let usernameBorder
    let passwordBorder
    showUsernameError  ? usernameBorder = theme.colors.error :  usernameBorder=styles.inputField.borderColor
    showPasswordError  ? passwordBorder = theme.colors.error :  passwordBorder=styles.inputField.borderColor

    return (
        <View>
            <View style={{ backgroundColor: 'white', paddingBottom: 20, paddingTop: 5, paddingRight: 5, paddingLeft: 5 }}>
                <TextInput
                    placeholder="Username"
                    value={usernameField.value}
                    onChangeText={text => usernameHelpers.setValue(text)}
                    style={{...styles.inputField, borderColor: usernameBorder}}
                />
                 {showUsernameError && <Text style={styles.errorText}>{usernameMeta.error}</Text>}
                <TextInput
                    placeholder="Password"
                    value={passwordField.value}
                    onChangeText={text => passwordHelpers.setValue(text)}
                    secureTextEntry={true}
                    style={{...styles.inputField, borderColor: passwordBorder}}
                />
                {showPasswordError && <Text style={styles.errorText}>{passwordMeta.error}</Text>}
                <Pressable onPress={onSubmit}>
                    <Text style={styles.signInButton}>
                        Sign in
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

import useSignIn from '../hooks/useSignIn';
// import AuthStorage from '../utils/authStorage';
// const auth = new AuthStorage()

export const SignInContainer = ({onSubmit, validationSchema}) => {
    const initialValues = {
        username: '',
        password: '',
    };
    
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            >
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );

}

const SignIn = () => {
    const [signIn] = useSignIn()

    const validationSchema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
    });

    const onSubmit = async values => {
        validationSchema.validate(values)
        .then( function(values) {
            console.log("Signing in with:",values)

        })
        .catch(function(err){
            console.log(err)
        })
        try {
            const {username, password} = values
            const response = await signIn({username, password})
        } catch (e) {
            console.log(e)
        }
    };

    return <SignInContainer onSubmit={onSubmit} validationSchema={validationSchema} />;

};

export default SignIn